import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'reactstrap';
import React, {useState} from 'react';
import {Router} from "@reach/router";

import NavBar from './components/NavBar';
import Login from './views/Login';
import Admin from './views/Admin';
import Dashboard from './views/Dashboard';
import ViewCourse from './views/ViewCourse';
import ViewUser from './views/ViewUser';

function App() {
  const [admin, setAdmin] = useState(false);
  const [catalog, setCatalog] = useState([]);
  const [errors, setErrors] = useState([]);
  const [users, setUsers] = useState([]);
  const [onSubmitProp] = useState({});

  return (
    <Container className='App'>
      <NavBar/>
      <Router>
        <Login
          onSubmitProp={onSubmitProp} 
          path='/' admin={admin}
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
          catalog={catalog} 
          errors={errors}
          setErrors={setErrors}
          />
        <ViewCourse 
          path='/courses/:id'
          errors={errors}
          setErrors={setErrors}
          />
        <ViewUser 
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
