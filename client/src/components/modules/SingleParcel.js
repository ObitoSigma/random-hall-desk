import React, { Component } from "react";
import { Link } from "@reach/router";

/**
 * Parcel is a component that renders tracking of a parcel
 *
 * Proptypes
 * @param {string} _id of the parcel
 * @param {string} worker_name
 * @param {string} worker_id
 * @param {string} tracking of the parcel
 * @param {string} resident of the parcel
 */
class SingleParcel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let deliverButton = null;
    if( !this.props.delivered ) {
      deliverButton = (<button onClick={this.props.deliver}>Deliver</button>)
    }
    return (
      <div>
        {deliverButton}
        {this.props.tracking} for {this.props.resident} checked in by {this.props.worker_name}
      </div>
    );
  }
}

export default SingleParcel;