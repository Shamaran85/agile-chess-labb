import React, { Component } from 'react';
import { User, Event, Post, Put } from './components/';

export default class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Post />
                <Put />
                <User />
                <Event/>
            </React.Fragment>
        );
    }
};
