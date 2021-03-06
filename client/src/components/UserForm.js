import React, {useState} from 'react';
import {Container, Row, Col, Form, FormGroup, Input, Label, FormFeedback, Button, Alert} from 'reactstrap';

const UserForm = (props) => {
    const {alertConfirm, alertFail, errors, onSubmitHandler} = props;

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
        birthDate: '',
        zipCode: '',
        password: '',
        confirmPassword: '',
        //uses a single state object to hold user data
    })
    
    const onChangeHandler = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
        //uses a single function to update the state object
        //input name serves as the key into the object
    }

    return (
        <Container>
            {alertConfirm ?
                <Alert color='success'>{alertConfirm}</Alert>
                : null}
            {alertFail ? 
                <Alert color='danger'>{alertFail}</Alert>
                : null}
            <Row>
                <Col>
                    <Form inline onSubmit={(e) => onSubmitHandler(e, user, setUser)}>
                    {errors && errors && errors.firstName ? 
                    <FormGroup className="position-relative">
                        <Label for='firstName'>First Name</Label>
                        <Input
                            invalid
                            type='text'
                            id='firstName'
                            name='firstName'
                            placeholder='Enter a first name'
                            value={user.firstName}
                            onChange={onChangeHandler}
                            />
                        <FormFeedback tooltip>{errors && errors.firstName.message}</FormFeedback>
                        </FormGroup>
                        :<FormGroup className="position-relative">
                            <Label for='firstName' className='Form'>First Name</Label>
                            <Input
                                type='text'
                                id='firstName'
                                name='firstName'
                                placeholder='Enter a first name'
                                value={user.firstName}
                                onChange={onChangeHandler}
                                />
                        </FormGroup>}
                        {errors && errors.lastName ? 
                        <FormGroup className="position-relative">
                            <Label for='lastName' className='Form'>Last Name</Label>
                            <Input
                                invalid
                                type='text'
                                id='lastName'
                                name='lastName'
                                placeholder='Enter a last name'
                                value={user.lastName}
                                onChange={onChangeHandler}
                                />
                            <FormFeedback tooltip>{errors && errors.lastName.message}</FormFeedback>
                        </FormGroup>
                        :<FormGroup className="position-relative">
                            <Label for='lastName' className='Form'>Last Name</Label>
                            <Input
                                type='text'
                                id='lastName'
                                name='lastName'
                                placeholder='Enter a last name'
                                value={user.lastName}
                                onChange={onChangeHandler}
                                />
                        </FormGroup>}
                        {errors && errors.emailAddress ? 
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
                            <FormFeedback tooltip>{errors && errors.emailAddress.message}</FormFeedback>
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
                        {errors && errors.birthDate ? 
                        <FormGroup className="position-relative">
                            <Label for='birthDate' className='Form'>Birth Date</Label>
                            <Input
                                invalid
                                type='date'
                                id='birthDate'
                                name='birthDate'
                                placeholder='Enter a birth date'
                                value={user.birthDate}
                                onChange={onChangeHandler}
                                />
                            <FormFeedback tooltip>{errors && errors.birthDate.message}</FormFeedback>
                        </FormGroup>
                        :<FormGroup className="position-relative">
                            <Label for='birthDate' className='Form'>Birth Date</Label>
                            <Input
                                type='date'
                                id='birthDate'
                                name='birthDate'
                                placeholder='Enter a birth date'
                                value={user.birthDate}
                                onChange={onChangeHandler}
                                />
                        </FormGroup>}
                        {errors && errors.zipCode ? 
                        <FormGroup className="position-relative">
                            <Label for='zipCode' className='Form'>Zip Code</Label>
                            <Input
                                invalid
                                type='number'
                                id='zipCode'
                                name='zipCode'
                                placeholder='Enter a zip code'
                                value={user.zipCode}
                                onChange={onChangeHandler}
                                />
                            <FormFeedback tooltip>{errors && errors.zipCode.message}</FormFeedback>
                        </FormGroup>
                        :<FormGroup className="position-relative">
                            <Label for='zipCode' className='Form'>Zip Code</Label>
                            <Input
                                type='number'
                                id='zipCode'
                                name='zipCode'
                                placeholder='Enter a zip code'
                                value={user.zipCode}
                                onChange={onChangeHandler}
                                />
                        </FormGroup>}    
                        {errors && errors.password ? 
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
                            <FormFeedback tooltip>{errors && errors.password.message}</FormFeedback>
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
                        {errors && errors.confirmPassword ? 
                        <FormGroup className="position-relative">
                            <Label for='confirmPassword' className='Form'>Confirm Password</Label>
                            <Input
                                invalid
                                type='password'
                                id='confirmPassword'
                                name='confirmPassword'
                                placeholder='Confirm your password'
                                value={user.confirmPassword}
                                onChange={onChangeHandler}
                                />
                            <FormFeedback tooltip>{errors && errors.confirmPassword.message}</FormFeedback>
                        </FormGroup>
                        :<FormGroup className="position-relative">
                            <Label for='confirmPassword' className='Form'>Confirm Password</Label>
                            <Input
                                type='password'
                                id='confirmPassword'
                                name='confirmPassword'
                                placeholder='Confirm your password'
                                value={user.confirmPassword}
                                onChange={onChangeHandler}
                                />
                        </FormGroup>}
                        <Button color='danger' id='userform' type='submit'>Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default UserForm;