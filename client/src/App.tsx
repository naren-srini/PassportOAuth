//* Client React App main file
import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { myContext } from './components/Context';
import Homepage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import NavBar from './components/NavBar/NavBar';
import "./GlobalStyles.css";

function App() {

  const userObject = useContext(myContext);
  console.log(userObject);
  return (
   <BrowserRouter>

      <NavBar />
   
      <Switch>
          <Route path='/' exact component={Homepage} />
          {
            userObject ? null : (
              <Route path='/login' component={LoginPage} />
            )
          }
      </Switch>
   
   </BrowserRouter>
  );
}

export default App;
