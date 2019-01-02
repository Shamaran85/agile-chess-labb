import React, { Component } from 'react';
import './ApprovalComponent.css';


class RatingComponent extends Component {
  render() {
    return (
      <div className="ApprovalComponent">
        <button className="ApprovalButton">Återställ</button>
        <button className="ApprovalButton">Använd</button>

      </div>
    );
  }
}

export default RatingComponent;