import React, { Component } from 'react';
import AuthForm from './components/AuthForm'
class LobbyLoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      isRegistered: true,
      isValid: false,
      userName: {
        value: '',
        valid: false,
        touched: false,
        showError: false
      },
      password: {
        value: '',
        valid: false,
        touched: false,
        showError: false
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
    this.setState({ isRegistered: !this.state.isRegistered })
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
    this.setState({ ...this.state, show: false})
  }
  handleNameInput = event => {
    console.log(event.target.value)
    this.setState({
      ...this.state,
      userName: {
        value: event.target.value,
        valid: this.checkValidity(event.target.value, {required: true, minLength: 3, maxLength: 15}),
        touched: true,
        showError: true
      }
    })
  }
  handlePassInput = event => {
    console.log(event.target.value)
    this.setState({
      ...this.state,
      password: {
        value: event.target.value,
        valid: this.checkValidity(event.target.value, {required: true, minLength: 6, maxLength: 20}),
        touched: true,
        showError: true
      }
    })
    
  }
  handleSubmit = event => {
    event.preventDefault();
    
    if (this.state.userName.valid && this.state.password.valid) {
      this.hideAuth();
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
    return (
      <div>
        <p onClick={this.showAuth}>Login</p>
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
        />
        
      </div>
    )
  }
}

export default LobbyLoginComponent;