import { Observable } from 'rxjs';
import { socket } from '../api/socket.io';
import { userArgs, eventArgs, socketAPI } from '../config/';

socket.on('message', (message) => {
    console.log('Responsed message', message);
});

class MainStore {
    socket;

    getUsers() {
        const userObservable = new Observable((userObserver) => {
            // Emit data to the server - Using only for test
            socket.emit('clientInfo', { name: 'Connected successfully! I am your client now.' });

            // Listen to data from the server
            socket.on(userArgs.ioEvent, (data) => {
                userObserver.next(data);
            });

            return () => {
                socket.disconnect();
            };
        });

        return userObservable;
    }

    getEvents() {
        const eventObservable = new Observable((eventObserver) => {
            socket.on(eventArgs.ioEvent, (data) => {
                eventObserver.next(data);
            });

            return () => {
                socket.disconnect();
            };
        });

        return eventObservable;
    }

    updateEvent(payload){
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

export default new MainStore();