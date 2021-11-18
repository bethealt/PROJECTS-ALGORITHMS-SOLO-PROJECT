import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'reactstrap';
import React, {useState} from 'react';
import {Router} from "@reach/router";

import NavBar from './components/NavBar';
import Login from './views/Login';
import Admin from './views/Admin';
import Dashboard from './views/Dashboard';
import CourseView from './views/CourseView';
import UserView from './views/UserView';

function App() {
  const [admin, setAdmin] = useState(false);
  const [catalog, setCatalog] = useState([]);
  const [errors, setErrors] = useState([]);
  const [users, setUsers] = useState([]);

  const[user, setUser] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    birthDate: '',
    zipCode: '',
    password: '',
    confirmPassword: '',
    //uses a single state object to hold all data
})

  return (
    <Container className='App'>
      <NavBar/>
      <Router>
        <Login
          path='/' admin={admin}
          /*user={user}
          setUser={setUser}*/
          errors={errors}
          setErrors={setErrors}
          />
        <Admin 
          path='/admin'
          admin={admin} 
          setAdmin={setAdmin}
          catalog={catalog} 
          setCatalog={setCatalog}
          errors={errors}
          setErrors={setErrors}
          users={users}
          setUsers={setUsers}
          />
        <Dashboard 
          path='/dashboard'
          user={user}
          setUser={setUser}
          errors={errors}
          setErrors={setErrors}
          />
        <CourseView 
          path='/courses/:id'
          errors={errors}
          setErrors={setErrors}
          />
        <UserView
          path='/users/:id'
          errors={errors}
          setErrors={setErrors}
          users={users}
          setUsers={setUsers}
          />
      </Router>
    </Container>
  );

}

export default App;
