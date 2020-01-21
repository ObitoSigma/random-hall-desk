import React, { Component } from "react";
import { Link } from "@reach/router";

/**
 * Parcel is a component that renders tracking of a parcel
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} worker_name
 * @param {string} worker_id
 * @param {string} tracking of the parcel
 */
class SingleParcel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.tracking} checked in by {this.props.worker_name}
      </div>
    );
  }
}

export default SingleParcel;