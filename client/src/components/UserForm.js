import {React} from 'react';
import {Form, FormGroup, Input, Label, Button, Alert} from 'reactstrap';
import {Link} from '@reach/router';

const UserForm = (props) => {
    const {
        firstName, setFirstName, 
        lastName, setLastName,
        emailAddress, setEmailAddress,
        birthDate, setBirthDate,
        onSubmitHandler,
        password,  setPassword,
        errors} = props;
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
            </FormGroup><br/>
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
            </FormGroup><br/>
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
                <Label for='birthDate' className='Form'>Birth Date</Label>
                <Input
                    type='date'
                    id='birthDate'
                    name='birthDate'
                    placeholder='mm/dd/yyyy'
                    value={birthDate}
                    onChange = {(e) => setBirthDate(e.target.value)}
                    />
            </FormGroup><br/>
            <FormGroup>
                <Label for='password' className='Form'>Password</Label>
                <Input
                    type='password'
                    id='password'
                    placeholder='Enter a password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
            </FormGroup><br/>
            <FormGroup>
                <Label for='confirm-pwd' className='Form'>Confirm Password</Label>
                <Input
                    type='password'
                    id='password'
                    placehokder='Confirm the password'
                    />
            </FormGroup>
            <Button type='submit' color='danger'>Register</Button>&nbsp;&nbsp;
            <Link to='/login'><Button type='button' color='primary'>Login</Button></Link>
        </Form>
    )
}

export default UserForm;