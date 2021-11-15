import React, {useState} from 'react';
import axios from 'axios';
import {Container, Row, Col, Form, FormGroup, Input, Label, Button, Alert} from 'reactstrap';
import io from 'socket.io-client';

const UserRegister = (props) => {
    const {dbHost} = props;
    const [userRegConfirm, setUserRegConfirm] = useState('');
    const [userRegFail, setUserRegFail] = useState('');
    const [errors, setErrors] = useState({});
    const [socket] = useState(() => io(':8000'));
    //passes a callback function to initialize the socket
    //setSocket is omitted as the socket state will not be updated

    const[user, setUser] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
        birthDate: '',
        zipCode: '',
        password: '',
        confirmPassword: '',
        //uses a single state object to hold all data
    })

    const onChangeHandler = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
        //uses a single function to update the state object
        //input name serves as the key into the object
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post(`http://${dbHost}/api/users/register`, user,
        {withCredentials: true})
            .then((res) => {
                console.log('successful registration:')
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
                console.log('in UserRegister:')
                console.log(err);
                console.log(err.response.data);
                setErrors(err.response.data.errors);
                setUserRegFail("Registration failed: please review the form and resubmit.")
                setErrors({});
            });
    };

    return (
        <Container>
            {userRegConfirm ?
                <Alert color='success'>{userRegConfirm}</Alert>
                : null}
            {userRegFail ? 
                <Alert color='danger'>{userRegFail}</Alert>
                : null}
            <Row>
                <Form inline onSubmit={onSubmitHandler}>
                <Col>
                    <FormGroup>
                    {errors.firstName ? 
                        <Alert color='danger'>{errors.firstName.message}</Alert>
                        : null}
                        <Label for='firstName' className='Form'>First Name</Label>
                        <Input
                            type='text'
                            id='firstName'
                            name='firstName'
                            placeholder='Enter a last name'
                            value={user.firstName}
                            onChange={onChangeHandler}
                            />
                        </FormGroup>
                        <FormGroup>
                        {errors.lastName ? 
                            <Alert color='danger'>{errors.lastName.message}</Alert>
                            : null}
                            <Label for='lastName' className='Form'>Last Name</Label>
                            <Input
                                type='text'
                                id='lastName'
                                name='lastName'
                                placeholder='Enter a last name'
                                value={user.lastName}
                                onChange={onChangeHandler}
                                />
                        </FormGroup>
                        <FormGroup>
                        {errors.emailAddress ? 
                            <Alert color='danger'>{errors.emailAddress.message}</Alert>
                            : null}
                            <Label for='emailAddress' className='Form'>Email Address</Label>
                            <Input
                                type='email'
                                id='emailAddress'
                                name='emailAddress'
                                placeholder='Enter an email address'
                                value={user.emailAddress}
                                onChange={onChangeHandler}
                                />
                        </FormGroup>
                        <FormGroup>
                        {errors.birthDate ? 
                            <Alert color='danger'>{errors.birthDate.message}</Alert>
                            : null}
                            <Label for='birthDate' className='Form'>Birth Date</Label>
                            <Input
                                type='date'
                                id='birthDate'
                                name='birthDate'
                                placeholder='mm/dd/yyyy'
                                value={user.birthDate}
                                onChange={onChangeHandler}
                                />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                        {errors.zipCode ? 
                            <Alert color='danger'>{errors.zipCode.message}</Alert>
                            : null}
                            <Label for='zipcode' className='Form'>Zip Code</Label>
                            <Input
                                type='number'
                                id='zipCode'
                                name='zipCode'
                                placeholder='Enter a zip code'
                                value={user.zipCode}
                                onChange={onChangeHandler}
                                />
                        </FormGroup>
                        <FormGroup>
                        {errors.password ? 
                            <Alert color='danger'>{errors.password.message}</Alert>
                            : null}
                            <Label for='password' className='Form'>Password</Label>
                            <Input
                                type='password'
                                id='password'
                                name='password'
                                placeholder='Enter a password'
                                value={user.password}
                                onChange={onChangeHandler}
                                />
                        </FormGroup>
                        <FormGroup>
                        {errors.confirmPassword ? 
                            <Alert color='danger'>{errors.confirmPassword.message}</Alert>
                            : null}
                            <Label for='confirmPassword' className='Form'>Confirm Password</Label>
                            <Input
                                type='password'
                                id='confirmPassword'
                                name='confirmPassword'
                                value={user.confirmPassword}
                                placeholder='Confirm the password'
                                onChange={onChangeHandler}
                                />
                        </FormGroup>
                        <Button color='danger' type='submit'>Submit</Button>
                    </Col>
                </Form>
            </Row>
        </Container>
    )
}

export default UserRegister;