import React, {Component} from "react";
import {findDOMNode} from 'react-dom'
import * as tf from "@tensorflow/tfjs/dist/index";

class CanvasDraw extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
    }

    async loadModel(){
        this.model = await tf.loadModel("Assets/model.json");
    }
    componentDidMount() {

        console.log("LoDING MODEL");

        this.loadModel().then((d)=>console.log(this.model)).catch(e=>{throw e});
        this.clickX = [];
        this.clickY = [];
        this.clickDrag = [];
        this.paint = false;
        this.canvas = findDOMNode(this.canvasRef);
        this.ctx = this.canvas.getContext("2d");

    }

    addClick(x, y) {
        this.clickX.push(x);
        this.clickY.push(y);
    }

    redraw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.save();
        this.ctx.strokeStyle = "#111111";
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
            this.paint = true;
            this.addClick(e.pageX-left, e.pageY-top);
            //this.addClick(e.pageX, e.pageY);
            this.redraw();
        }
    }

    onMouseMove(e) {
        if (this.paint) {
            const {top, left} = this.canvas.getBoundingClientRect();
            this.addClick(e.pageX-left, e.pageY-top);
            //this.addClick(e.pageX, e.pageY);
            this.redraw();
        }
    }

    // Function when mouse is out boundary of canvas
    onMouseOut(e) {
        this.paint = false;
    }

    // Function when mouse is no-click
    onMouseUp(e) {
        this.paint = false;
        this.ctx.drawImage(this.canvas, 0,0,28,28);
        console.log("Call predict");
        img = (this.ctx.getImageData(0,0,28,28));
        this.predict(img);

    }

    async predict(imga){
        console.log(this.model);
       const pred = await tf.tidy(()=>{
            let img = tf.fromPixels(imga,1);
            img = img.reshape([1,28,28,1]);
            img = tf.cast(img, "float32");

            let output = [];
            output = this.model.predict(img);

            this.predictions = Array.from(output.dataSync());
            this.props.updatePred(this.predictions);

        });
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.clickX=[];
        this.clickY=[];
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