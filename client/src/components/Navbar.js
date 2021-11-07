import React from 'react';
import {Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavLink, NavItem} from 'reactstrap';

const NavBar = (props) => {
    //const {admin} = props;
    return (
        <Container>
            <Navbar color='faded' light>
                <NavbarBrand className='me-auto' href='/'>
                heartBEAT</NavbarBrand>
                <NavbarToggler className='me-2' onClick={function noRefCheck(){}}/>
                <Nav pills>
                    <NavItem>
                        <NavLink
                            active href="/admin">
                            Admin
                        </NavLink>
                    </NavItem>
                </Nav>
                <Collapse navbar>
                   {/*} {
                        (admin === true) ?
                        <Nav navbar>
                            <NavItem>
                                <NavLink href='/admin'>
                                    Admin login
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href='/add'>
                                    Add a Course
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
                        </Nav> 
                        :*/}
                        <Nav navbar>
                            <NavItem>
                                <NavLink href='/login'>
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
                        </Nav> 
                    {/*}}      */}                     
                </Collapse>
            </Navbar>
        </Container>
    )
}

export default NavBar;
