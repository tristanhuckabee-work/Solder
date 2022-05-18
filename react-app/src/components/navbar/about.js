import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './NavBar.css'

const About = () => {
  const li = 'https://www.linkedin.com/in/tristan-huckabee-60402122a/';
  const gh = 'https://github.com/tristanhuckabee-work';

  return (
    <div className='about'>
      <a href={li}>
        <i className='fab fa-linkedin fa-2x' />
        LinkedIn
      </a>
      <a href={gh}>
        <i className='fab fa-github-square fa-2x' />
        Github
      </a>
    </div>
  )
}

export default About;