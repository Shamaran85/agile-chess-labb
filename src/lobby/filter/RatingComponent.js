import React, { Component } from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import './RatingComponent.css';

class RatingComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: { min: 800, max: 2900 },
    };
  }
  render() {
    return (
      <div className="RatingComponent">
        <h3>Rating</h3>
        <InputRange
          maxValue={2900}
          minValue={800}
          value={this.state.value}
          onChange={value => this.setState({ value })} />

      </div>
    );
  }
}

export default RatingComponent;