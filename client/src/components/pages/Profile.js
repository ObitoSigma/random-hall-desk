import React, { Component } from "react";
import { get } from "../../utilities";

import SingleProfileParcel from "../modules/SingleProfileParcel.js";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            parcels: [],
        };
    }

    componentDidMount() {
        document.title = "Worker Profile";
        get("/api/user", { userId: this.props.userId }).then((user) => {
            this.setState({ user: user });
            return get("/api/parcels");
        })
        .then((parcelObjs) => {
            let myParcels = parcelObjs.filter(parcelObj => parcelObj.worker_id == this.state.user._id);
            myParcels.map((myParcel) => {
                this.setState({ parcels: this.state.parcels.concat(myParcel) });
            })
        });
    }

    render() {
        if (!this.state.user) {
            return <div> Loading! </div>;
        }
        let parcelHistory = null;
        const hasParcels = this.state.parcels.length !== 0;
        if (hasParcels) {
          parcelHistory = this.state.parcels.map((parcelObj) => (
            <SingleProfileParcel parcelObj={parcelObj} />
          ));
        } else {
          parcelHistory = <div>This user has not checked in any parcels.</div>;
        }
        return (
            <>
                <h1>Worker Profile: {this.state.user.name}</h1>
                <h2>History of parcels arrived:</h2>
                <div>{parcelHistory}</div>
            </>
        );
    }
}

export default Profile;