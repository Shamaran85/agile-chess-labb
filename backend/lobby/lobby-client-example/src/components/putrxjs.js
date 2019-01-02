import React, { Component } from 'react';
import MainStore from '../store/MainStore';

export class PutRxJS extends Component {
    handleUpdateEvent = (e) => {
        e.preventDefault();

        // Input data
        const payload = {
            id: "5c255a88cba74900171994fa",
            content: {
                timmer: Date.now(),
                friendId: Date.now()
            }
        };

        // Update an event via RxJS method
        MainStore.updateEvent(payload);
    }

    render() {
        return (
            <div>
                <p>Update an event via RxJS service:</p>

                <button type="button" onClick={(e) => this.handleUpdateEvent(e)}>
                    Update an event via RxJS
                </button>
            </div>
        )
    }
}

