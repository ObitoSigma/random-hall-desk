import React, { Component } from "react";
import { get } from "../../utilities";
import SingleResident from "../modules/SingleResident.js";

import "./ResidentList.css";

class ResidentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            residents: [],
            parcels: [],
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
        get("/api/parcels")
        .then((parcelObjs) => {
            parcelObjs.map((parcelObj) => {
              this.setState({ parcels: this.state.parcels.concat([parcelObj]) });
            });
        });
    }

    render() {
        let residentsList = null;
        const hasResidents = this.state.residents.length !== 0;
        const hasParcels = this.state.parcels.length !== 0;
        if (hasResidents && hasParcels) {
            residentsList = this.state.residents.map((residentObj) => (
                <SingleResident
                    resident={residentObj}
                    parcels={this.state.parcels}
                />
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