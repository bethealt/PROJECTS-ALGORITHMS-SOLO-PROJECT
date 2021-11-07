import {React, useState} from 'react';
import {Nav, NavItem, NavLink, TabContent, TabPane, Row, Col} from 'reactstrap';
import classnames from 'classnames';
import LoginForm from '../components/LoginForm';
import UserForm from '../components/UserForm';

const Login = (props) => {
    const {errors}=props;
    const [activeTab, setActiveTab] = useState('1');

    const toggle = (tab) => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    const createUser = (props) => {

    }

    const loginUser = (props) => {

    }

    return(
        <div>
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
                            md={{ offset: 3, size: 6}}
                            sm="12"><br/>
                            <h4>Welcome Back!</h4><br/>
                            <LoginForm onSubmitHandler={loginUser} errors={errors} />
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId='2'>
                    <Row>
                        <Col 
                            md={{ offset: 3, size: 6}}
                            sm="12"><br/>
                            <h4>Welcome to heartBEAT!</h4><br/>
                            <UserForm onSubmitHandler={createUser} errors={errors} />
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </div>
    )
}

export default Login;
