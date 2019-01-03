import { BehaviorSubject } from 'rxjs';
import { socket } from '../api/socket.io';
import { eventArgs, socketAPI } from '../config/';

class LobbyStore {
    constructor() {
        this.eventBehavior = new BehaviorSubject([]);
        this.userInfo = new BehaviorSubject({});

        socket.on(eventArgs.ioEvent, (data) => {
            this.eventBehavior.next(data);
        });

        retrieveFromLocalStorage('userInfo')
            .then((data) => this.userInfo.next(data))
            .catch((err) => console.error(err));
    }

    getEvents() {
        return this.eventBehavior;
    }

    getLocalUserInfo() {
        return this.userInfo;
    }

    storeUserInfoToLocalStorage(payload) {
        storeToLocalStorage('userInfo', payload)
            .then(() => this.userInfo.next(payload))
            .catch((err) => console.err(err));

        return this.userInfo;
    }

    
    /**
     * Payload structure
     * @param {*} payload = {
     *      id: "eventIdString",
     *      content: { JSON object }
     * }
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
            .catch((err) => console.log(err));
    }
}

// FUNCTIONS
export function retrieveFromLocalStorage(key, defaultReturn = {}) {
    return new Promise((resolve, reject) => {
        if (typeof (Storage) === 'undefined') {
            return reject(new Error('The web browser is not supported web storage.'));
        }

        if (localStorage.getItem(key)) {
            resolve(JSON.parse(localStorage.getItem(key)));
        } else {
            resolve(defaultReturn);
        }
    });
}

export function storeToLocalStorage(key, data) {
    return new Promise((resolve, reject) => {
        if (typeof (Storage) === 'undefined') {
            return reject(new Error('The web browser is not supported web storage.'));
        }

        resolve(localStorage.setItem(key, JSON.stringify(data)));
    });
}

// Export modules
export default new LobbyStore();
