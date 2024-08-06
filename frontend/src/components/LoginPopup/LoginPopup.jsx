import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { validatePassword } from '../../utils/passwordValidation';

const LoginPopup = ({ setShowLogin }) => {
  let { url, setToken } = useContext(StoreContext);

  let [currentState, setCurrentState] = useState("Login");
  let [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });
  let [error, setError] = useState([]);

  let onChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  let onPasswordFocus = () => {
    if (currentState === "Sign Up") {
      setError(validatePassword(data.password));
    }
  };

  let onPasswordInput = (event) => {
    let value = event.target.value;
    setData(data => ({ ...data, password: value }));
    if (currentState === "Sign Up") {
      setError(validatePassword(value));
    }
  };

  let onLogin = async (event) => {
    event.preventDefault();
    if (currentState === "Sign Up") {
      let passwordValidations = validatePassword(data.password);
      let isValid = passwordValidations.every(validation => validation.isValid);
      setError(passwordValidations);
      if (!isValid) {
        return;
      }
    }

    let newUrl = url;
    if (currentState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    let response = await axios.post(newUrl, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required />}
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email' required />
          <input name='password' onFocus={onPasswordFocus} onInput={onPasswordInput} value={data.password} type="password" placeholder='Password' required />
        </div>
        {currentState === "Sign Up" && error.length > 0 && (
          <ul className="error-list">
            {error.map((validation, index) => (
              <li key={index} style={{ color: validation.isValid ? 'green' : 'red' }}>
                {validation.message}
              </li>
            ))}
          </ul>
        )}
        <button type='submit'>{currentState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
        {currentState === "Login"
          ? <p>Create a new account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p>
          : <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  );
};

export default LoginPopup;