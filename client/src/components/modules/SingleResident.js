import React, { Component } from "react";
import { Link } from "@reach/router";
import SingleParcel from "./SingleParcel";

/**
 * Resident is a component that renders tracking of a parcel
 *
 * Proptypes
 * @param {string} _id of the resident
 * @param {string} name
 */
class SingleResident extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let parcelHistory = null;
    let residentParcels = null;
    const hasParcels = this.props.parcels.length !== 0;
    if (hasParcels) {
        residentParcels = this.props.parcels.filter(parcelObj => parcelObj.resident == this.props.resident.name);
        parcelHistory = residentParcels.map((parcel) => (
            <div>
                {parcel.tracking} checked in by {parcel.worker_name}
            </div>
        ));
    } else {
        parcelHistory = <div>Loading!</div>;
    }
    return (
      <div>
        <h2>Resident: {this.props.resident.name}</h2>
        <h3>Parcel History:</h3>
        <div>{parcelHistory}</div>
      </div>
    );
  }
}

export default SingleResident;