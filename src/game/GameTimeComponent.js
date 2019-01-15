import React, { Component } from 'react';

 class GameTimeComponent extends Component {
  render() {    

    if (!this.props.time) {
      return null;
    }

    const white = this.props.time.whiteTime === undefined ? `White:` : `White: ${this.props.time.whiteTime}s`;
    const black = this.props.time.blackTime === undefined ? `Black:` : `Black: ${this.props.time.blackTime}s`;

    return (
      <div className="game__timer">
      <div className="game__timer__title">
              <p>Timers</p>
            </div>
      <div className="game__timer__white">
      {white}
      </div>
      <div className="game__timer__black">
      {black}
      </div>
      </div>
    );
  }
}

 export default GameTimeComponent;