import React, {Component} from "react";

import CanvasDraw from "./CanvasDraw";
import BarChart from "./BarChart";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="container row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <CanvasDraw/>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <BarChart></BarChart>
                </div>

            </div>

        );
    }
}

export default App;