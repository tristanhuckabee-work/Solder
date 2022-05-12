import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import MainSplash from './components/Main/Main';
import NavBar from './components/NavBar';
import CreateItemForm from './components/createItemForm/createItemForm'
import ItemPage from './components/itemPage/ItemPage';

import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);
  
  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/items/new' exact={true}>
          <CreateItemForm />
        </Route>
        <Route path='/items/:id' exact={true}>
          <ItemPage />
        </Route>
        <ProtectedRoute path='/' exact={true} >
          <MainSplash />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
