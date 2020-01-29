import React, { Component } from "react";
import SingleItem from "../modules/SingleItem.js";
import { OutItem } from "../modules/NewPostInput.js";

import { get, post } from "../../utilities";

import "./CheckOutItem.css";

class CheckOutItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      availableItems: [],
      checkedOutItems: [],
      residentList: [],
    };
  }

  componentDidMount() {
    document.title = "Check Out Item";
    get("/api/items").then((allItemObjs) => {
      let itemObjs = allItemObjs.filter(itemObj => itemObj.available == false);
      let reversedItemObjs = itemObjs.reverse();
      reversedItemObjs.map((itemObj) => {
        this.setState({ checkedOutItems: this.state.checkedOutItems.concat([itemObj]) });
      });
      let availableItemObjs = allItemObjs.filter(itemObj => itemObj.available == true);
      availableItemObjs.map((itemObj) => {
        this.setState({ availableItems: this.state.availableItems.concat([itemObj]) });
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

  setCheckedOutItems = (itemObj) => {
    this.setState({
      availableItems: this.state.availableItems.filter((item) => item._id !== itemObj._id),
      checkedOutItems: [itemObj].concat(this.state.checkedOutItems),
    });
  }

  checkInItem = (itemObj) => {
    this.setState({
      availableItems: this.state.availableItems.concat([itemObj]),
      checkedOutItems: this.state.checkedOutItems.filter((item) => item._id !== itemObj._id)
    });
    post("/api/inItem", { _id: itemObj._id });
  }

  render() {
    let itemsList = null;
    const hasItems = this.state.checkedOutItems.length !== 0;
    if (hasItems) {
      itemsList = this.state.checkedOutItems.map((itemObj) => (
        <SingleItem
          _id={itemObj._id}
          title={itemObj.title}
          category={itemObj.category}
          resident={itemObj.resident}
          worker_name={itemObj.worker_name}
          worker_id={itemObj.worker_id}
          available={itemObj.available}
          userId={this.props.userId}
          checkInItem={() => this.checkInItem(itemObj)}
        />
      ));
    } else {
      itemsList = <div>No items currently checked out.</div>;
    }
    return (
      <>
        {this.props.userId && <OutItem setCheckedOutItems={this.setCheckedOutItems} userId={this.props.userId} itemList={this.state.availableItems} residentList={this.state.residentList} />}
        {itemsList}
      </>
    );
  }
}

export default CheckOutItem;