import { BehaviorSubject } from 'rxjs';
import { socket } from '../api/socket.io';
import { userArgs, eventArgs, socketAPI } from '../config/';

// Using for connection testing
socket.on('message', (message) => {
    console.log('Responsed message', message);
});

class LobbyStore {
    constructor() {
        this.userBehavior = new BehaviorSubject([]);
        this.eventBehavior = new BehaviorSubject([]);

        socket.on(userArgs.ioEvent, (data) => {
            this.userBehavior.next(data);
        });

        socket.on(eventArgs.ioEvent, (data) => {
            this.eventBehavior.next(data);
        });
    }

    getUsers() {
        return this.userBehavior;
    }

    getEvents() {
        return this.eventBehavior;
    }

    /**
     * updateEvent() service
     * @param {*} payload
     * 
     * Payload structure
     * const payload = {   
     *           id: "eventIdString",
     *           content: { JSON object }
     *       };
     */
    updateEvent(payload) {
        const eventId = payload.id;
        const eventContent = payload.content;

        const fetchUrl = `${eventArgs.fetchUrl}/${eventId}`;
        fetch(fetchUrl, {
            method: 'PUT',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + socketAPI.accessToken
            }),
            body: JSON.stringify(eventContent)
        })
        .then(() => console.log('Event is updated successfully!'))
        .catch((error) => console.log(error));
    }
}

export default new LobbyStore();