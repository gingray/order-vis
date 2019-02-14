import * as d3 from "d3";
import transform from 'lodash/transform'
import {Beautifier} from "./beautifier";
import Handlebars from 'handlebars/dist/amd/handlebars.js'


export class Vis {
    constructor(data) {
        this.data = data;
        console.log(Handlebars);
        this.orderTemplate = Handlebars.compile(document.getElementById("order-template").innerHTML);
        this.otherTemplate = Handlebars.compile(document.getElementById("other-template").innerHTML);

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
            .attr('class', 'row')
            .append('div')
            .attr('class','col-md-12');

        tabContainer
            .append('ul')
            .attr("class", "nav nav-tabs")
            .attr('id', (item) => { return `order-tab-${item.order.id}` })
            .selectAll('li')
            .data(this.getTabs.bind(this))
            .enter()
            .append('li')
            .attr('class', 'nav-item')
            .append('a')
            .attr('class', 'nav-link')
            .attr('data-toggle', 'tab')
            .attr('href', (item) => {
                return `#${item.name}-${item.id}`
            })
            .attr('id', (item) => { return `${item.name}-${item.id}-tab` })
            .text((item)=> { return item.name; });
        this.createTabBody(tabContainer, data);
    }

    createTabBody(container, data) {
            container
            .append('div')
            .attr('class', 'tab-content')
            .selectAll('div')
                .data(function(val){
                    const orderId = val.order.id;
                    const result = transform(val, (result, val, key) => {
                        result.push({name: key, id: orderId, val: val});
                    }, []);
                    console.log(result);
                    return result
                })
                .enter()
                .append('div')
                .attr('class', (item)=> {
                    const klass = item.name === 'order' ? 'active' : '';
                    return `tab-pane fade show  ${klass}`
                })
                .attr('id', (item) => {
                    return `${item.name}-${item.id}`
                })
                .append('div')
                .html((item) => {
                    if (item.name === 'order') {
                        return this.orderTemplate(item.val)
                    }
                    const json = new Beautifier().prettyPrint(item.val);
                    return this.otherTemplate({json:json})
                })

    }
}
