import React, { Component } from 'react';
import './LobbyFilterComponent.css';
import VariousComponent from './filter/VariousComponent.js'
import TimeControlComponent from "./filter/TimeControlComponent";
import TypeComponent from "./filter/TypeComponent";
import RatingComponent from "./filter/RatingComponent";
import ApprovalComponent from "./filter/ApprovalComponent";

class LobbyFilterComponent extends Component {
  render() {
    return (
      <div className="filter-div">
        <VariousComponent />
        <TimeControlComponent/>
        <TypeComponent/>
        <RatingComponent/>
        <ApprovalComponent/>
      </div>
    );
  }
}

export default LobbyFilterComponent;
