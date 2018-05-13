import React, {Component} from "react";
import {findDOMNode} from 'react-dom'
import TF from "../API/Tfmodel";

class CanvasDraw extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
    }

    componentWillMount(){
        Meteor.call("train", (err, resp)=>{
            if(err) throw err;
            console.log(resp);
        })
    }

    componentDidMount() {

        this.clickX = [];
        this.clickY = [];
        this.clickDrag = [];
        this.paint = false;
        this.canvas = findDOMNode(this.canvasRef);
        /*let canvasDiv = document.getElementById("canvasDiv");
        canvas = document.createElement("canvas");
        canvas.setAttribute("id", "canvas");
        canvasDiv.appendChild(canvas);
        canva = document.getElementById("canvas");*/
        this.ctx = this.canvas.getContext("2d");
        /*canva.setAttribute("onMouseDown", function(e){
            let mouseX = e.pageX - this.offsetLeft;
            let mouseY = e.pageY - this.offsetTop;

            paint = true;
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
            redraw();
        });
        canva.mousedown(function(e){
            let mouseX = e.pageX - this.offsetLeft;
            let mouseY = e.pageY - this.offsetTop;

            paint = true;
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
            redraw();
        });
        canva.mousemove((e)=>{
            if(paint){
                addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
                redraw();
            }
        });
        canva.mouseup((e)=>{
            paint = false;
        });
        canva.mouseleave((e)=>{
            paint = false;
        });*/
    }

    addClick(x, y) {
        this.clickX.push(x);
        this.clickY.push(y);
    }

    redraw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.save();
        this.ctx.strokeStyle = "#df4b26";
        this.ctx.lineJoin = "round";
        this.ctx.lineCap = 'round';
        this.ctx.lineWidth = 5;

        for (let i = 0; i < this.clickX.length; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.clickX[i - 1], this.clickY[i - 1]);
            this.ctx.lineTo(this.clickX[i], this.clickY[i]);
            this.ctx.closePath();
            this.ctx.stroke();

        }
        this.ctx.restore();
    }

    onMouseDown(e) {
        {
            const {top, left} = this.canvas.getBoundingClientRect();
            console.log("Hola");
            this.paint = true;
            this.addClick(e.pageX - left, e.pageY - top);
            this.redraw();
        }
    }

    onMouseMove(e) {
        if (this.paint) {
            this.addClick(e.pageX, e.pageY);
            this.redraw();
        }
    }

    // Function when mouse is out boundary of canvas
    onMouseOut(e) {
        this.paint = false;
        //console.log(this.ctx.getImageData(0,0,300,150));
    }

    // Function when mouse is no-click
    onMouseUp(e) {
        this.paint = false;
        img = (this.ctx.getImageData(0,0,300,150));
        console.log(img);
        console.log("Call predict");
        Meteor.call('predict', img, (err, resp)=>{
            if(err) throw err;
            console.log("Canvas, ", resp);
            }
        )
    }

    render() {
        return (
            <canvas
                ref={(canvas) => {
                    this.canvasRef = canvas;
                }}
                onMouseDown={this.onMouseDown}
                onMouseMove={this.onMouseMove}
                onMouseOut={this.onMouseOut}
                onMouseUp={this.onMouseUp}
            />
        );
    }
}

export default CanvasDraw;