import React, {useState} from 'react';
import axios from 'axios';
import {Container, Row, Col, Form, FormGroup, Input, Label, Button, Alert} from 'reactstrap';

const UserRegister = (props) => {
    const {dbHost, errors} = props;
    const [userRegConfirm, setUserRegConfirm] = useState('');
    const [errs, setErrs] = useState({});

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
                setErrs({});
                //user state exists as an object with correct keys and values
                //forces the send of credentials/cookies with request for update
                //XMLHttpRequest from another domain cannot set cookie values for their own domain unless {withCredentials: true} before making request
                //reset state for UserRegister as user does not navigate away
                //reset errors state if registration is successful
            })
            .catch((err) => {
                console.log('inside UserRegister:')
                console.log(err);
                setErrs(err);
                for (const key of Object.keys(errs)) {
                    errors.push(errs[key.message])
                }
                console.log(errors)
                setErrs({});
            })
    };

    return (
        <Container>
            {userRegConfirm ?
                <Alert color='success'>{userRegConfirm}</Alert>
                : errors.map((err, index) => {
                return (
                    <Alert key={index} color='primary'>{err}</Alert>
            )})}
            <Row>
                <Form onSubmit={onSubmitHandler}>
                    <Col>
                        <FormGroup>
                            <Label for='firstName' className='Form'>First Name</Label>
                            <Input
                                type='text'
                                id='firstName'
                                name='firstName'
                                placeholder='Enter a first name'
                                value={user.firstName}
                                onChange={onChangeHandler}
                                />
                        </FormGroup>
                        <FormGroup>
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
                    </Col>
                <Button color='danger' type='submit'>Submit</Button>
                </Form>
            </Row>
        </Container>
    )
}

export default UserRegister;