import React, {useState} from 'react';
import {Container, Nav, NavItem, NavLink, TabContent, TabPane, Row, Col} from 'reactstrap';
import classnames from 'classnames';

import LoginForm from '../components/LoginForm';
import UserForm from '../components/UserForm';

const Login = (props) => {
    const {dbHost, errors, setErrors} = props;
    const [userRegistered, setUserRegistered] = useState(false);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [activeTab, setActiveTab] = useState('1');

    const toggle = (tab) => {
        if(activeTab !== tab) setActiveTab(tab);
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
                                dbHost={dbHost}
                                userLoggedIn={userLoggedIn}
                                setUserLoggedIn={setUserLoggedIn}
                                errors={errors} 
                                setErrors={setErrors}
                            />
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId='2'>
                    <Row>
                        <Col 
                            md={{ offset: 1, size: 10}}
                            sm="12"><br/>
                            <h4>Welcome to heartBEAT!</h4><br/>
                            <UserForm
                                dbHost={dbHost}
                                userRegistered={userRegistered}
                                setUserRegistered={setUserRegistered}
                                errors={errors}
                                setErrors={setErrors} 
                            />
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </Container>
    )
}

export default Login;
