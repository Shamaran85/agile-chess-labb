import React, { Component } from 'react';
import { userArgs, socketAPI } from '../config';

export class Put extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false
        };
    }

    handleUpdatetUser = () => {
        const userId = "5c255425bf2eed1b2847817d";
        const newUserInfo = {
            rating: Date.now()
        };

        const fetchUrl = `${userArgs.fetchUrl}/${userId}`;
        fetch(fetchUrl, {
            method: 'PUT',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + socketAPI.accessToken
            }),
            body: JSON.stringify(newUserInfo)
        })
        .then(() => {
            this.setState({ status: true });
        })
        .catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                <p>Update status: { this.state.status ? 'Successes!' : null }</p>
                <button type="button" onClick={this.handleUpdatetUser}>
                    Update the current user information
                </button>
            </div>
        );
    }
}