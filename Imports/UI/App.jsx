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
                <br/>
                <h1>Digit Recognizer</h1>
                <h2>TensorflowJS, React, Meteor, D3</h2>
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-4 col-sm-4">
                        <h2>Draw number 0 to 9</h2>
                        <div className="wrapper">
                            <CanvasDraw ref={instance => {
                                this.canva = instance;
                            }} updatePred={this.updatePredictions}/>

                        </div>
                        <br/>
                        <br/>
                            <button className="btn btn-dark" onClick={() => {
                                this.canva.clear();
                            }}>Clear canvas
                            </button>
                    </div>

                    <div className="col-lg-8 col-md-8 col-sm-8">
                        <h2>TensorFlow predictions</h2>
                        <BarChart predictions={this.state.predictions}/>
                    </div>
                </div>
                <h4>Made with ❤️ by <a href="https://ca-montenegro.github.io">Camilo Montenegro</a></h4>



            </div>

        );
    }
}

export default App;