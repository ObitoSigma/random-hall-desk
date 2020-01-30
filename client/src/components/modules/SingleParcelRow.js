import React, { Component } from "react";
import $ from 'jquery';

import "../../utilities.css";

/**
 * Renders row of a resident's undelivered parcels on Home
 *
 * Proptypes
 * @param {Array} parcels that have not been delivered
 * @param {String} resident
 * @param {function} deliverAll
 */
class SingleParcelRow extends Component {
    constructor(props) {
        super(props);
    }

    hideRows = () => {
        let residentClass = "."+this.props.resident;
        $(residentClass).toggle();
    }

    render() {
        let residentParcels = this.props.parcels.filter(parcel => parcel.resident == this.props.resident);
        let residentParcelList = residentParcels.map((parcel) => (
            <tr className={this.props.resident}><td>
                Tracking: {parcel.tracking}
                <span className="u-floatRight">
                    <button onClick={() => this.props.deliverOne(parcel)} >Deliver</button>
                </span>
            </td></tr>
        ));
        let numberParcels = residentParcels.length;
        if (numberParcels !== 0) {
        return (
            <tbody>
                <tr>
                    <td>
                        <button onClick={this.hideRows}>v</button>
                        {this.props.resident} ({numberParcels})
                        <span className="u-floatRight"><button onClick={this.props.deliverAll} value={this.props.resident}>Deliver All</button></span>
                    </td>
                </tr>
                {residentParcelList}
            </tbody>
        );
        } else { return null }
    }
}

export default SingleParcelRow;