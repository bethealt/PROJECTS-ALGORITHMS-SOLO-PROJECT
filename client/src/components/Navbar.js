import React from 'react';
import {Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavLink, NavItem} from 'reactstrap';

const NavBar = (props) => {
    return (
        <Container>
            <Navbar color='faded' light>
                <NavbarBrand className='me-auto' href='/'>
                heartBEAT
                </NavbarBrand>
                <NavbarToggler className='me-2' onClick={function noRefCheck(){}}/>
                <Collapse navbar>
                <Nav navbar>
                    <NavItem>
                    <NavLink href='/components/'>
                        Components
                    </NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink href='https://github.com/reactstrap/reactstrap'>
                        GitHub
                    </NavLink>
                    </NavItem>
                </Nav>
                </Collapse>
            </Navbar>
        </Container>
    )
}

export default NavBar;
