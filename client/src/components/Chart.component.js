import React, {Component} from 'react';
import {timeParse, select, scaleTime, scaleLinear, axisBottom, axisLeft, area, extent, json, max} from 'd3';

export default class ChartContent extends Component {
    componentDidMount(){
        document.title = "Website | Data";

        const margin = {top: 10, right: 30, bottom: 30, left: 50};
        const width  = 460 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        let svg = select("#D3Chart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        json("http://localhost:5000/data", 
            d => {return { date : timeParse("%Y-%m-%d")(d.date), value : d.value }}, 
            data => {
                //Add x-Axis
                let xAxis = scaleTime()
                    .domain(extent(data, d => d.date))
                    .range([0, width]);
                svg.append("g")
                    .attr("transform", "translate(0, " + height + ")")
                    .call(axisBottom(xAxis));
                
                //Add y-Axis
                let yAxis = scaleLinear()
                    .domain([0, max(data, d => d.value)])
                    .range([height, 0]);
                svg.append("g")
                    .call(axisLeft(yAxis));
                
                //Add the actual Line
                svg.append("path")
                    .datum(data)
                    .attr("fill", "#69b3a216")
                    .attr("stroke", "69b3a2")
                    .attr("stroke-width", 1.5)
                    .attr("d", area()
                        .x(d => d.date)
                        .y0(yAxis(0))
                        .y1(d => d.value)
                        )
            })
    }

    render() {
        return(
            <div id="D3Chart"></div>
        );
    }
}