import React, {useState} from 'react';
import axios from 'axios';
import {Container, Nav, NavItem, NavLink, TabContent, TabPane, Row, Col} from 'reactstrap';
import classnames from 'classnames';
import {navigate} from '@reach/router';
import io from 'socket.io-client';

import CourseHistory from '../components/CourseHistory';
import CourseList from '../components/CourseList';
import UserForm from '../components/UserForm';

const Dashboard = (props) => {
    const {catalog, user, setUser, errors, setErrors} = props;
    const [activeTab, setActiveTab] = useState('1');
    const [userUpdConfirm, setUserUpdConfirm] = useState('');
    const [userUpdFail, setUserUpdFail] = useState('');
    const [socket] = useState(() => io(':8000'));
    //passes a callback function to initialize the socket
    //setSocket is omitted as the socket state will not be updated
    
    const toggle = (tab) => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    const updateUser = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/users/update/${user._id}`, 
            {withCredentials: true})
            //ensures that cookies are sent with each request; 
            //Middleware verifies who is logged in
        .then((res) => {
            console.log('Updating user:')
            console.log(res.data);
            socket.emit("updated_user", res.data);
            socket.disconnect();
            setUser({
                firstName: '',
                lastName: '',
                emailAddress: '',
                birthDate: '',
                zipCode: '',
                password: '',
                confirmPassword: '',
            })
            setUserUpdConfirm("User update successful");
            setErrors({});
            navigate("/dashboard");

        })
        .catch(err => {
            console.log('in user update:')
            console.log(err);
            console.log(err.response.data);
            setErrors(err.response.data.errors);
            setUserUpdFail("Update failed: please review the form and resubmit.")
            setErrors({});
            });
    };

    return(
        <Container>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({active: activeTab === '1'})}
                        onClick={() => {toggle('1'); }}>
                        PROFILE
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({active: activeTab === '2'})}
                        onClick={() => {toggle('2'); }}>
                        HISTORY
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({active: activeTab === '3'})}
                        onClick={() => {toggle('3'); }}>
                        CATALOG
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId='1'>
                    <Row>
                        <Col 
                            md={{ offset: 1, size: 10}}
                            sm="12"><br/>
                            <h4>Manage Your Profile</h4><br/>
                            <UserForm
                                onSubmitHandler={updateUser}
                                alertConfirm={userUpdConfirm}
                                alertFail={userUpdFail}
                                errors={errors} 
                            />
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId='2'>
                    <Row>
                        <Col 
                            md={{ offset: 1, size: 10}}
                            sm="12"><br/>
                            <h4>Manage Your Courses</h4><br/>
                            <CourseHistory />
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId='3'>
                    <Row>
                        <Col 
                            md={{ offset: 1, size: 10}}
                            sm="12"><br/>
                            <h4>View Available Courses</h4><br/>
                            <CourseList catalog={catalog}/>
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </Container>
    )
}

export default Dashboard;