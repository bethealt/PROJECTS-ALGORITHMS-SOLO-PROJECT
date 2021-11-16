import React, {useState} from 'react';
import axios from 'axios';
import {Container, Form, FormGroup, Input, Label, Button, Alert} from 'reactstrap';
import {navigate} from '@reach/router';
import io from 'socket.io-client';

const LoginForm = (props) => {
    const {dbHost, errors, setErrors} = props;
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [socket] = useState(() => io(':8000'));

    const [userLogin, setUserLogin] = useState({
        emailAddress: '',
        password:'',
        //uses a single state object to hold login data
    })

    const onChangeHandler = (e) => {
        setUserLogin({...userLogin, [e.target.name]: e.target.value})
        //uses a single function to update the state object
        //input name serves as the key into the object
    }
        
    const login = (e) => {
        e.preventDefault();
        axios.post(`http://${dbHost}/api/users/login`, userLogin,
        {withCredentials: true})
            .then((res) => {
                console.log('Logging in a user:')
                console.log(res.data);
                socket.emit("loggedin_user", res.data);
                socket.disconnect();
                setUserLoggedIn(!userLoggedIn);
                setUserLogin({
                    emailAddress: '',
                    password:''
                })
                navigate('/dashboard');
            })
            .catch((err) => {
                if(err.response.data.status === (401)) {
                    navigate('/');
                }
                console.log(err.response.data.errors);
                if (err.response.data.errors) {
                    setErrors(err.response.data.errors);
                }
            })   
    }
    return(
        <Container>
            <Form onSubmit={login}>
                {errors.map((err, index) => {
                    return(
                        <Alert key={index} color='danger'>{err}</Alert>
                    )})}<br/>
                <FormGroup>
                    <Label for='emailAddress' className='Form'>Email Address</Label>
                    <Input
                        type='email'
                        id='emailAddress'
                        name='emailAddress'
                        placeholder='Enter an email address'
                        value={userLogin.emailAddress}
                        onChange = {onChangeHandler}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='password' className='Form'>Password</Label>
                    <Input
                        type='password'
                        id='password'
                        name='password'
                        placeholder='Enter a password'
                        value={userLogin.password}
                        onChange= {onChangeHandler}
                        />
                </FormGroup>
                <Button type='submit' color='danger'>Submit</Button>&nbsp;&nbsp;
            </Form>
        </Container>
    )
}

export default LoginForm;