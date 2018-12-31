import React from 'react';

const createGameForm = () => {
  return (
    <div>
      <form>
        <div>
          <label>Variant</label>
          <select name="" id="">
            <option value="standard">Standard</option>
          </select>
        </div>
        <div>
          <label htmlFor="">Tidskontroll</label>
          <select name="" id="">
            <option value="realtid">Realtid</option>
          </select>
        </div>
        <div>
          <div>
            <label htmlFor="">Minuter per spelare: 1</label>
          </div>
          <input type="range" min="1" max="9" />
        </div>
      </form>
    </div>
  )
}

export default createGameForm;