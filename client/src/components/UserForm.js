import React from 'react';
import {Container, Row, Col, Form, FormGroup, Input, Label, FormFeedback, Button, Alert} from 'reactstrap';

const UserRegister = (props) => {
    const {errors, onSubmitHandler, user, setUser, userRegConfirm, userRegFail} = props;

    const onChangeHandler = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
        //uses a single function to update the state object
        //input name serves as the key into the object
    }

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
                        <FormFeedback color='danger'>{errors.firstName.message}</FormFeedback>
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
                            <FormFeedback color='danger'>{errors.lastName.message}</FormFeedback>
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
                            <FormFeedback color='danger'>{errors.emailAddress.message}</FormFeedback>
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
                            <FormFeedback color='danger'>{errors.birthDate.message}</FormFeedback>
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
                            <FormFeedback color='danger'>{errors.zipCode.message}</FormFeedback>
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
                            <FormFeedback color='danger'>{errors.password.message}</FormFeedback>
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
                            <FormFeedback color='danger'>{errors.confirmPassword.message}</FormFeedback>
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