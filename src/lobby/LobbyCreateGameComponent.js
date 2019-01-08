import React, { Component } from 'react';

import CreateGameForm from './components/CreateGameForm';
import LobbyStore from '../store/LobbyStore';
import { userArgs, eventArgs, socketAPI } from '../config';

class LobbyCreateGameComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      localUserInfo: {},
      gameType: 'standard',
      isSeeking: true,
      timeControl: 'realtid',
      rankOn: false,
      time: 180,
      ratingLimits: {
        low: 1600,
        high: 2000
      },
      playerColor: ''
    };
  }
  componentDidMount() {
    this.mounted = true;

    // Stream data from RxJS service
    LobbyStore.getLocalUserInfo().subscribe(data => {
      this.handleSetState({ localUserInfo: data });
    });
  }
  componentWillUnmount() {
    this.mounted = false;
    LobbyStore.unsubscribe();
  }

  handleSetState = payload => {
    if (this.mounted) {
      this.setState(payload);
    } else {
      console.error('The component is not mounted');
      return null;
    }
  };

  handleClick = e => {
    e.preventDefault();

    /**
     * Send data to RxJS service for "one action - two reasons":
     * - Store userInfo into localStorage
     * - Stream userInfo to other components
     * Payload structure: {
     *      JSON object
     * }
     */
    LobbyStore.storeUserInfoToLocalStorage({
      _id: 'a88dhhkk35kkdj10cnnbw663bb',
      name: 'Erik Andersson'
    });
  };

  showModal = () => {
    this.setState({ show: true });
    /*  this.setState({ ...this.state, show: !this.state.show }); */
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  toggleRank = i => {
    if ((i === 0 && this.state.rankOn) || (i === 1 && !this.state.rankOn)) {
      this.setState({ ...this.state, rankOn: !this.state.rankOn });
    }
  };
  handleTimeSlider = value => {
    
    this.setState({ ...this.state, time: value * 60 });
  };
  handleRatingRange = value => {
    this.setState({
      ...this.state,
      ratingLimits: { low: value[0] * 25, high: value[1] * 25 }
    });
  };

  createUserAndNewGame = payload => {
    const newUser = {
      name: payload.name
    };

    const fetchUrl = userArgs.fetchUrl;
    fetch(fetchUrl, {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + socketAPI.accessToken
      }),
      body: JSON.stringify(newUser)
    })
      .then(response => response.json())
      .then(result => {
        this.createGame(result.insertedId)
      })
      .catch(error => console.log(error));
  };

  createGame = id => {
    const newGame = {
      creatorId: id,
      gameType: this.state.gameType,
      timeControl: this.state.timeControl,
      rankOn: this.state.rankOn,
      time: this.state.time,
      ratingLimits: this.state.ratingLimits,
      playerColor: this.state.playerColor
    };

    const fetchUrl = eventArgs.fetchUrl;
    fetch(fetchUrl, {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + socketAPI.accessToken
      }),
      body: JSON.stringify(newGame)
    })
      .then(response => response.json())
      .then(result => {
        
        LobbyStore.storeUserInfoToLocalStorage({
          _id: result.insertedId
        });
      })
      .catch(error => console.log(error));
  };
  handleSubmit = (event, i) => {
    // Check
    event.preventDefault();
    let playerColor = i;
    i === 'wb'
      ? Math.floor(Math.random() * 2) < 1
        ? (playerColor = 'b')
        : (playerColor = 'w')
      : (playerColor = i);
    
    this.setState({
      ...this.state,
      playerColor: playerColor,
      show: !this.state.show
    }, () => {

      if (Object.keys(this.state.localUserInfo).length > 0) {
        
        this.createGame(this.state.localUserInfo._id);
      } else {
        const newUser = {
          name: 'Anonym'
        };
  
        this.createUserAndNewGame(newUser)
      }
    });

    
  };
  render() {
    return (
      <div>
        <p onClick={this.showModal}>Create Game</p>
        <CreateGameForm
          show={this.state.show}
          handleClose={this.hideModal}
          handleRank={i => {
            this.toggleRank(i);
          }}
          submitGame={(event, i) => {
            this.handleSubmit(event, i);
          }}
          rankOn={this.state.rankOn}
          sliderChange={this.handleTimeSlider}
          time={this.state.time}
          rangeRating={this.handleRatingRange}
          lowerLimitRating={this.state.ratingLimits.low}
          upperLimitRating={this.state.ratingLimits.high}
        />
      </div>
    );
  }
}

export default LobbyCreateGameComponent;
