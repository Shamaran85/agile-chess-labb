import React from 'react'
import './AuthForm.css'

const authForm = (props) => {
  const AFshowHideClassName = props.show ? "AF-modal AF-display-block" : "AF-modal AF-display-none";
  const AFuserErrorSpan = props.showUserError ? 'AF-displayError' : '';
  const AFpassErrorSpan = props.showPassError ? 'AF-displayError' : '';  
  return (
    <div className={AFshowHideClassName}>
      <div className='AF-main'>  
        <h3>
          {props.login ? 'Logga in' : 'Registrera dig'}
        </h3>
        <span onClick={props.handleClose} className="AF-cross">X</span>
        <div className='AF-formContainer'>
          <form>
            <div className='AF-inputGroup'>
              <label htmlFor="">Användarnamn</label>
              <input type="text" onChange={props.handleName} value={props.userName} />
              <span className={`AF-errorSpan ${AFuserErrorSpan}`}>Minst 3 tecken!</span>
            </div>
            <div className='AF-inputGroup'>
              <label htmlFor="">Lösenord</label>
              <input type="password" onChange={props.handlePass} value={props.password} />
              <span className={`AF-errorSpan ${AFpassErrorSpan}`}>Minst 6 tecken!</span>
            </div>
            <div className='AF-inputGroup'>
              <button onClick={props.submitForm}>{props.login ? 'Logga in' : 'Registrera dig'}</button>
            </div>
            <span className='AF-span' onClick={props.switchAuth}>{props.login ? 'ny användare?' : 'har du redan ett konto?'}</span>
          </form>
        </div>
      </div>
    </div>
  )
}

export default authForm;