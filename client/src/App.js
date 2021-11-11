import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'reactstrap';
import React, {useState, useEffect} from 'react';
import {Router} from "@reach/router";
import {io} from 'socket.io-client';

import NavBar from './components/NavBar';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import Catalog from './views/Catalog';
import Course from './views/Course';
import Admin from './views/Admin';
import AddCourse from './views/AddCourse';

function App() {
  const [admin, setAdmin] = useState(false);
  const [errors, setErrors] = useState([]);
  const [onSubmitProp] = useState({});
  const [users, setUsers] = useState([]);

  const myFirstSecret = process.env.FIRST_SECRET_KEY;
  const [socket] = useState(() => io(':8000'));
  // notice that we pass a callback function to initialize the socket
  // we don't need to destructure the 'setSocket' function since we won't be updating the socket state
 
  useEffect(() => {
    console.log('Is this running?');
    socket.on('Welcome', data => console.log(data));
    // we need to set up all of our event listeners in the useEffect callback function
    
    return () => socket.disconnect(true);
    // note that we're returning a callback function
    // this ensures that the underlying socket will be closed if App is unmounted
    // this would be more critical if we were creating the socket in a subcomponent

  }, [socket]);
 
  return (
    <Container className='App'>
      <NavBar admin={admin}/>
      <Router>
        <Login
          onSubmitProp={onSubmitProp} 
          path='/' admin={admin}
          errors={errors}/>
        <Dashboard path='/dashboard' errors={errors}/>
        <Catalog path='/courses/catalog'/>
        <Course path='/courses/:id'/>
        <Admin path='/courses/login' errors={errors}/>
        <AddCourse path='/courses/add' errors={errors}/>
      </Router>
    </Container>
  );

}

export default App;
