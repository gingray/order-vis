import chunk from 'lodash/chunk'
import keys from 'lodash/keys'
import map from 'lodash/map'
import reduce from 'lodash/reduce'
import sortBy from 'lodash/sortBy'
import moment from 'moment'

export function shapeData(obj) {
    const objKeys = keys(obj);
    const splitSize = Math.ceil(objKeys.length / 3.0);
    const arrOfkeys = chunk(objKeys,splitSize);
    const result = map(arrOfkeys, function (val) {
        return reduce(val, (acc, val) => {
            acc[val] = obj[val];
            return acc;
        }, {})
    });
    return result;
}

export function prepareDataFromOrder(item) {
    const order = item.order;
    const payments = map(item.payments, (val, index) => {
        const stateChanges = sortBy(val.state_changes, (item) => {
            return new Date(item.created_at);
        });
        return {
            id: val.payment.id,
            method_name: val.method.name,
            state: val.payment.state,
            number: val.payment.number,
            amount: val.payment.amount,
            created_at: moment(val.payment.created_at).format('YYYY-MM-DD HH:mm:ss'),
            updated_at: moment(val.payment.updated_at).format('YYYY-MM-DD HH:mm:ss'),
            state_changes: map(stateChanges, (val, index) => {
                return {
                    next_state: val.next_state,
                    previous_state: val.previous_state,
                    created_at: moment(val.created_at).format('YYYY-MM-DD HH:mm:ss')
                }
            })
        }
    });
    const result = {
        order: {
            id: order.id,
            number: order.number,
            state: order.state,
            payment_state: order.payment_state,
            created_at: moment(order.created_at).format('YYYY-MM-DD HH:mm:ss'),
            updated_at: moment(order.updated_at).format('YYYY-MM-DD HH:mm:ss'),
            shipment_state: order.shipment_state,
        },
        payments: payments,
        raw: item
    };

    return result;
}
