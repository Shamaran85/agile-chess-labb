import React, { Component } from 'react';
import './TimeControlComponent.css';


class TimeControlComponent extends Component {
  render() {
    return (
      <div className="timeControlComponent">
        <h3>Tidskontroll</h3>
        <div className="timeControl-checkboxes-div">
          <div className="time-control-row">
            <span className="checkbox-span"><input className="checkbox-input" type="checkbox" id="bullet" name="bullet"/>
            <label className="checkbox-label" htmlFor="bullet">Bullet - Mindre än 3 minuter</label></span>

            <span className="checkbox-span"><input className="checkbox-input" type="checkbox" id="blitz" name="blitz"/>
            <label className="checkbox-label" htmlFor="blitz">Blitz - Mindre än 8 minuter</label></span>

            <span className="checkbox-span"><input className="checkbox-input" type="checkbox" id="rapid" name="rapid"/>
            <label className="checkbox-label" htmlFor="rapid">Rapid - Mindre än 25 minuter</label></span>

            <span className="checkbox-span"><input className="checkbox-input" type="checkbox" id="classical" name="classical"/>
            <label className="checkbox-label" htmlFor="classical">Classical - Mindre än 360 minuter</label></span>

          </div>
        </div>
      </div>
    );
  }
}

export default TimeControlComponent;