import React, {useState} from 'react';
import {Form, FormGroup, Input, Label, Button, Alert} from 'reactstrap';
import {navigate} from '@reach/router';

const UserForm = (props) => {
    const {
        firstName, setFirstName,
        lastName, setLastName,
        emailAddress, setEmailAddress,
        birthDate, setBirthDate,
        zipcode, setZipCode,
        onSubmitHandler,
        password, setPassword, 
        confirmPassword, setConfirmPassword,
        errors
    } = props;

    return (
        <Form onSubmit={onSubmitHandler}>
        {errors.map((err, index) => {
            return (
                <Alert key={index} color='primary'>{err}</Alert>
            )})}<br/>
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
            <Button color='danger' type='submit'>Register</Button>&nbsp;&nbsp;
        </Form>
    )
}

export default UserForm;