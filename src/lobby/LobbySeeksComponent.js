import React, { Component } from 'react';
import LobbyStore from '../store/LobbyStore';

class LobbySeeksComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        };
    }

    componentDidMount() {
        this.mounted = true;

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

    render() {
        return (
            <div>
                <div>
                    Seeks
                </div>
            </div>
        );
    }
}

export default LobbySeeksComponent;
