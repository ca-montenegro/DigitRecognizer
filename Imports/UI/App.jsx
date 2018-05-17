import React, {Component} from "react";

import CanvasDraw from "./CanvasDraw";
import BarChart from "./BarChart";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            predictions:[]
        };
        this.updatePredictions = this.updatePredictions.bind(this);
        this.predictions = [];
    }

    updatePredictions(predict){
        console.log("in", predict);
        this.setState({predictions:predict});
        //this.predictions = predict;
        //console.log(this.predictions);
    }

    render() {
        return (
            <div className="container row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="wrapper">
                        <CanvasDraw ref = {instance =>{this.canva = instance;}} updatePred = {this.updatePredictions}/>
                        <br/>

                    </div>
                    <button onClick={()=>{this.canva.clear();}}>ClearMen</button>

                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <BarChart predictions = {this.state.predictions}/>
                </div>

            </div>

        );
    }
}

export default App;