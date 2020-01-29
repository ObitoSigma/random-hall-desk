import React, { Component } from "react";

import "./NewPostInput.css";
import { post } from "../../utilities";
import { get } from "mongoose";

/**
 * New Parcel handles the arrival of a parcel for a resident
 */
class NewParcel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value1: "",
      value2: "",
    };
  }

  addParcel = (value1, value2) => {
    const body = { tracking: value1, resident: value2 };
    post("/api/parcel", body).then((parcel) => {
      // display this parcel on the screen
      this.props.addNewParcel(parcel);
    });
  };

  // called whenever the user types in the new post input box
  handleChange1 = (event) => {
    this.setState({
      value1: event.target.value,
    });
  };

  //called whenever the user changes the option
  handleChange2 = (event) => {
    this.setState({
      value2: event.target.value,
    });
  };

  // called when the user hits "Submit" for a new post
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.value1 !== "" && this.state.value2 !== "") {
      this.addParcel && this.addParcel(this.state.value1, this.state.value2);
      this.setState({
        value1: "",
        value2: "",
      });
    }
  };

  render() {
    let residentButtons = this.props.residentList.map((resident) => (
      <option value={resident}>{resident}</option>
    ));
    return (
      <div className="u-flex">
        <input
          type="text"
          placeholder="New Parcel"
          value={this.state.value1}
          onChange={this.handleChange1}
          className="NewPostInput-input"
        />
        <select
          value={this.state.value2}
          onChange={this.handleChange2}
          className="NewPostInput-input"
        >
          <option value="">Resident</option>
          {residentButtons}
        </select>
        <button
          type="submit"
          className="NewPostInput-button u-pointer"
          value="Submit"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </div>
    );
  }
}

/**
 * Out Item handles the assignment of an item to a resident
 */
class OutItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value1: "",
      value2: "",
    };
  }

  checkOutItem = (value1, value2) => {
    const body = { _id: value1, resident: value2 };
    post("/api/outItem", body).then((item) => {
      // display this item on the screen
      this.props.setCheckedOutItems(item);
    });
  };

  // called whenever the user types in the new post input box
  handleChange1 = (event) => {
    this.setState({
      value1: event.target.value,
    });
  };

  //called whenever the user changes the option
  handleChange2 = (event) => {
    this.setState({
      value2: event.target.value,
    });
  };

  // called when the user hits "Submit" for a new post
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.value1 !== "" && this.state.value2 !== "") {
      this.checkOutItem && this.checkOutItem(this.state.value1, this.state.value2);
      this.setState({
        value1: "",
        value2: "",
      });
    }
  };

  render() {
    let itemButtons = this.props.itemList.map((item) => (
      <option value={item._id}>{item.title}</option>
    ));
    let residentButtons = this.props.residentList.map((resident) => (
      <option value={resident}>{resident}</option>
    ));
    return (
      <div className="u-flex">
        <select
          value={this.state.value1}
          onChange={this.handleChange1}
          className="NewPostInput-input"
        >
          <option value="">Item</option>
          {itemButtons}
        </select>
        <select
          value={this.state.value2}
          onChange={this.handleChange2}
          className="NewPostInput-input"
        >
          <option value="">Resident</option>
          {residentButtons}
        </select>
        <button
          type="submit"
          className="NewPostInput-button u-pointer"
          value="Submit"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </div>
    );
  }
}

/**
 * New Resident is a New Post component for residents
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 */
class NewResident extends Component {
  addResident = (value) => {
    const body = { content: value };
    post("/api/resident", body).then((resident) => {
      // display this resident on the screen
      this.props.addNewResident(resident);
    });
  };

  render() {
    return <NewPostInput defaultText="New Resident" onSubmit={this.addResident} />;
  }
};

export { NewParcel, OutItem, NewResident };