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

        <span className="checkbox-span"><input className="checkbox-input" type="checkbox" id="scales" name="scales"/>
        <label className="checkbox-label" htmlFor="scales">King of the Hill</label></span>

          <span className="checkbox-span"><input className="checkbox-input" type="checkbox" id="scales" name="scales"/>
        <label className="checkbox-label" htmlFor="scales">Three-check</label></span>

          <span className="checkbox-span"><input className="checkbox-input" type="checkbox" id="scales" name="scales"/>
        <label className="checkbox-label" htmlFor="scales">Antichess</label></span>
        </div>

        <div className="various-row3">

        <span className="checkbox-span"><input className="checkbox-input" type="checkbox" id="scales" name="scales"/>
        <label className="checkbox-label" htmlFor="scales">Atomic</label></span>

        <span className="checkbox-span"><input className="checkbox-input" type="checkbox" id="scales" name="scales"/>
        <label className="checkbox-label" htmlFor="scales">Horde</label></span>

        <span className="checkbox-span"><input className="checkbox-input" type="checkbox" id="scales" name="scales"/>
        <label className="checkbox-label" htmlFor="scales">Racing Kings</label></span>
          </div>
        </div>

      </div>
    );
  }
}

export default VariousComponent;