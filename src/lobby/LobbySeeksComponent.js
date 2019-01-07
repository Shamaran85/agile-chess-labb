import React, { Component } from 'react';
import LobbyStore from '../store/LobbyStore';
import './seeks.css';
import { Redirect } from 'react-router-dom';
import { eventArgs, socketAPI } from '../config';


class LobbySeeksComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            localUserInfo: {}
        };
    }

    componentDidMount() {
        this.mounted = true;

        LobbyStore.getLocalUserInfo().subscribe((data) => {
            console.log('localUserInfo', data);
            this.handleSetState({ localUserInfo: data });
        });

        LobbyStore.getEvents().subscribe((eventList) => {
            console.log('comp-event-mounted', eventList);
            this.handleSetState({ events: eventList });
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


    enterGame(e, event){
        console.log('clickevent', event)
        if (Object.keys(this.state.localUserInfo).length > 0){
            const newStatus = {
                isSeeking: false,
                secondPlayer: this.state.localUserInfo._id
            }

            const fetchUrl = `${eventArgs.fetchUrl}/${event._id}`;
            fetch(fetchUrl, {
                method: 'PUT',
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + socketAPI.accessToken
                }),
                body: JSON.stringify(newStatus)
            })
            .then(() => {
                console.log('Update ok now')
                return <Redirect to="/game/:id" />
            })
            .catch(error => console.log(error.message));

        } else {
            console.log('got none')
        }

        return false;

    }

    render() {

        return (
            <div>
                <div className="mainBox">
                <table className="seeker-table">
                      <thead>
                            <tr>
                                <th>Name</th>
                                <th>Rating</th>
                                <th>Time</th>
                                <th>Type</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.events ?
                                this.state.events.map((user, index) =>
                                    <tr key={index}>
                                        <td><a onClick={(e)=>this.enterGame(e, user)}>{user.creatorId}</a></td>
                                        <td>1600</td>
                                        <td>{user.time}</td>
                                        <td>{user.gameType}</td>
                                    </tr>
                                ) : null
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        );
    }
}

export default LobbySeeksComponent;
