import React, { useState } from 'react';
import { render } from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, NavLink, Collapse } from 'reactstrap';
import { faHeartPulse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const NavBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);

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
                            <NavLink href='/dashboard'>
                                Dashboard
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='/catalog'>
                                Course Catalog
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='/logout'>
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
