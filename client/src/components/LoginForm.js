import React from 'react';
import {Form, FormGroup, Input, Label, Button, Alert} from 'reactstrap';

const LoginForm = (props) => {
    const {onSubmitHandler, emailAddress, setEmailAddress, password, setPassword, errors} = props;
    return(
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
            </FormGroup><br/>
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
            <Button type='submit' color='danger'>Login</Button>&nbsp;&nbsp;
        </Form>
    )
}

export default LoginForm;