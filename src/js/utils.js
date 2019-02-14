import chunk from 'lodash/chunk'
import keys from 'lodash/keys'
import map from 'lodash/map'
import reduce from 'lodash/reduce'

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
