import React, { Component } from 'react';
import MainStore from '../store/MainStore';

export class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }
    
    componentDidMount() {
        this.mounted = true;

        MainStore.getUsers().subscribe((userList) => {
            console.log('comp-user-mounted', userList);
            this.handleSetState({ users: userList });
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
        if (this.state.users.length > 0) {
            return (
                <div>
                    <h3>USERS:</h3>
                    
                    {this.state.users.map((item, index)=>
                        <p key={index}>{JSON.stringify(item)}</p>
                    )}
                </div>
            );
        } else {
            return null;
        }
    }
};
