import React, {Component} from 'react';
import * as d3 from "d3";
import d3tip from "d3-tip";
import PropTypes from 'prop-types';

class BarChart extends Component {

    //incluir script en index.html

    componentDidMount(){
        this.margin = {top: 40, right: 20, bottom: 30, left: 40};
            this.width = 600 - this.margin.left - this.margin.right;
        this.height = 400 - this.margin.top - this.margin.bottom;
        this.barWidth = 20;

        this.xScale = d3.scaleLinear()
            .range([0,this.width]);

        this.yScale = d3.scaleLinear()
            .range([this.height, 0]);

        this.color = d3.scaleOrdinal(d3.schemeCategory10);

        this.svg = d3.select("#chart")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

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
        this.rect =  this.svg.selectAll(".bar")
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
            .on('mouseover', this.tip.show)
            .on('mouseout', this.tip.hide)
            .merge(this.rect)
            .transition()
            .duration(2000)
            .attr("x", (d)=> { return this.xScale(d.value); })
            .attr("width", this.barWidth)
            .attr("y", (d)=> { return this.yScale(d.prob); })
            .attr("height", (d)=> { return this.height - this.yScale(d.prob); })
            .style("fill", (d)=>{
                return this.color(d);
            })


    }
    render() {
        return (
            <svg id="chart">

            </svg>
        );
    }
}

export default BarChart;
