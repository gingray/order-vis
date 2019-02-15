import each from 'lodash/each'
import $ from 'jquery'
import 'handlebars/dist/amd/handlebars.js'
import tabContentTemplate from '../templates/content.hbs'
import {prepareDataFromOrder} from "./utils";


export class Vis {
    constructor(data) {
        this.data = data;
    }

    render() {
        const container = $('.vis');
        this.createTabs(container, this.data);
    }

    createTabs(container, data) {
        each(data, (item) => {
            const element = $(tabContentTemplate(prepareDataFromOrder(item)));
            element.data('order', item);
            return container.append(element);
        });

        $('.order-container .show-data-in-console').on('click', function (item) {
            const container = $(item.currentTarget).closest('.order-container');
            const data = container.data('order');
            console.log(data);
        });
    }

}
