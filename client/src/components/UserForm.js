import React, {useState} from 'react';
import axios from 'axios';
import {Container, Row, Col, Form, FormGroup, Input, Label, Button, Alert} from 'reactstrap';
import {navigate} from '@reach/router';

const UserForm = (props) => {
    const {dbHost, userRegistered, setUserRegistered, errors, setErrors} = props;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [birthDate, setBirthDate] =useState('');
    const [zipcode, setZipCode] = useState();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const newUser = {
            firstName,
            lastName,
            emailAddress,
            birthDate,
            zipcode,
            password,
            confirmPassword
        };

        axios.post(`http://${dbHost}/api/users/register`, newUser,
        {withCredentials: true})
            .then((res) => {
                console.log(res);
                setUserRegistered(!userRegistered)
                navigate('/dashboard');
            })
            .catch((err) => {
                console.log(err)
                if(err.response.status === (401)) {
                    navigate('/');
                }
                console.log(err.response.data.errors);
                if (err.response.data.errors) {
                    setErrors(err.response.data.errors);
                }
            })
    }

    return (
        <Container>
            <Form onSubmit={onSubmitHandler}>
            {errors.map((error, index) => {
                return (
                    <Alert key={index} color='primary'>{error}</Alert>
                )})}<br/>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for='firstName' className='Form'>First Name</Label>
                            <Input
                                type='text'
                                id='firstName'
                                name='firstName'
                                placeholder='Enter a first name'
                                value={firstName}
                                onChange = {(e) => setFirstName(e.target.value)}
                                />
                        </FormGroup>
                        <FormGroup>
                            <Label for='lastName' className='Form'>Last Name</Label>
                            <Input
                                type='text'
                                id='lastName'
                                name='lastName'
                                placeholder='Enter a last name'
                                value={lastName}
                                onChange = {(e) => setLastName(e.target.value)}
                                />
                        </FormGroup>
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
                            <Label for='birthDate' className='Form'>Birth Date</Label>
                            <Input
                                type='date'
                                id='birthDate'
                                name='birthDate'
                                placeholder='mm/dd/yyyy'
                                value={birthDate}
                                onChange = {(e) => setBirthDate(e.target.value)}
                                />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for='zipcode' className='Form'>Zip Code</Label>
                            <Input
                                type='number'
                                id='zipcode'
                                name='zipcode'
                                placeholder='Enter a zip code'
                                value={zipcode}
                                onChange = {(e) => setZipCode(e.target.value)}
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
                                onChange={(e) => setPassword(e.target.value)}
                                />
                        </FormGroup>
                        <FormGroup>
                            <Label for='confirmPassword' className='Form'>Confirm Password</Label>
                            <Input
                                type='password'
                                id='confirmPassword'
                                name='confirmPassword'
                                value={confirmPassword}
                                placeholder='Confirm the password'
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                        </FormGroup>
                    </Col>
                </Row>
                <Button color='danger' type='submit'>Submit</Button>
            </Form>
        </Container>
    )
}

export default UserForm;