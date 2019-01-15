import { BehaviorSubject } from 'rxjs';
import { socket } from '../api/socket.io';
import { userArgs, eventArgs, socketAPI } from '../config/';

class LobbyStore {
    constructor() {
        this.eventBehavior = new BehaviorSubject([]);
        this.userInfo = new BehaviorSubject({});

        socket.on(eventArgs.ioEvent, (data) => {
            this.eventBehavior.next(data);
        });

        retrieveFromLocalStorage('userInfo')
            .then((data) => {
                if (Object.keys(data).length === 0){
                    this.createNewUser({
                        "name": "Anonymous"
                    });
                } else {
                    this.userInfo.next(data)
                }
            })
            .catch((err) => console.error(err));
    }

    getEvents() {
        return this.eventBehavior;
    }

    getLocalUserInfo() {
        return this.userInfo;
    }

    /**
     * Payload structure
     * @param {*} payload = {
     *      "_id": "userIdString"
     * }
     *
     * This function will do 2 tasks:
     * - store the user ID into localStorage { "_id": "userIdString" } with the key name is "userInfo"
     * - emit the "userInfo" object to other components via RxJS service
     */
    storeUserInfoToLocalStorage(payload) {
        storeToLocalStorage('userInfo', payload)
            .then(() => this.userInfo.next(payload))
            .catch((err) => console.err(err));

        return false;
    }

    /**
     * Payload structure
     * @param {*} userInfo = { JSON object }
     * 
     * This function will do 2 tasks:
     * - insert a new user into the database
     * - call the function storeUserInfoToLocalStorage(insertedUserId)
     */
    createNewUser(userInfo = {}) {
        if (Object.keys(userInfo).length > 0) {
            const fetchUrl = userArgs.fetchUrl;

            fetch(fetchUrl, {
                method: 'POST',
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + socketAPI.accessToken
                }),
                body: JSON.stringify(userInfo)
            })
            .then((response) => response.json())
            .then((result) => {
                this.storeUserInfoToLocalStorage({
                    "_id": result.insertedId
                });
            })
            .catch((error) => console.log(error));
        }
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

