import React, { Component } from "react";
import { Link } from "@reach/router";
import SingleParcelRow from "../modules/SingleParcelRow.js";
import SingleItemRow from "../modules/SingleItemRow.js";

import { get, post } from "../../utilities.js";
import "../../utilities.css";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parcels: [],
      residents: [],
      items: [],
    };
  }

  componentDidMount() {
    get("/api/parcels").then((allParcelObjs) => {
      let parcelObjs = allParcelObjs.filter(parcelObj => parcelObj.delivered !== true);
      parcelObjs.map((parcelObj) => {
        this.setState({
          parcels: this.state.parcels.concat([parcelObj]),
          residents: this.state.residents.concat([parcelObj.resident])
        });
      });
      this.setState({residents: this.state.residents.filter((r, i) => this.state.residents.indexOf(r)==i)});
    });
    get("/api/items").then((allItemObjs) => {
      let outItemObjs = allItemObjs.filter(item => item.available == false);
      outItemObjs.map((itemObj) => {
        this.setState({ items: this.state.items.concat([itemObj]) });
      });
    });
  }

  deliverOne = (parcelObj) => {
    post("/api/deliver", { _id: parcelObj._id });
    this.setState({
      parcels: this.state.parcels.filter(parcel => parcel._id !== parcelObj._id)
    });
  }

  deliverAll = (resident) => {
    let residentParcels = this.state.parcels.filter(parcel => parcel.resident == resident);
    residentParcels.map((parcel) => {
      post("/api/deliver", { _id: parcel._id });
    });
    this.setState({
      parcels: this.state.parcels.filter(parcel => parcel.resident !== resident)
    });
  }

  checkIn = (itemObj) => {
    post("/api/inItem", { _id: itemObj._id });
    this.setState({
      items: this.state.items.filter(item => item._id !== itemObj._id)
    });
  }

  render() {
    let parcelsList = null;
    const hasParcels = this.state.parcels.length !== 0;
    let itemsList = null;
    const hasItems = this.state.items.length !== 0;
    const hasResidents = this.state.residents.length !== 0;
    if (hasParcels && hasItems && hasResidents) {
      parcelsList = this.state.residents.map((resident) => (
        <SingleParcelRow
          parcels={this.state.parcels}
          resident={resident}
          deliverOne={this.deliverOne}
          deliverAll={() => this.deliverAll(resident)}
        />
      ));
      itemsList = this.state.items.map((item) => (
        <SingleItemRow
          item={item}
          checkIn={() => this.checkIn(item)}
        />
      ));
    } else {
      parcelsList = <tr><th>Loading</th></tr>;
      itemsList = <tr><th>Loading</th></tr>;
    }
    return (
      <>
        <div className="u-flex u-flex-alignStretch">
          <div className="Home-sidebar u-textCenter u-flexColumn">
            <h4 className="Home-subTitle">
              Resources
            </h4>
            <div className="Home-sidebar-text">
              Schedule
            </div>
            <Link to="/residentlist/" className="Home-sidebar-text">
              Residents
            </Link>
            <div className="Home-sidebar-text">
              Guest List
            </div>
            <div className="Home-sidebar-text">
              Forwarding Addresses
            </div>
            <div className="Home-sidebar-text">
              Sodafridge
            </div>
            <div className="Home-sidebar-text">
              Manual
            </div>
          </div>
          <div className="Home-subContainer u-textCenter">
            <div id="table">
              <div id="table-scroll">
                <table>
                  <thead>
                    <tr className="u-floatRight">
                      <th>
                        Parcels
                        <span className="u-floatRight">
                          <Link to="/checkinparcel"><button>New Parcel</button></Link>
                        </span>
                      </th>
                    </tr>
                  </thead>
                  {parcelsList}
                </table>
              </div>
            </div>
          </div>
          <div className="Home-subContainer u-textCenter">
            <div id="table">
              <div id="table-scroll">
                <table>
                  <thead>
                    <tr className="u-floatRight">
                      <th>
                        Items
                        <span className="u-floatRight">
                          <Link to="/checkoutitem"><button>Check Out Item</button></Link>
                        </span>
                      </th>
                    </tr>
                  </thead>
                  {itemsList}
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
