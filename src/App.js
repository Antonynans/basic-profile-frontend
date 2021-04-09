import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './component/Login';
import Register from './component/Register';
import Dashboard from './component/Dashboard';
import Navbar from './component/navBar/index';
import Footer from './component/Footer';
import Sidebar from './component/Sidebar';
import Profile from './component/Profile';

const isLoggedIn = () => {
  return localStorage.getItem('TOKEN_KEY') != null;
};
const SecuredRoute = ({ component: Component, ...rest }) => (
    
  <Route
    {...rest}
    render={props =>
    
      isLoggedIn() === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

function App() {
  return (
   <Router>
     <Switch>]
      <div>
     {isLoggedIn() && (
              <>
                {/* <Navbar /> <Sidebar /> */}
              </>
            )}
     <Route path='/register' exact component={Register}/>
     <Route path='/login' exact component={Login}/>
     <SecuredRoute path="/dashboard" component={Dashboard} />
     <SecuredRoute path="/profile" component={Profile} />
     {isLoggedIn() && <Footer />}
     </div>
     </Switch>
   </Router>
  );
}

export default App;
