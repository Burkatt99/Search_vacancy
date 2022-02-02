import React, {useEffect} from 'react';
import { GlobalStyle } from './global.styles';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from './redux/users/user.selector';
import CheckoutPage from './pages/checkout/checkout.component';
import { checkUserSession } from './redux/users/user.actions';

const App = () => {
const currentUser = useSelector(selectCurrentUser)
const dispatch = useDispatch();


  useEffect(() =>{
    dispatch(checkUserSession());
  }, [dispatch]);

    return (
      <div >
        <GlobalStyle />
        <Header/>
        <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route  path='/shop' component={ShopPage}/>
        <Route  exact path='/checkout' component={CheckoutPage}/>
        <Route  exact path='/signin' render={() =>
           currentUser ? (
          <Redirect to='/' />
        ) : (
          <SignInAndSignUpPage/>
        )
        }/>
        </Switch>
      </div>
    );
  }
 

export default App;
