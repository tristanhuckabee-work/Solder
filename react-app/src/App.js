import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { authenticate } from './store/session';
import { getAllItems } from './store/item';
import { getCartItems } from './store/cart';
import ProtectedRoute from './components/auth/ProtectedRoute';
import MainSplash from './components/Main/Main';
import NavBar from './components/navbar/NavBar';
import ItemPage from './components/itemPage/ItemPage';
import CreateItemForm from './components/createItemForm/createItemForm'
import EditItemForm from './components/editItemForm/editItemForm';
import CartPage from './components/cartPage/cart';
import Page404 from './components/Page404/page404';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate())
      setLoaded(true);
    })();
    dispatch(getAllItems());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCartItems(user?.id))
  }, [user])

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
        <Route path='/:other'>
          <Page404 />
        </Route>
        <ProtectedRoute path='/' exact={true} >
          <MainSplash />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
