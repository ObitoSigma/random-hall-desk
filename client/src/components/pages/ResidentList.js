import React, { Component } from "react";
import { Link } from "@reach/router";
import { get } from "../../utilities";
import SingleResident from "../modules/SingleResident.js";

import "./ResidentList.css";

class ResidentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            residents: [],
        };
    }

    componentDidMount() {
        document.title = "Resident List";
        get("/api/residents")
        .then((residentObjs) => {
            residentObjs.map((residentObj) => {
              this.setState({ residents: this.state.residents.concat([residentObj]) });
            });
        });
    }

    render() {
        let residentsList = null;
        const hasResidents = this.state.residents.length !== 0;
        if (hasResidents) {
            residentsList = this.state.residents.map((residentObj) => (
                <div>
                    <Link to={`/resident/${residentObj._id}`}>
                        {residentObj.name}
                    </Link>
                </div>
            ));
        } else {
            residentsList = <div>Loading!</div>;
        }
        return (
            <>
                <h1>List of Residents</h1>
                {residentsList}
            </>
        );
    }
}

export default ResidentList;