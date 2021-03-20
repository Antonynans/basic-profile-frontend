import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './component/Login';
import Register from './component/Register';


function App() {
  return (
   <Router>
     <Route path='/register' exact component={Register}/>
     <Route path='/login' exact component={Login}/>
   </Router>
  );
}

export default App;
