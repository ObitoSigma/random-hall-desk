import React, { Component } from "react";

import "./NewPostInput.css";
import { post } from "../../utilities";
import { get } from "mongoose";

/**
 * New Post is a parent component for all input components
 */
class NewPostInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
    };
  }

  // called whenever the user types in the new post input box
  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  // called when the user hits "Submit" for a new post
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit && this.props.onSubmit(this.state.value);
    this.setState({
      value: "",
    });
  };

  render() {
    return (
      <div className="u-flex">
        <input
          type="text"
          placeholder={this.props.defaultText}
          value={this.state.value}
          onChange={this.handleChange}
          className="NewPostInput-input"
        />
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
 * New Parcel is a New Post component for parcels
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 */
class NewParcel extends Component {
  addParcel = (value) => {
    const body = { tracking: value };
    post("/api/parcel", body).then((parcel) => {
      // display this parcel on the screen
      this.props.addNewParcel(parcel);
    });
    post("/api/pushParcel", { _id: this.props.userId, tracking: value});
  };

  render() {
    return <NewPostInput defaultText="New Parcel" onSubmit={this.addParcel} />;
  }
};

/**
 * New Item is a New Post component for items
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 */
class NewItem extends Component {
  addItem = (value) => {
    const body = { title: value };
    post("/api/item", body).then((item) => {
      // display this item on the screen
      this.props.addNewItem(item);
    });
  };

  render() {
    return <NewPostInput defaultText="New Item" onSubmit={this.addItem} />;
  }
};

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

export { NewParcel, NewItem, NewResident };