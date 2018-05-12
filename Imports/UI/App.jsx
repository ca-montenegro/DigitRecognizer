import React, {Component} from "react";

import CanvasDraw from "./CanvasDraw";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="container">
                <CanvasDraw></CanvasDraw>
            </div>

        );
    }
}

export default App;