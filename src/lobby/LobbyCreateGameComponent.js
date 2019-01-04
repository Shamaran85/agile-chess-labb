import React, { Component } from 'react';
import CreateGameForm from './components/CreateGameForm';


class LobbyCreateGameComponent extends Component {
  state = {
    show: false,
    rankOn: false,
    minutes: 3,
    ratingLimits: {
      low: 1600,
      high: 2000
    },
    playerColor: ''
  }
  showModal = () => {
    this.setState({ show: true });
   /*  this.setState({ ...this.state, show: !this.state.show }); */
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  toggleSwitch = (i) => {
    //console.log(i)
    if ((i === 0 && this.state.rankOn) || (i === 1 && !this.state.rankOn)) {
      this.setState({ ...this.state, rankOn: !this.state.rankOn})
    }
  }
  handleSlider = value => {
    //console.log(value)
    this.setState({...this.state, minutes: value})
  }
  handleRatingRange = value => {
    //console.log(value)
    this.setState({ ...this.state, ratingLimits: {low: value[0] * 25, high: value[1] * 25}})
  }
  handleSubmit = (event, i) => {
    event.preventDefault()
    console.log(i)
    let playerColor = i;
    i === 'wb' 
      ? Math.floor(Math.random() * 2 ) < 1 
        ? playerColor = 'b' 
        : playerColor = 'w' 
      : playerColor = i;
    console.log(playerColor);
    this.setState({ ...this.state, playerColor: playerColor, show: !this.state.show })
    console.log(this.state)
  }
  render() {
    return (
      <div>
        <p onClick={this.showModal}>Create Game</p>
        <CreateGameForm
          show={this.state.show}
          handleClose={this.hideModal} 
          handleClick={(i) => {this.toggleSwitch(i)}}
          submitGame={(event, i) => {this.handleSubmit(event, i)}}
          rankOn={this.state.rankOn} 
          sliderChange={this.handleSlider}
          minutes={this.state.minutes}
          rangeRating={this.handleRatingRange}
          lowerLimitRating={this.state.ratingLimits.low}
          upperLimitRating={this.state.ratingLimits.high}
        />
      </div>
    );
  }
}

export default LobbyCreateGameComponent;
