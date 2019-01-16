import React, { Component } from 'react';
import './VariousComponent.css';


class VariousComponent extends Component {
  render() {
    return (
      <div className="variousComponent">
        <h3>Variant</h3>
        <div className="various-checkboxes-div">

        <div className="various-row1">

        <span className="checkbox-span"><input className="checkbox-input" type="checkbox" id="standard" name="standard"/>
        <label className="checkbox-label" htmlFor="standard">Standard</label></span>

          <span className="checkbox-span"><input className="checkbox-input" type="checkbox" id="crazyhouse" name="crazyhouse"/>
        <label className="checkbox-label" htmlFor="crazyhouse">Crazyhouse</label></span>

          <span className="checkbox-span"><input className="checkbox-input" type="checkbox" id="chess960" name="chess960"/>
        <label className="checkbox-label" htmlFor="chess960">Chess960</label></span>

        </div>
        <div className="various-row2">

        <span className="checkbox-span"><input className="checkbox-input" type="checkbox" id="king" name="king"/>
        <label className="checkbox-label" htmlFor="king">King of the Hill</label></span>

          <span className="checkbox-span"><input className="checkbox-input" type="checkbox" id="threeCheck" name="threeCheck"/>
        <label className="checkbox-label" htmlFor="threeCheck">Three-check</label></span>

          <span className="checkbox-span"><input className="checkbox-input" type="checkbox" id="antichess" name="antichess"/>
        <label className="checkbox-label" htmlFor="antichess">Antichess</label></span>
        </div>

        <div className="various-row3">

        <span className="checkbox-span"><input className="checkbox-input" type="checkbox" id="atomic" name="atomic"/>
        <label className="checkbox-label" htmlFor="atomic">Atomic</label></span>

        <span className="checkbox-span"><input className="checkbox-input" type="checkbox" id="horde" name="horde"/>
        <label className="checkbox-label" htmlFor="horde">Horde</label></span>

        <span className="checkbox-span"><input className="checkbox-input" type="checkbox" id="racingKings" name="racingKings"/>
        <label className="checkbox-label" htmlFor="racingKings">Racing Kings</label></span>
          </div>
        </div>

      </div>
    );
  }
}

export default VariousComponent;