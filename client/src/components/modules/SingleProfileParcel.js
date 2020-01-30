import React, { Component } from "react";

/**
 * Renders parcel on worker profile
 *
 * Proptypes
 * @param {parcel} parcelObj
 */
class SingleProfileParcel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let date = new Date(this.props.parcelObj.arrivalDate);
    let day = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
    let time = date.getHours()+":"+date.getMinutes();
    return (
      <div>
        On {day} at {time}: {this.props.parcelObj.tracking} for resident {this.props.parcelObj.resident}.
      </div>
    );
  }
}

export default SingleProfileParcel;