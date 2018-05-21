import React, {Component} from "react";

import CanvasDraw from "./CanvasDraw";
import BarChart from "./BarChart";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            predictions: []
        };
        this.updatePredictions = this.updatePredictions.bind(this);
        this.predictions = [];
    }

    updatePredictions(predict) {
        console.log("in", predict);
        this.setState({predictions: predict});
        //this.predictions = predict;
        //console.log(this.predictions);
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-4 col-sm-4">
                        <h2>Draw number from 0 to 9</h2>
                        <div className="wrapper">
                            <CanvasDraw ref={instance => {
                                this.canva = instance;
                            }} updatePred={this.updatePredictions}/>
                            <br/>
                        </div>
                            <button onClick={() => {
                                this.canva.clear();
                            }}>ClearMen
                            </button>
                    </div>

                    <div className="col-lg-8 col-md-8 col-sm-8">
                        <h2>Predictions</h2>
                        <BarChart predictions={this.state.predictions}/>
                    </div>
                </div>



            </div>

        );
    }
}

export default App;