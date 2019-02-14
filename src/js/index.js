import * as d3 from "d3";
import transform from 'lodash/transform'
import 'handlebars/dist/amd/handlebars.js'
import tabContentTemplate from '../templates/content.hbs'
import {shapeData} from './utils'


export class Vis {
    constructor(data) {
        this.data = data;
        console.log(data);
    }

    render() {
        const container = d3.select('.vis');
        this.createTabs(container, this.data);
    }

    getTabs(item, key) {
        const val = this.data[key];
        const orderId = val.order.id;

        const x = transform(val, (result, val, key) => {
            result.push({name: key, id: orderId});
        }, []);
        return x;
    }

    createTabs(container, data) {
        const tabContainer = container
            .selectAll('div')
            .data(data)
            .enter()
            .append('div')
            .html((item, i1,i2) => {
                return tabContentTemplate(item);
            });
    }

}
