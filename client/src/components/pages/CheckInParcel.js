import React, { Component } from "react";
import Cell from "../modules/Cell.js";
import { NewParcel } from "../modules/NewPostInput.js";

import { get, post } from "../../utilities";

import "./CheckInParcel.css";

class CheckInParcel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      parcels: [],
    };
  }

  componentDidMount() {
    document.title = "New Parcel";
    get("/api/parcels").then((parcelObjs) => {
      let reversedParcelObjs = parcelObjs.reverse();
      reversedParcelObjs.map((parcelObj) => {
        this.setState({ parcels: this.state.parcels.concat([parcelObj]) });
      });
    });
    get("/api/user", { userId: this.props.userId })
    .then((user) => this.setState({ user: user }));
  }

  addNewParcel = (parcelObj) => {
    this.setState({
      parcels: [parcelObj].concat(this.state.parcels),
    });
  };

  delParcel = (key) => {
    this.setState({
      parcels: this.state.parcels.filter((parcel) => parcel._id !== key)
    });
    post("/api/delete", { _id: key });
  }

  render() {
    let parcelsList = null;
    const hasParcels = this.state.parcels.length !== 0;
    if (hasParcels) {
      parcelsList = this.state.parcels.map((parcelObj) => (
        <Cell
          key={`Cell_${parcelObj._id}`}
          _id={parcelObj._id}
          tracking={parcelObj.tracking}
          worker_name={parcelObj.worker_name}
          worker_id={parcelObj.worker_id}
          userId={this.props.userId}
          delParcel={() => this.delParcel(parcelObj._id)}
        />
        // mass deliver button here
      ));
    } else {
      parcelsList = <div>No parcels!</div>;
    }
    return (
      <>
        {this.props.userId && <NewParcel addNewParcel={this.addNewParcel} />}
        {parcelsList}
      </>
    );
  }
}

export default CheckInParcel;