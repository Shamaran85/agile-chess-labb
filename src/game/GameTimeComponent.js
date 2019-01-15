import React, { Component } from 'react';

 class GameTimeComponent extends Component {
  render() {
    if (!this.props.time) {
      return null;
    }
    return (
      <div>
        white: {this.props.time.whiteTime}
        <br />
        black: {this.props.time.blackTime}
      </div>
    );
  }
}

 export default GameTimeComponent;