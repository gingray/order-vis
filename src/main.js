import * as d3 from "d3";
import $ from 'jquery'
import {Vis} from './js/index'
import 'bootstrap';
import 'bootstrap/scss/bootstrap.scss'
import './styles/main.sass'

$(document).ready(() => {
    d3.json('today.json').then((data) => {
        const vis = new Vis(data);
        vis.render();
    });
})
