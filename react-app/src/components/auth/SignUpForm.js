import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';

import './authForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [profile_pic, setProfilePic] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  
  const onSignUp = async (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setErrors(['Passwords Must Match'])
    } else {
      const data = await dispatch(signUp(firstName, lastName, email, password, profile_pic));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const updateLastName = (e) => {
    setLastName(e.target.value);
  }
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };
  const updatePassword = (e) => {
    setPassword(e.target.value);
  };
  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };
  const updateProfilePic = (e) => {
    setProfilePic(e.target.value);
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp}>
      <h2>Sign-Up</h2>
      <div className='errors'>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <input
          type='text'
          name='firstname'
          onChange={updateFirstName}
          value={firstName}
          placeholder='First Name'
        ></input>
      </div>
      <div>
        <input
          type='text'
          name='lastname'
          onChange={updateLastName}
          value={lastName}
          placeholder='Last Name'
        ></input>
      </div>
      <div>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          placeholder='eMail'
        ></input>
      </div>
      <div>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          required={true}
          placeholder='Password'
        ></input>
      </div>
      <div>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          placeholder='Repeat Password'
        ></input>
      </div>
      <div>
        <input
          type='text'
          name='profile_pic'
          onChange={updateProfilePic}
          value={profile_pic}
          placeholder='Profile Picture (Optional)'
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
      <div className='switch-auth'>
        Already have an account? <NavLink to='/login'>Login</NavLink>
      </div>
    </form>
  );
};

export default SignUpForm;
