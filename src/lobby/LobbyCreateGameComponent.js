import React, { Component } from 'react';
import LobbyStore from '../store/LobbyStore';

class LobbyCreateGameComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            localUserInfo: {}
        };
    }

    componentDidMount() {
        this.mounted = true;

        // Stream data from RxJS service
        LobbyStore.getLocalUserInfo().subscribe((data) => {
            console.log('comp-createGame-localUserInfo',data)
            this.handleSetState({ localUserInfo: data });
        });
    }

    componentWillUnmount() {
        this.mounted = false;
        LobbyStore.unsubscribe();
    }

    handleSetState = (payload) => {
        if (this.mounted) {
            this.setState(payload);
        } else {
            console.error('The component is not mounted');
            return null;
        }
    }

    handleClick = (e) => {
        e.preventDefault();

        /**
         * Send data to RxJS service for "one action - two reasons":
         * - Store userInfo into localStorage
         * - Stream userInfo to other components 
         * Payload structure: {
         *      JSON object
         * }
         */
        LobbyStore.storeUserInfoToLocalStorage({
            _id:"a88dhhkk35kkdj10cnnbw663bb",
            name:"Erik Andersson"
        });    
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>Click here</button>
                Create Game
            </div>
        );
    }
}

export default LobbyCreateGameComponent;
