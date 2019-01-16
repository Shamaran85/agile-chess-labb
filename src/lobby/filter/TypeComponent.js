import React, { Component } from 'react';
import './TypeComponent.css';


class TypeComponent extends Component {

  onChange(value) {
    this.props.typeCallback(value);

    this.setState({value})
  }


  render() {
    return (
      <div className="typeComponent">
        <h3>Typ</h3>
        <div className="type-checkboxes-div">
          <div className="type-row">
            <span className="checkbox-span"><input className="checkbox-input" type="checkbox" id="notRanked" name="notRanked"/>
            <label className="checkbox-label" htmlFor="notRanked">Ej rankat</label></span>

            <span className="checkbox-span"><input className="checkbox-input" type="checkbox" id="ranked" name="ranked"/>
            <label className="checkbox-label" htmlFor="ranked">Rankat</label></span>

          </div>

        </div>

      </div>
    );
  }
}

export default TypeComponent;