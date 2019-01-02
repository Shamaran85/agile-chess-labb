import React, { Component } from 'react';
import { User, Event, Post, Put, PutRxJS } from './components/';

export default class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Post />
                <Put />
                <PutRxJS />

                <User />
                <Event />
            </React.Fragment>
        );
    }
};
