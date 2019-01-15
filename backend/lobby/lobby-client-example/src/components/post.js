import React, { Component } from 'react';
import { userArgs, socketAPI } from '../config';

export class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            insertedUserId: ''
        };
    }

    handleInsertUser = () => {
        const newUser = {
            username: "",
            password: "",
            name: "Anonyms",
            rating: 1600
        };

        const fetchUrl = userArgs.fetchUrl;
        fetch(fetchUrl, {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + socketAPI.accessToken
            }),
            body: JSON.stringify(newUser)
        })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            this.setState({ insertedUserId: result.insertedId });
        })
        .catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                <p>insertedUserId: {this.state.insertedUserId}</p>
                <button type="button" onClick={this.handleInsertUser}>
                    Insert a new anonyms user
                </button>
            </div>
        );
    }
}