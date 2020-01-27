import React, { Component } from "react";
import { Link } from "@reach/router";
import SingleParcelRow from "../modules/SingleParcelRow.js";

import { get, post } from "../../utilities.js";
import "../../utilities.css";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parcels: [],
      residents: [],
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
      console.log(this.state.residents)
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

  render() {
    let parcelsList = null;
    const hasParcels = this.state.parcels.length !== 0;
    const hasResidents = this.state.residents.length !== 0
    if (hasParcels && hasResidents) {
      parcelsList = this.state.residents.map((resident) => (
        <SingleParcelRow
          parcels={this.state.parcels}  
          resident={resident}
          deliverAll={() => this.deliverAll(resident)}
        />
      ));
    } else {
      parcelsList = <tr><th>Loading</th></tr>;
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
                    <tr>
                      <th>Parcels</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parcelsList}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="Home-subContainer u-textCenter">
            <table id="table">
              <thead>
                <tr>
                  <th>Desk Items</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Jane Doe (2)</td>
                </tr>
                <tr>
                  <td>Hantoa Tenwhij (1)</td>
                </tr>
                <tr>
                  <td>Ernst Handel</td>
                </tr>
                <tr>
                  <td>Island Trading</td>
                </tr>
                <tr>
                  <td>Laughing Bacchus Winecellars</td>
                </tr>
                <tr>
                  <td>Magazzini Alimentari Riuniti</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
