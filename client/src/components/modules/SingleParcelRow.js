import React, { Component } from "react";
import { Link } from "@reach/router";

/**
 * Renders row of a resident's undelivered parcels on Home
 *
 * Proptypes
 * @param {Array} parcels
 * @param {resident} resident
 * @param {function} deliverAll
 */
class SingleParcelRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let residentParcels = this.props.parcels.filter(parcel => parcel.resident == this.props.resident);
        let numberParcels = residentParcels.length;
        if (numberParcels !== 0) {
        return (
            <tr>
                <td>{this.props.resident} ({numberParcels})</td>
                <td><button onClick={this.props.deliverAll} value={this.props.resident}>Deliver</button></td>
            </tr>
        );
        } else { return null }
    }
}

export default SingleParcelRow;