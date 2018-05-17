import React, {Component} from 'react';
import * as d3 from "d3";
import d3tip from "d3-tip";
import PropTypes from 'prop-types';

class BarChart extends Component {

    //incluir script en index.html

    componentDidMount(){
        this.margin = {top: 40, right: 20, bottom: 30, left: 40};
            this.width = 960 - this.margin.left - this.margin.right;
        this.height = 500 - this.margin.top - this.margin.bottom;
        this.barWidth = 20;

        this.xScale = d3.scaleLinear()
            .range([0,this.width]);

        this.yScale = d3.scaleLinear()
            .range([this.height, 0]);



        this.svg = d3.select("#chart")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");




        /*this.width = 400;
        this.height = 400;
        this.margin = {top:10, bottom:10, left :10, right:10};
        this.barWidth = 20;
        this.padding = 20;
        this.chart = d3.select("#chart")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height)
            .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

        this.xAxis = this.chart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (this.height-this.padding)+")");

        this.xScale = d3.scaleLinear()
            .range([0,10]);*/

    }
    componentWillUpdate(nextProps, nextState){
        this.update(nextProps.predictions);
        //update(this.props.data);
    }

    update(myData)
    {
        if(myData){
            myData = myData.map((e,i)=>{
                return ({
                    value:i,
                    prob:e
                })
            })
        }
        console.log(myData);
        this.xScale.domain([0,9]);

        this.svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom(this.xScale));

        /*svg.append("g")
            .attr("class", "y axis")
            .call(this.yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Frequency");*/
        this.rect =  this.svg.selectAll("rect")
            .data(myData);

        this.rect.exit()
            .transition()
            .duration(300)
            .remove();

        d3.tip = d3tip;
        this.tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
                return "<strong>Probability:</strong> <span style='color:red'>"+d.prob+"</span>";
            });

        this.svg.call(this.tip);

        this.rect.enter().append("rect")
            .attr("class", "bar")
            .merge(this.rect)
            .attr("x", (d)=> { return this.xScale(d.value); })
            .attr("width", this.barWidth)
            .attr("y", (d)=> { return this.yScale(d.prob); })
            .attr("height", (d)=> { return this.height - this.yScale(d.prob); })
            .on('mouseover', this.tip.show)
            .on('mouseout', this.tip.hide);



        //this.xAxis = d3.axisBottom(this.xScale);
        /*this.rect = this.chart.selectAll("rect")
            .data(myData);

        this.rect.enter()
            .append("rect")
            .merge(this.rect)
            .text((d)=>{return d.val;})
            .style("fill", "darkblue")
            .attr("x", 0)
            .style("width", (d)=>{
                return d
            })*/
    }
    render() {
        return (
            <svg id="chart">

            </svg>
        );
    }
}

export default BarChart;
