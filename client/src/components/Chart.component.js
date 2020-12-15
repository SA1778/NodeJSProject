import React, {Component} from 'react';
import * as d3 from 'd3';

export default class ChartContent extends Component {
    componentDidMount(){
        this.drawChart();
    }

    drawChart()
    {
        //Misc. Variables
        const strokeWidth = 2;
        const margin = {top: 25, right: 20, bottom: 30, left: 25};
        const width  = parseInt(d3.select('body').style('width'), 10) - margin.left - margin.right;
        const height = (width/2.5) - margin.top - margin.bottom;

        //Crate Chart Canvas
        let svg = d3.select("#D3Chart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate( ${margin.left}, ${margin.top})`);
            
        d3.json("http://10.1.10.64:5000/data").then( data => 
            {
                data.forEach(d => {
                    d.date  = d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ")(d.date)
                });
                //Line Scales
                let xScale = d3.scaleTime()
                .domain(d3.extent(data, d => d.date))
                .range([margin.left, width - margin.right]);

                let yScale = d3.scaleLinear()
                    .domain([0, d3.max(data, d => d.value)]).nice()
                    .range([height - margin.bottom, margin.top]);
                

                //Create Axes
                const xAxis = g => g
                    .attr("transform", `translate(0, ${height - margin.bottom})`)
                    .call(d3.axisBottom(xScale));
                
                const yAxis = g => g
                    .attr("transform", `translate(${margin.left},0)`)
                    .call(d3.axisLeft(yScale))
                    .call(g => g.select(".domain").remove())
                    .call(g => g.select(".tick:last-of-type text").clone()
                        .attr("x", 3)
                        .attr("text-anchor", "start")
                        .attr("font-weight", "bold")
                        .text(data.y))

                //Add Axes
                svg.append("g").call(xAxis);
                svg.append("g").call(yAxis);

                //Add Gridlines
                svg.append("g")
                .attr("class", "grid")
                .call(d3.axisLeft(yScale).ticks(10)
                        .tickSize(-width+margin.left+margin.right)
                        .tickFormat(""))
                .attr("transform", `translate(${margin.left},0)`)

                svg.append("g")
                .attr("class", "grid")
                .call(d3.axisBottom(xScale).ticks(10)
                        .tickSize(height-margin.bottom-margin.top)
                        .tickFormat(""))
                .attr("transform", `translate(0, ${margin.top})`)

                //Create Line
                const Line = d3.area()
                    .x(d => xScale(d.date))
                    .y0(yScale(0))
                    .y1(d => yScale(d.value))
                    .curve(d3.curveBasis)

                //Add Graph
                svg.append("path")
                    .datum(data)
                        .attr("id", "path")
                        .attr("fill", "#ffbf002A")
                        .attr("stroke", "#ffbf00")
                        .attr("stroke-width", strokeWidth)
                        .attr("stroke-linejoin", "round")
                        .attr("stroke-linecap", "round")
                        .attr("d", Line)
                
                //Add Title & Labels
                svg.append("text")
                    .attr("x", width/2 + margin.left/4)
                    .attr('y', margin.top / 2)
                    .attr("text-anchor", "middle")
                    .attr("id", "graph-title")
                    .style("text-decoration", "underline")
                    .text("Temperature Over Time")
                
                svg.append("text")
                    .attr("class", "x label")
                    .attr("text-anchor", "middle")
                    .attr("x", width/2 + margin.left/4)
                    .attr("y", height + margin.bottom/2)
                    .text("Time");
                
                svg.append("text")
                    .attr("class", "y label")
                    .attr("text-anchor", "middle")
                    .attr("x", -height/2 + margin.bottom/8)
                    .attr("dy", -margin.left/5)
                    .attr("transform", "rotate(-90)")
                    .text("Degrees (C)");


                //Create Tooltip
                let tooltip = d3.select("#D3Chart")
                .append("div")
                .attr("id", "tooltip")
                .style("opacity", 0)
                .style("position", "absolute")
                
                let tooltipLine = svg.append("line")
                .style("stroke", "black")
                .style("stroke-width", strokeWidth)
                .style("opacity", 0);

                //Create Tooltip Events
                const mouseover = (e, d) => {
                    tooltip
                        .style("left", `${e.pageX+15}px`)
                        .style("top",  `${e.pageY-30}px`)
                        .style("opacity", 1);
                    tooltipLine
                        .attr("x1", xScale(d.date))
                        .attr("y1", yScale(0))
                        .attr("x2", xScale(d.date))
                        .attr("y2", yScale(d.value) - strokeWidth)
                        .style("opacity", 1);
                }
                const mousemove = (e, d) => {
                    if(xScale(d.date) > width/2){
                        tooltip
                            .html(`Temp: ${d.value}&deg;C<br>Date: ${d.date.toDateString()}`)
                            .style("left", `${e.pageX-15-parseInt(d3.select("#tooltip").style("width"),10)}px`)
                            .style("top",  `${e.pageY-30}px`);
                    }else{
                        tooltip
                            .html(`Temp: ${d.value}&deg;C<br>Date: ${d.date.toDateString()}`)
                            .style("left", `${e.pageX+15}px`)
                            .style("top",  `${e.pageY-30}px`);
                    }
                    tooltipLine
                        .attr("x1", xScale(d.date))
                        .attr("y1", yScale(0))
                        .attr("x2", xScale(d.date))
                        .attr("y2", yScale(d.value))
                        .style("stroke-linecap", "round")
                }
                const mouseleave = () => {
                    tooltip.style("opacity", 0);
                    tooltipLine.style("opacity", 0);
                }

                //Add Tooltip
                svg.selectAll("svg")
                    .data(data)
                    .enter()
                    .append("rect")
                        .attr("x", d => xScale(d.date))
                        .attr("y", d => margin.top)
                        .attr("width", (d, i) => {
                            if(i === 4) return 0;
                            return xScale(data[i+1].date) - xScale(data[i].date);
                        })
                        .attr("height", d => height - margin.top - margin.bottom)
                        .attr("fill", "transparent")
                    .on("mouseover", mouseover)
                    .on("mousemove", mousemove)
                    .on("mouseleave", mouseleave);
            }
        )
        .catch(err => console.error(err));
    }

    render() {
        document.title = "Website | Data";
        return(
                <div>
                    <div id="D3Chart"/>
                </div>
    );
    }
}