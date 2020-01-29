import React, { Component } from "react";
import $ from 'jquery';

import "../../utilities.css";

/**
 * Renders row of a resident's undelivered items on Home
 *
 * Proptypes
 * @param {Array} items that are checked out
 * @param {String} resident
 * @param {function} checkIn
 */
class SingleItemRow extends Component {
    constructor(props) {
        super(props);
    }

    hideRows = () => {
        let itemClass = "."+this.props.item._id;
        $(itemClass).toggle();
    }

    render() {
        return (
            <tbody>
                <tr>
                    <td>
                        <button onClick={this.hideRows}>v</button>
                        {this.props.item.title} ({this.props.item.resident})
                        <span className="u-floatRight"><button onClick={this.props.checkIn} value={this.props.item}>Check In</button></span>
                    </td>
                </tr>
                <tr className={this.props.item._id}><td>Category: {this.props.item.category}</td></tr>
                <tr className={this.props.item._id}><td>Worker: {this.props.item.worker_name}</td></tr>
            </tbody>
        );
    }
}

export default SingleItemRow;