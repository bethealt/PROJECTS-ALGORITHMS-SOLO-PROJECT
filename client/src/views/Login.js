import React, {useState} from 'react';
import axios from 'axios';
import {Container, Nav, NavItem, NavLink, TabContent, TabPane, Row, Col} from 'reactstrap';
import classnames from 'classnames';
import {navigate} from '@reach/router';

import LoginForm from '../components/LoginForm';
import UserForm from '../components/UserForm';

const Login = (props) => {
    const dbPort = process.env.DB_PORT
    const { 
        admin, 
        errors, setErrors, 
        users, setUsers, 
        firstName,
        lastName,
        emailAddress,
        birthDate,
        zipcode,
        password,
        confirmPassword,
        onSubmitProp 
    } = props;
    const [activeTab, setActiveTab] = useState('1');
    const [userRegistered, setUserRegistered] = useState(false);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    
    const toggle = (tab) => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    const registerUser = user => {
        axios.post(`http://localhost:${dbPort}/api/users/register`, {
            firstName,
            lastName,
            emailAddress,
            birthDate,
            zipcode,
            password,
            confirmPassword}, 
            //ensures that cookies are sent with each request; Middleware verifies who is logged in
            {withCredentials: true})
        .then(res => {
            console.log(res);
            setUsers([...users, res.data]);
            setUserRegistered(!userRegistered);
            setUserLoggedIn(!userLoggedIn);
            navigate("/dashboard");
        })
        .catch(err => {
            const errorResponse = err.response.data.errors;
            const errorArr = [];
            for (const key of Object.keys(errorResponse)) {
                errorArr.push(errorResponse[key].message)
            }
            setErrors(errorArr);
            console.log(errorArr);
        })
    }

    const loginUser = user => {
        axios.post(`http://localhost:${dbPort}/api/users/login`, {
            emailAddress, 
            password}, 
            {withCredentials: true})
        .then(res => {
            setUserLoggedIn(!userLoggedIn);
            // eslint-disable-next-line no-lone-blocks
            {
                admin === true  ?
                navigate("/admin") 
                :
                navigate("/dashboard")
            };
        })
        .catch(err => {
            const errorResponse = err.response.data.errors;
            const errorArr = [];
            for (const key of Object.keys(errorResponse)) {
                errorArr.push(errorResponse[key].message)
            }
            setErrors(errorArr);
            console.log(errorArr);
        })
    }

    return(
        <Container>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({active: activeTab === '1'})}
                        onClick={() => {toggle('1'); }}>
                        LOGIN
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({active: activeTab === '2'})}
                        onClick={() => {toggle('2'); }}>
                        REGISTER
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId='1'>
                    <Row>
                        <Col 
                            md={{ offset: 2, size: 8}}
                            sm="12"><br/>
                            <h4>Welcome Back!</h4><br/>
                            <LoginForm
                                onSubmitProp = {loginUser} 
                                errors={errors} 
                            />
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId='2'>
                    <Row>
                        <Col 
                            md={{ offset: 2, size: 8}}
                            sm="12"><br/>
                            <h4>Welcome to heartBEAT!</h4><br/>
                            <UserForm 
                                onSubmitProp={registerUser} 
                                errors={errors} 
                            />
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </Container>
    )
}

export default Login;
