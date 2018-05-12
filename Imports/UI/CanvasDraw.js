import React, {Component} from "react";

class CanvasDraw extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount(){

        let clickX = [];
        let clickY = [];
        let clickDrag = [];
        let paint;
        let canvasDiv = document.getElementById("canvasDiv");
        canvas = document.createElement("canvas");
        canvas.setAttribute("id", "canvas");
        canvasDiv.appendChild(canvas);
        canva = $("#canvas");
        ctx = canvas.getContext("2d");
        canva.mousedown(function(e){
            let mouseX = e.pageX - this.offsetLeft;
            let mouseY = e.pageY - this.offsetTop;

            paint = true;
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
            redraw();
        });
        $("#canvas").mousemove((e)=>{
            if(paint){
                addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
                redraw();
            }
        });
        $("#canvas").mouseup((e)=>{
            paint = false;
        });
        $("#canvas").mouseleave((e)=>{
            paint = false;
        });

        function addClick(x,y, dragging)
        {
            clickX.push(x);
            clickY.push(y);
            clickDrag.push(dragging);
        }

        function redraw(){
            ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);

            ctx.strokeStyle = "#df4b26";
            ctx.lineJoin = "round";
            ctx.lineWidth = 5;

            for(let i = 0; i<clickX.length;i++){
                ctx.beginPath();
                if(clickDrag[i]&&i){
                    ctx.moveTo(clickX[i-1], clickY[i-1]);
                }
                else{
                    ctx.moveTo(clickX[i]-1, clickY[i]);
                }

                ctx.lineTo(clickX[i], clickY[i]);
                ctx.closePath();
                ctx.stroke();
            }
        }
    }

    render() {
        return (
            <div id="canvasDiv"></div>
        );
    }
}

export default CanvasDraw;