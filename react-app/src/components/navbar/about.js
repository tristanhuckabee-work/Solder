import React from 'react';
import './NavBar.css'

const About = () => {
  const li = 'https://www.linkedin.com/in/tristan-huckabee-60402122a/';
  const gh = 'https://github.com/tristanhuckabee-work';

  return (
    <div className='about'>
      <a href={li} target='_blank' rel="noreferrer">
        <i className='fab fa-linkedin fa-2x' />
      </a>
      <a href={gh} target='_blank' rel="noreferrer">
        <i className='fab fa-github-square fa-2x' />
      </a>
    </div>
  )
}

export default About;