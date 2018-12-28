import React, { Component } from 'react';
import MainStore from '../store/MainStore';

export class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        };
    }
    componentDidMount() {
        this.mounted = true;

        MainStore.getEvents().subscribe((eventList) => {
            console.log('comp-event-mounted', eventList);
            this.handleSetState({ events: eventList });
        });
    }

    componentWillUnmount() {
        this.mounted = false;
        MainStore.unsubscribe();
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
        console.log('state', this.state)
        return (
            <div>
                <h3>EVENTS:</h3>
                
                {this.state.events.map((item, index)=>
                    <p key={index}>{JSON.stringify(item)}</p>
                )}
            </div>
        );
    }
};
