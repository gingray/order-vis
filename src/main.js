import * as d3 from "d3";
import $ from 'jquery'
import {Vis} from './js/index'
import 'bootstrap';
import 'bootstrap/scss/bootstrap.scss'
import './styles/main.sass'

$(document).ready(() => {
    const path = $('.file-path').data('path');
    d3.json(path).then((data) => {
        const vis = new Vis(data);
        vis.render();
    });
})
