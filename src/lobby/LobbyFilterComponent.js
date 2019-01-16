import React, { Component } from 'react';
import './LobbyFilterComponent.css';
import VariousComponent from './filter/VariousComponent.js'
import TimeControlComponent from "./filter/TimeControlComponent";
import TypeComponent from "./filter/TypeComponent";
import RatingComponent from "./filter/RatingComponent";
import ApprovalComponent from "./filter/ApprovalComponent";

class LobbyFilterComponent extends Component {
  onChange(value) {
    this.props.filterCallback(value);
    this.props.variousCallback(value);
    this.props.typeCallback(value);
    this.props.timeControlCallback(value);

    this.props.onSubmit(value);

    this.setState({value})
  }

  variousCallback(log){
    console.log(log)
  }

  timeControlCallback(log){
    console.log(log)
  }

  typeCallback(log){
    console.log(log)
  }

  ratingCallback(log){
    console.log(log)
  }

  render() {
    return (
      <div className="filter-div">
        <VariousComponent variousCallback={this.variousCallback.bind(this)}/>
        <TimeControlComponent timeControlCallback={this.timeControlCallback.bind(this)}/>
        <TypeComponent typeCallback={this.typeCallback.bind(this)}/>
        <RatingComponent ratingCallback={this.ratingCallback.bind(this)}/>   {/*someCallback as a function*/}
        <ApprovalComponent onChange={this.onChange.bind(this) } />
      </div>
    );
  }
}

export default LobbyFilterComponent;
