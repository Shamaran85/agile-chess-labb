import React, { Component } from 'react';
import './ApprovalComponent.css';

class RatingComponent extends Component {
  onSubmit() {
    const value = 0; // TODO get info
    this.props.onSubmit(value)
  }
  render() {
    return (
      <div className="ApprovalComponent">

        {/*<input type="text" />
        <input type="submit" onClick={this.onSubmit.bind(this)}/>*/}

        <button className="ApprovalButton">Återställ</button>
        <button className="ApprovalButton" onClick={this.onSubmit.bind(this)}>Använd</button>

      </div>
    );
  }
}

export default RatingComponent;