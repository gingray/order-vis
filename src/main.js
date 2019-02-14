import * as d3 from "d3";
import $ from 'jquery'
import {Vis} from './vis'
import 'bootstrap';
import 'bootstrap/scss/bootstrap.scss'

$(document).ready(() => {
    d3.json('today.json').then((data) => {
        const vis = new Vis(data);
        vis.render();
    });
})