import React, { Component } from "react";
import { get } from "../../utilities";

import "./Profile.css";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
        };
    }

    componentDidMount() {
        document.title = "Worker Profile";
        get("/api/user", { userId: this.props.userId })
            .then((user) => this.setState({ user: user }));
    }

    render() {
        if (!this.state.user) {
            return <div> Loading! </div>;
        }
        return (
            <>
                <h1>Worker Profile: {this.state.user.name}</h1>
                <h2>Parcel history:</h2>
                <div>{JSON.stringify(this.state.user.parcelHistory)}</div>
            </>
        );
    }
}

export default Profile;