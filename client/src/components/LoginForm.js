import React, {useState} from 'react';
import axios from 'axios';
import {Container, Form, FormGroup, Input, Label, Button, Alert} from 'reactstrap';
import {navigate} from '@reach/router';

const LoginForm = (props) => {
    const {dbHost, userLoggedIn, setUserLoggedIn, errors, setErrors} = props;
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    
    const onSubmitHandler = (e) => {
        e.preventDefault();
        const newLogin = {
            emailAddress,
            password
        };

        axios.post(`http://${dbHost}/api/users/login`, newLogin,
        {withCredentials: true})
            .then((res) => {
                console.log(res);
                setUserLoggedIn(!userLoggedIn);
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
            <Form onSubmit={onSubmitHandler}>
                {errors.map((err, index) => {
                    return(
                        <Alert key={index} color='primary'>{err}</Alert>
                    )})}<br/>
                <FormGroup>
                    <Label for='emailAddress' className='Form'>Email Address</Label>
                    <Input
                        type='email'
                        id='emailAddress'
                        name='emailAddress'
                        placeholder='Enter an email address'
                        value={emailAddress}
                        onChange = {(e) => setEmailAddress(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='password' className='Form'>Password</Label>
                    <Input
                        type='password'
                        id='password'
                        name='password'
                        placeholder='Enter a password'
                        value={password}
                        onChange= {(e) => setPassword(e.target.value)}
                        />
                </FormGroup>
                <Button type='submit' color='danger'>Submit</Button>&nbsp;&nbsp;
            </Form>
        </Container>
    )
}

export default LoginForm;