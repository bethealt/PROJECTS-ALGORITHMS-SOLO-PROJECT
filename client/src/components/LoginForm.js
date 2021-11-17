import React, {useState} from 'react';
import axios from 'axios';
import {Container, Row, Col, Form, FormGroup, Input, Label, FormFeedback, Button, Alert} from 'reactstrap';
import {navigate} from '@reach/router';
import io from 'socket.io-client';

const LoginForm = (props) => {
    const {errors, setErrors} = props;
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [userLogConfirm, setUserLogConfirm] = useState('');
    const [userLogFail, setUserLogFail] = useState('');
    const [socket] = useState(() => io(':8000'));

    const [user, setUser] = useState({
        emailAddress: '',
        password:'',
        //uses a single state object to hold login data
    })

    const onChangeHandler = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
        //uses a single function to update the state object
        //input name serves as the key into the object
        //uses a single function to update the state object
        //input name serves as the key into the object
    }
        
    const login = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/users/login`, user,
        {withCredentials: true})
            .then((res) => {
                console.log('Logging in a user:')
                console.log(res.data);
                socket.emit("loggedin_user", res.data);
                socket.disconnect();
                setUserLoggedIn(!userLoggedIn);
                setUser({
                    emailAddress: '',
                    password:''
                    
                })
                setUserLogConfirm("Login successful.")
                setErrors({});
                navigate('/dashboard');
            })
            .catch((err) => {
                console.log('in user login')
                console.log(err);
                console.log(err.response.data);
                setErrors(err.response.data.errors);
                setUserLogFail("Login failed: please review the form and resubmit.")
            });   
    };

    return(
        <Container>
            {userLogConfirm ?
                <Alert color='success'>{userLogConfirm}</Alert>
                : null}
            {userLogFail ? 
                <Alert color='danger'>{userLogFail}</Alert>
                : null}
            <Row>
                <Col>
                <Form inline onSubmit={login}>
                    {errors.emailAddress ? 
                    <FormGroup className="position-relative">
                        <Label for='emailAddress' className='Form'>Email Address</Label>
                        <Input
                            invalid
                            type='text'
                            id='emailAddress'
                            name='emailAddress'
                            placeholder='Enter an email address'
                            value={user.emailAddress}
                            onChange={onChangeHandler}
                            />
                        <FormFeedback tooltip>{errors.emailAddress.message}</FormFeedback>
                        </FormGroup>
                        :<FormGroup className="position-relative">
                            <Label for='emailAddress' className='Form'>Email Address</Label>
                            <Input
                                type='text'
                                id='emailAddress'
                                name='emailAddress'
                                placeholder='Enter an email address'
                                value={user.emailAddress}
                                onChange={onChangeHandler}
                                />
                        </FormGroup>}
                        {errors.password ? 
                        <FormGroup className="position-relative">
                            <Label for='password' className='Form'>Password</Label>
                            <Input
                                invalid
                                type='password'
                                id='password'
                                name='password'
                                placeholder='Enter a password'
                                value={user.password}
                                onChange={onChangeHandler}
                                />
                            <FormFeedback tooltip>{errors.password.message}</FormFeedback>
                            </FormGroup>
                            :<FormGroup className="position-relative">
                                <Label for='password' className='Form'>Password</Label>
                                <Input
                                    type='password'
                                    id='password'
                                    name='password'
                                    placeholder='Enter a password'
                                    value={user.password}
                                    onChange={onChangeHandler}
                                    />
                            </FormGroup>}
                        <Button type='submit' color='danger'>Submit</Button>&nbsp;&nbsp;
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default LoginForm;