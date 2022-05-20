import React, { useEffect, useState } from 'react';

import './loader.css';

const Loader = () => {
  const [message, setMessage] = useState('Loading');
  const updateMessage = () => {
    if (message === 'Loading') {
      setMessage('.Loading.')
    } else if (message === '.Loading.') {
      setMessage('..Loading..')
    } else if (message === '..Loading..') {
      setMessage('...Loading...')
    } else {
      setMessage('Loading')
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      updateMessage()
    }, 500);
    return () => clearTimeout(timer);
  }, [message])

  return (
    <div className='loader'>
      <h2>{message}</h2>
    </div>
  )
}

export default Loader;