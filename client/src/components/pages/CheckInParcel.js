import React, { Component } from "react";
import { NewParcel } from "../modules/NewPostInput.js";

import { get, post } from "../../utilities";

import "./CheckInParcel.css";
import SingleParcel from "../modules/SingleParcel.js";

class CheckInParcel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      parcels: [],
      residentList: [],
    };
  }

  componentDidMount() {
    document.title = "New Parcel";
    get("/api/parcels").then((allParcelObjs) => {
      let parcelObjs = allParcelObjs.filter(parcelObj => parcelObj.delivered !== true);
      let reversedParcelObjs = parcelObjs.reverse();
      reversedParcelObjs.map((parcelObj) => {
        this.setState({ parcels: this.state.parcels.concat([parcelObj]) });
      });
    });
    get("/api/user", { userId: this.props.userId })
    .then((user) => this.setState({ user: user }));
    get("/api/residents").then((residentObjs) => {
      residentObjs.map((residentObj) => {
        this.setState({ residentList: this.state.residentList.concat([residentObj.name])});
      });
    });
  }

  addNewParcel = (parcelObj) => {
    this.setState({
      parcels: [parcelObj].concat(this.state.parcels),
    });
  };

  deliver = (key) => {
    this.setState({
      parcels: this.state.parcels.filter((parcel) => parcel._id !== key)
    });
    post("/api/deliver", { _id: key });
  }

  render() {
    let parcelsList = null;
    const hasParcels = this.state.parcels.length !== 0;
    if (hasParcels) {
      parcelsList = this.state.parcels.map((parcelObj) => (
        <SingleParcel
          _id={parcelObj._id}
          tracking={parcelObj.tracking}
          resident={parcelObj.resident}
          worker_name={parcelObj.worker_name}
          worker_id={parcelObj.worker_id}
          delivered={parcelObj.delivered}
          userId={this.props.userId}
          deliver={() => this.deliver(parcelObj._id)}
        />
      ));
    } else {
      parcelsList = <div>No parcels!</div>;
    }
    return (
      <>
        {this.props.userId && <NewParcel addNewParcel={this.addNewParcel} userId={this.props.userId} residentList={this.state.residentList} />}
        {parcelsList}
      </>
    );
  }
}

export default CheckInParcel;