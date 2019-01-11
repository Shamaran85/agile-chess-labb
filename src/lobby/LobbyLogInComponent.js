import React, { Component } from 'react';
import AuthForm from './components/AuthForm'
import LobbyStore from '../store/LobbyStore';

import { userArgs, socketAPI } from '../config';

class LobbyLoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      isLoggedIn: false,
      errorMessage: '',
      isRegistered: true,
      isValid: false,
      userName: {
        value: '',
        valid: false,
        touched: false,
      },
      password: {
        value: '',
        valid: false,
        touched: false,
      }
    }
  }
  componentDidMount() {

  }
  checkValidity = (value, validType) => {
    let isValid = true;
    
    if (validType.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (validType.minLength) {
      isValid = value.length >= validType.minLength && isValid;
    }
    if (validType.maxLength) {
      isValid = value.length <= validType.maxLength && isValid;
    }
    return isValid;
  }
  toggleAuthType = () => {
    this.setState({ isRegistered: !this.state.isRegistered, errorMessage: '' })
  }
  showAuth = () => {
    this.setState(
      { 
        ...this.state,
        show: true, 
        isRegistered: true,
        userName: {
          value: '',
          valid:false,
          touched: false
        },
        password: {
          value: '',
          valid:false,
          touched: false
        }
      }
    )
  }
  hideAuth = () => {
    this.setState({ ...this.state, show: false, errorMessage: '' })
  }
  handleNameInput = event => {
    this.setState({
      ...this.state,
      errorMessage: '',
      userName: {
        value: event.target.value,
        valid: this.checkValidity(event.target.value, {required: true, minLength: 3, maxLength: 15}),
        touched: true,
        showError: true
      }
    })
  }
  handlePassInput = event => {
    this.setState({
      ...this.state,
      errorMessage: '',
      password: {
        value: event.target.value,
        valid: this.checkValidity(event.target.value, {required: true, minLength: 6, maxLength: 20}),
        touched: true,
        showError: true
      }
    })
    
  }
  logOut = () => {
    this.setState({...this.state, isLoggedIn: false})
  }
  loginUser() {
    const fetchUrl = userArgs.authUrl;
    fetch(fetchUrl, {
      method: 'POST',
      body: JSON.stringify({
        username: this.state.userName.value,
        password: this.state.password.value
      }
      ),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + socketAPI.accessToken
      }
    })
    .then(response => response.json())
    .then((data) => {
      if (data.status) {
        LobbyStore.storeUserInfoToLocalStorage(data._id)
        this.setState({ ...this.state, isLoggedIn: true})
        this.hideAuth();
      } else {
        this.setState({...this.state, errorMessage: data.message})
      }

    })
    .catch(error => console.log(error));
    
  }
  createUser() {
    const fetchUrl = userArgs.checkExistUrl;
    fetch(fetchUrl, {
      method: 'POST',
      body: JSON.stringify(
        {
          username: this.state.userName.value
        }
      ),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + socketAPI.accessToken
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data && data.status === false) {
        const fetchUrl = userArgs.fetchUrl;
        fetch(fetchUrl, {
          method: 'POST',
          body: JSON.stringify(
            {
              username: this.state.userName.value,
              password: this.state.password.value
            }
          ),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + socketAPI.accessToken
          }
        })
        .then(response => response.json())
        .then(data => {
          LobbyStore.storeUserInfoToLocalStorage(data.insertedId)
          this.setState({ ...this.state, isLoggedIn: true})
          this.hideAuth();
        })
        .catch(error => console.log(error));
        
      } else {
        this.setState({...this.state, errorMessage: 'username already in use'})
      }
    })
    .catch(error => console.log(error));
    
  }
  handleSubmit = event => {
    event.preventDefault();
    
    if (this.state.userName.valid && this.state.password.valid) {
      if (this.state.isRegistered) {
        this.loginUser()
      } else {
        this.createUser()
      }
    }
  }
  render() {
    let showUserError = false;
    if (!this.state.userName.valid && this.state.userName.touched) {
      showUserError = true;
    }
    let showPassError = false
    if (!this.state.password.valid && this.state.password.touched) {
      showPassError = true;
    }
    let displayAuth = (
      <div>
        <p onClick={this.showAuth}>Logga in</p>
        <AuthForm
          show={this.state.show}
          login={this.state.isRegistered}
          switchAuth={this.toggleAuthType}
          handleClose={this.hideAuth}
          submitForm={this.handleSubmit}
          handleName={this.handleNameInput}
          handlePass={this.handlePassInput}
          userName={this.state.userName.value}
          password={this.state.password.value}
          showUserError={showUserError}
          showPassError={showPassError}
          errorMessage={this.state.errorMessage}
        />
      </div>
    )
    if (this.state.isLoggedIn) {
      displayAuth = <p onClick={this.logOut}>Logga ut</p>;
    }
    return (
      <div>
         {displayAuth}
      </div>
    )
  }
}

export default LobbyLoginComponent;

