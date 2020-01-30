import React, { Component } from "react";
import { get } from "../../utilities";
import SingleResidentParcel from "../modules/SingleResidentParcel";

class Resident extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resident: undefined,
            parcels: [],
        };
    }
    
    componentDidMount() {
        document.title = "Resident Profile";
        get("/api/resident", { residentId: this.props.residentId })
            .then((resident) => this.setState({ resident: resident }));
        get("/api/parcels").then((parcelObjs) => {
            let myParcels = parcelObjs.filter(parcelObj => parcelObj.resident == this.state.resident.name);
            myParcels.map((myParcel) => {
                this.setState({ parcels: this.state.parcels.concat(myParcel) });
            })
        });
    }

    render() {
        if (!this.state.resident) {
            return <div> Loading! </div>;
        }
        let parcelHistory = null;
        const hasParcels = this.state.parcels.length !== 0;
        if (hasParcels) {
            parcelHistory = this.state.parcels.map((parcelObj) => (
                <SingleResidentParcel parcelObj={parcelObj} />
            ));
        } else {
            parcelHistory = <div>This resident has never received a parcel.</div>;
        }
        return (
          <div>
            <h2>Resident: {this.state.resident.name}</h2>
            <h3>Parcel History:</h3>
            <div>{parcelHistory}</div>
          </div>
        );
    }
}

export default Resident;