import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Container, Nav, NavItem, NavLink, TabContent, TabPane, Row, Col} from 'reactstrap';
import classnames from 'classnames';
import io from'socket.io-client';

//components
import LoginForm from '../components/LoginForm';
import UserForm from '../components/UserForm'; 

const Login = (props) => {
    const {user, setUser, users, setUsers} = props;
    const [activeTab, setActiveTab] = useState('1');
    const [loggedIn, setLoggedIn] = useState([]);
    const [userRegConfirm, setUserRegConfirm] = useState('');
    const [userRegFail, setUserRegFail] = useState('');
    const [errors, setErrors] = useState({});
    const [socket] = useState(() => io(':8000'));
    //passes a callback function to initialize the socket
    //setSocket is omitted as the socket state will not be updated

    const toggle = (tab) => {
        if(activeTab !== tab) setActiveTab(tab);
        setErrors({});
    }

    useEffect(() => {
        console.log(`Inside {LGN} useEffect for socket.io-client`);

    socket.on('connect', () => {
        console.log(`Connected to the server via socket: ${socket.id}`);
        //confirms connection to and comuunication with the server
    })
    socket.on('user_registered', (regUserObj) => {
        console.log('in registered user:');
        console.log(regUserObj);
        console.log(users);
        setUsers((currentUsers) => [...users, regUserObj]);
        //passes the current value of the users array as a parameter for the function
        //returns brand new array for the setter to use
        //by default, the array is empty due to when it was created and saved into state
    })
    socket.on('user_login', (logUserObj) => {
        console.log('in login_user:');
        console.log(logUserObj);
        console.log(loggedIn);
        setLoggedIn((currentLoggedIn) => [...loggedIn, logUserObj]);
    })

    return () => socket.disconnect();
    //best practice: socket client disconnects when the component is closed
    //return from useEffect will only run when the component is closed
    //include the dependency array to enusure that the useEffect continues to run

}, []);

    const register = (e, user, setUser) => {
        e.preventDefault();
        console.log(user)
        axios.post(`http://localhost:8000/api/users/register`, user,
            {withCredentials: true})
            //ensures that cookies are sent with each request; 
            //Middleware verifies who is logged in
            .then((res) => {
                console.log('Registering user:')
                console.log(res.data);
                socket.emit("registered_user", res.data);
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
                setUserRegConfirm("Registration successful: please login.")
                setErrors({});
                //user state exists as an object with correct keys and values
                //forces the send of credentials/cookies with request for update
                //XMLHttpRequest from another domain cannot set cookie values for their own domain unless {withCredentials: true} before making request
                //reset state for UserRegister as user does not navigate away
                //reset errors state if registration is successful
            })
            .catch((err) => {
                console.log('in user register:')
                console.log(err);
                console.log(err.response.data);
                setErrors(err.response.data.errors);
                setUserRegFail("Registration failed: please review the form and resubmit.")
            });
    };


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
                                onSubmitHandler={register}
                                user={user}
                                setUser={setUser}
                                alertConfirm={userRegConfirm}
                                alertFail={userRegFail}
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
