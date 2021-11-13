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
  const dbHost = process.env.DB_HOST;
  const dbPort = process.env.DB_PORT;
  const [admin, setAdmin] = useState(false);
  const [catalog, setCatalog] = useState([]);
  const [errors, setErrors] = useState([]);
  const [users, setUsers] = useState([]);

  return (
    <Container className='App'>
      <NavBar/>
      <Router>
        <Login
          path='/' admin={admin}
          dbHost={dbHost}
          dbPort={dbPort}
          errors={errors}
          setErrors={setErrors}
          />
        <Admin 
          path='/admin'
          admin={admin} 
          dbHost={dbHost}
          dbPort={dbPort}
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
          dbHost={dbHost}
          dbPort={dbPort} 
          catalog={catalog} 
          errors={errors}
          setErrors={setErrors}
          />
        <CourseView 
          path='/courses/:id'
          dbHost={dbHost}
          dbPort={dbPort}
          errors={errors}
          setErrors={setErrors}
          />
        <UserView
          path='/users/:id'
          dbHost={dbHost}
          dbPort={dbPort}
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
