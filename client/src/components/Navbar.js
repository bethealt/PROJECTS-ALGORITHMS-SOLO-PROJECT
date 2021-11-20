import React, { useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client'
import {navigate} from '@reach/router'

import { render } from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, NavLink, Collapse } from 'reactstrap';
import { faHeartPulse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBar = (props) => {
    const {errors, setErrors, userLogin, setUserLogin, userLoggedIn, setUserLoggedIn} = props;
    const [isOpen, setIsOpen] = useState(false);
    const [socket] = useState(() => io(':8000'));

    const logout = (e, userLogin, setUserLogin) => {
        e.prevent.Default();
        console.log(userLogin);
        axios.post(`http://localhost:8000/api/users/logout`, userLogin,
        {withCredentials: true})
            .then((res) => {
                console.log('Logging out user:');
                console.log(res.data);
                socket.emit("logout_user", res.data);
                socket.disconnect();
                setUserLoggedIn(!userLoggedIn);
                    setUserLogin({
                        emailAddress: '',
                        password:''
                        
                })
                setErrors({});
                navigate('/logout');
            })
            .catch((err) => {
                console.log('in user logout');
                console.log(err);
                console.log(err.response.data);
                setErrors(err.response.data.errors);
                navigate('/login');
            });   
    };

    return (
        <div style={{ display: 'block', width: 900, padding: 30}}>
            <Navbar color='faded' light>
                <NavbarBrand className='me-auto' href='/'>
                    <FontAwesomeIcon icon={faHeartPulse}/>
                    heartBEAT
                </NavbarBrand>
                <Nav pills>
                    <NavItem>
                        <NavLink
                            active href="/admin">
                            Admin
                        </NavLink>
                    </NavItem>
                </Nav>&nbsp;&nbsp;
                <NavbarToggler className='me-2' onClick={() => { setIsOpen(!isOpen) }}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink href='/'>
                                Login/Register
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='/admin'>
                                Admin
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='/dashboard'>
                                Dashboard
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='/logout' onClick={logout}>
                                Logout
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar> 
        </div>
    );
}

render(<NavBar />, document.getElementById("root"));

export default NavBar;
