import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch/*, useSelector*/ } from 'react-redux';

import ProtectedRoute from './components/auth/ProtectedRoute';
import MainSplash from './components/Main/Main';
import NavBar from './components/NavBar';
import ItemPage from './components/itemPage/ItemPage';
import CreateItemForm from './components/createItemForm/createItemForm'
import EditItemForm from './components/editItemForm/editItemForm';
import CartPage from './components/cartPage/cart';

import { authenticate } from './store/session';
// import { getAllItems } from './store/item';
// import { getCartItems } from './store/cart';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  // const user = useSelector(state => state.session.user);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
    // Get Fetch Working Here
    // (async () => {
    //   await dispatch(getAllItems())
    //   if (user) await dispatch(getCartItems(user?.id))
    // })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/home' exact={true}>
          <MainSplash />
        </Route>
        <Route path='/items/new' exact={true}>
          <CreateItemForm />
        </Route>
        <Route path='/items/:id' exact={true}>
          <ItemPage />
        </Route>
        <Route path='/items/:id/edit' exact={true}>
          <EditItemForm />
        </Route>
        <Route path='/cart' exact={true}>
          <CartPage />
        </Route>
        <ProtectedRoute path='/' exact={true} >
          <MainSplash />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
