import React from 'react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import './CreateGameForm.css';
import bK from '../../assets/bK.svg'
import wbK from '../../assets/wbK.svg'
import wK from '../../assets/wK.svg'


const createGameForm = (props) => {
  const showHideClassName = props.show ? "modal display-block" : "modal display-none";
  let ratingRange = props.rankOn ? (
    <div className="rangeContainer">
          <div className="rangelabelContainer">
            <label htmlFor="">Ratingomfång: <strong>{props.lowerLimitRating} - {props.upperLimitRating}</strong></label>
          </div>
          <Range
            allowCross={false}
            min={40} 
            defaultValue={[props.lowerLimitRating / 25, props.upperLimitRating / 25]}  
            onChange={props.rangeRating}
          />
        </div>
  ) : null
  return (
    <div className={showHideClassName}>

      <div className='main'>
        <h2>Skapa ett parti</h2>
        <span onClick={props.handleClose} className="cross">X</span>
        <form>
          <div className="variant">
            <label>Variant</label>
            <select name="" id="selectVariant">
              <option value="standard">Standard</option>
              <option disabled value="crazyHouse">Crazyhouse</option>
            </select>
          </div>
          <div className="timeControl">
            <label htmlFor="">Tidskontroll</label>
            <select name="" id="selectTimeControl">
              <option value="realtid">Realtid</option>
              <option disabled value="correspondens">Korrespond.</option>
            </select>
          </div>
          <div className="sliderContainer">
            <div className="labelContainer">
              <label htmlFor="">Minuter per spelare: <strong>{props.minutes}</strong></label>
            </div>
            <Slider
              defaultValue={3}
              max={9}
              min={1}
              trackStyle={{ backgroundColor: '#d85000', height: 10 }}
              handleStyle={{
                borderColor: 'rgb(224, 224, 224)',
                borderRadius: '1px',
                height: 28,
                width: 28,
                marginLeft: -14,
                marginTop: -9,
                backgroundColor: '#eee',
              }}
              railStyle={{ backgroundColor: '#fff', height: 12 }}
              onChange={props.sliderChange}
              
            />
          </div>
          <div className="switchRankContainer">
            <div className={!props.rankOn ? "switchRank special" : "switchRank" } onClick={() => {props.handleClick(0)}}>Ej rankat</div>
            <div className={props.rankOn ? "switchRank special" : "switchRank" } onClick={() => {props.handleClick(1)}}>Rankat</div>
          </div>
          {ratingRange}
          <div className="submitChoice">
            <button onClick={(event) => {props.submitGame(event, 'bK')}}><img src={bK} alt=""/></button>
            <button onClick={(event) => {props.submitGame(event, 'wbK')}}><img className="middle" src={wbK} alt=""/></button>
            <button onClick={(event) => {props.submitGame(event, 'wK')}}><img src={wK} alt=""/></button>
          </div>
        </form>
      </div>
      
    </div>
  )
}

export default createGameForm;