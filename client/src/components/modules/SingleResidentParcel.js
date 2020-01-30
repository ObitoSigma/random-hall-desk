import React, { Component } from "react";

/**
 * Renders parcel on resident profile
 *
 * Proptypes
 * @param {parcel} parcelObj
 */
class SingleResidentParcel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let date = new Date(this.props.parcelObj.arrivalDate);
    let day = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
    let time = date.getHours()+":"+date.getMinutes();
    return (
      <div>
        On {day} at {time}: {this.props.parcelObj.tracking} by worker {this.props.parcelObj.worker_name}.
      </div>
    );
  }
}

export default SingleResidentParcel;