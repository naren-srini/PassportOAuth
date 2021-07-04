//* Client React App main file
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Homepage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';

function App() {
  return (
   <BrowserRouter>
   <Route path='/' exact component={Homepage} />
   <Route path='/login' component={LoginPage} />
   </BrowserRouter>
  );
}

export default App;
