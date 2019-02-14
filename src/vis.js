import * as d3 from "d3";

export class Vis {
    constructor(data) {
        this.data = data;
        this.columns = [{header: 'Number', key:'order.number'},{header: 'State', key:'order.state'}, { header: 'Payments', key:'payments'}]
    }

    render() {
        const table = d3.select("table.table");
        const thead = table.append('thead');
        const tbody = table.append('tbody');

        thead.append('tr')
            .selectAll('th')
            .data(this.columns)
            .enter()
            .append('th')
            .text(function (column) { return column.header; });

        const rows = tbody.selectAll('tr')
            .data(this.data)
            .enter()
            .append('tr')

        rows.selectAll('tr')
            .data((item) => {
                console.log(item);
                return [item.order.state, item.order.number, item.payments ]
            })
            .enter()
            .append('td')
            .text((item) => { return item })
        console.log(this.data);
    }
}