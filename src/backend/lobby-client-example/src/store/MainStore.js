import { Observable } from 'rxjs';
import { socket } from '../api/socket.io';
import { userArgs, eventArgs } from '../config/';

socket.on('message', (message) => {
    console.log('Responsed message', message);
});

class MainStore {
    socket;

    getUsers() {
        const userObservable = new Observable((userObserver) => {
            // Emit data to the server - Using only for test
            socket.emit('clientInfo', { name: 'Connected successfully! I am client here now.' });

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
}

export default new MainStore();