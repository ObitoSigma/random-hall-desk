import React, { Component } from "react";

import "./ResidentList.css";

class ResidentList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        document.title = "Resident List";
    }

    render() {
        return (
            <>
                <h1>List of Residents</h1>
            </>
        );
    }
}

export default ResidentList;