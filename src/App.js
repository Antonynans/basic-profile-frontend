import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Register from './component/Register';


function App() {
  return (
   <Router>
     <Route path='/' exact component={Register}/>
   </Router>
  );
}

export default App;
