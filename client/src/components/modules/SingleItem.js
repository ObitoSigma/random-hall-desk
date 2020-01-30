import React, { Component } from "react";

/**
 * Item is a component that renders tracking of a item
 *
 * Proptypes
 * @param {string} _id of the item
 * @param {string} worker_name
 * @param {string} worker_id
 * @param {string} title of the item
 * @param {string} category of the item
 * @param {string} resident of the item
 * @param {Boolean} available of the item
 */
class SingleItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let checkInButton = null;
    if( !this.props.available ) {
      checkInButton = (<button onClick={this.props.checkInItem}>Check In</button>)
    }
    return (
      <div>
        {checkInButton}
        {this.props.title} ({this.props.category}) lent to {this.props.resident} by {this.props.worker_name}
      </div>
    );
  }
}

export default SingleItem;