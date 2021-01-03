import React, {Component} from 'react';
import * as d3 from 'd3';

export default class ChartContent extends Component {
    constructor(props){
        super(props);
        this.state = {
            width: 600,
            height: 300,
            margin: {top: 50, right: 20, bottom: 50, left: 25},
            strokeWidth: 2,
            scaleFactor: 1.75,
            tooltipOffset: 20
        }
    }
    componentDidMount(){
        this.drawChart();
    }

    async drawChart()
    {
        //Crate Chart Canvas
        let svg = d3.select("#D3Chart")
            .append("svg")
            .attr("translate", `transform(${this.state.scaleFactor * this.state.margin.left}, ${this.state.margin.top})`)
            .attr('viewBox', `0 0 ${this.state.width} ${this.state.height}`)
            .attr('preserveAspectRatio', `xMidYMid meet`)
        let graph = svg.append("g").attr("class", "graph-container");
        let tooltipBox = svg.append("g").attr("class", "tooltip-container");
            
        await d3.json("https://samabraham.tech/data").then( data => 
            {
                data.forEach(d => {
                    d.date  = d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ")(d.date)
                });
                //Line Scales
                let xScale = d3.scaleTime()
                .domain(d3.extent(data, d => d.date))
                .range([this.state.scaleFactor * this.state.margin.left, this.state.width - this.state.margin.right]);

                let yScale = d3.scaleLinear()
                    .domain([0, d3.max(data, d => d.temperature)]).nice()
                    .range([this.state.height - this.state.margin.bottom, this.state.margin.top]);
                
                //Create Axes
                const xAxis = g => g
                    .attr("transform", `translate(0, ${this.state.height - this.state.margin.bottom})`)
                    .style("font-size", "0.5rem")
                    .call(d3.axisBottom(xScale));
                
                const yAxis = g => g
                    .attr("transform", `translate(${this.state.scaleFactor * this.state.margin.left},0)`)
                    .style("font-size", "0.5rem")
                    .call(d3.axisLeft(yScale))
                    .call(g => g.select(".domain").remove())
                    .call(g => g.select(".tick:last-of-type text").clone()
                    .text(data.y))

                //Add Axes
                graph.append("g").attr("class", "xAxis").call(xAxis);
                graph.append("g").attr("class", "yAxis").call(yAxis);

                //Add Gridlines
                graph.append("g")
                .attr("class", "grid")
                .attr("transform", `translate(${this.state.scaleFactor * this.state.margin.left},0)`)
                .call(d3.axisLeft(yScale).ticks(10)
                        .tickSize(-this.state.width + this.state.scaleFactor * this.state.margin.left + this.state.margin.right)
                        .tickFormat(""));
                    
                graph.append("g")
                .attr("class", "grid")
                .attr("transform", `translate(0, ${this.state.margin.top})`)
                .call(d3.axisBottom(xScale).ticks(10)
                         .tickSize(this.state.height - this.state.margin.bottom - this.state.margin.top)
                        .tickFormat(""));
                
                //Create Line
                const Line = d3.line()
                    .x(d => xScale(d.date))
                    .y(d => yScale(d.temperature));
                    

                //Add Graph
                graph.append("path")
                    .datum(data)
                        .attr("id", "path")
                        .attr("fill", "none")
                        .attr("stroke", "#ffbf00")
                        .attr("stroke-width", this.state.strokeWidth)
                        .attr("stroke-linejoin", "bevel")
                        .attr("stroke-linecap", "round")
                        .attr("d", Line);
                
                //Add Title & Labels
                graph.append("text")
                    .attr("x", this.state.width/2 + 0.5 * this.state.margin.left)
                    .attr('y', this.state.margin.top/1.333)
                    .attr("text-anchor", "middle")
                    .attr("class", "graph-title")
                    .text("Temperature Over Time");
                
                graph.append("text")
                    .attr("class", "x label")
                    .attr("text-anchor", "middle")
                    .attr("x", (this.state.width)/2 + 0.5 * this.state.margin.left)
                    .attr("y", this.state.height - this.state.margin.bottom/4)
                    .text("Time");
                
                graph.append("text")
                    .attr("class", "y label")
                    .attr("text-anchor", "middle")
                    .attr("x", -(this.state.height - this.state.margin.bottom + this.state.margin.top)/2)
                    .attr("dy", this.state.margin.left/2)
                    .attr("transform", "rotate(-90)")
                    .text("Degrees (C)");


                //Create Tooltip
                let tooltip = d3.select("#D3Chart")
                .append("div")
                .attr("id", "tooltip")
                .style("position", "absolute")
                .style("opacity", 0)
                
                let tooltipLine = tooltipBox
                .append("line")
                .style("stroke", "black")
                .style("stroke-width", this.state.strokeWidth)
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
                        .attr("y2", this.state.margin.top)
                        .style("opacity", 1);
                }
                const mousemove = (e, d) => {
                    if(xScale(d.date) >= this.state.width/2){
                        tooltip
                            .html(`Temp: ${d.temperature}&deg;C<br>Time: ${d.date.toUTCString()}`)
                            .style("left", `${e.pageX-15-parseInt(d3.select("#tooltip").style("width"),10)}px`)
                            .style("top",  `${e.pageY-parseInt(d3.select('#tooltip').style("height"),10)/2}px`);
                    }else{
                        tooltip
                            .html(`Temp: ${d.temperature}&deg;C<br>Time: ${d.date.toUTCString()}`)
                            .style("left", `${e.pageX+15}px`)
                            .style("top",  `${e.pageY-parseInt(d3.select('#tooltip').style("height"),10)/2}px`);
                    }
                    tooltipLine
                        .attr("x1", xScale(d.date))
                        .attr("y1", yScale(0))
                        .attr("x2", xScale(d.date))
                        .attr("y2", this.state.margin.top)
                }
                const mouseleave = () => {
                    tooltip.style("opacity", 0);
                    tooltipLine.style("opacity", 0);
                }

                //Add Tooltip
                tooltipBox.selectAll("circle")
                    .data(data)
                    .enter()
                    .append("rect")
                        .attr("x", d => xScale(d.date)-this.state.tooltipOffset)
                        .attr("y", d => this.state.margin.top)
                        .attr("width", 2*this.state.tooltipOffset)
                        .attr("height", this.state.height - this.state.margin.top - this.state.margin.bottom)
                        .attr("class", "tooltipCircle")
                        .attr("fill", "#00000F0F")
                    .on("mouseover", mouseover)
                    .on("mousemove", mousemove)
                    .on("mouseleave", mouseleave);            
        }
        )
        .catch(err => console.error(err));
	
	// Adding Data Message At the Bottom of the Page
	d3.select("#D3Chart")
	  .append("i")
	  .style("font-size", "0.5rem")
 	  .style("margin-left", "10px")
	  .html("The Raw Data Can Be Found at: <a href=\"https://www.samabraham.tech/data\" target=\"_blank\">https://www.samabraham.tech/data</a>");
    }


    render() {
        document.title = "Website | Chart";
        return(
            <div>
                <div id="D3Chart"/>
                <div id="screenSizeMessage"><span>Your Screen Is Too Narrow to Display Graph</span></div>
            </div>
    );
    }
}
