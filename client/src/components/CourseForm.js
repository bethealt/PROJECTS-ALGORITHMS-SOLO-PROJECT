import {React, useState} from 'react';
import {Form, FormGroup, Input, Label, Button, Alert} from 'reactstrap';
import {Link} from '@reach/router';

const CourseForm = (props) => {
    const {onSubmitHandler, errors} = props;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [location, setLocation] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState();
    const [county, setCounty] = useState('');

    return (
        <Form onSubmit={onSubmitHandler}>
        {errors.map((err, index) => {
            return (
                <Alert key={index} color='primary'>{err}</Alert>
            )})}<br/>
            <FormGroup>
                <Label for='title' className='Form'>Title</Label>
                <Input
                    type='text'
                    id='title'
                    name='title'
                    placeholder='Enter a course title'
                    value={title}
                    onChange = {(e) => setTitle(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label for='description' className='Form'>Description</Label>
                <Input
                    type='textarea'
                    id='description'
                    name='description'
                    placeholder='Enter a course description'
                    value={description}
                    onChange = {(e) => setDescription(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label for='date' className='Form'>Date</Label>
                <Input
                    type='date'
                    id='date'
                    name='date'
                    placeholder='Select a date'
                    value={date}
                    onChange = {(e) => setDate(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label for='time' className='Form'>Time</Label>
                <Input
                    type='time'
                    id='time'
                    name='time'
                    placeholder='Enter a time'
                    value={time}
                    onChange = {(e) => setTime(e.target.value)}
                    />
            </FormGroup>
            <FormGroup>
                <Label for='location' className='Form'>Location</Label>
                <Input
                    type='text'
                    id='location'
                    name='location'
                    placeholder='Enter a location'
                    value={location}
                    onChange = {(e) => setLocation(e.target.value)}
                    />
            </FormGroup>
            <FormGroup>
                <Label for='streetAddress' className='Form'>Street Address</Label>
                <Input
                    type='text'
                    id='streetAddress'
                    name='streetAddress'
                    placeholder='Enter a street address'
                    value={streetAddress}
                    onChange = {(e) => setStreetAddress(e.target.value)}
                    />
            </FormGroup>
            <FormGroup>
                <Label for='city' className='Form'>City</Label>
                <Input
                    type='text'
                    id='city'
                    name='city'
                    placeholder='Enter a city'
                    value={city}
                    onChange = {(e) => setCity(e.target.value)}
                    />
            </FormGroup>
            <FormGroup>
                <Label for='zipCode' className='Form'>Zip Code</Label>
                <Input
                    type='text'
                    id='zipCode'
                    name='zipCode'
                    placeholder='Enter a zip code'
                    value={zipCode}
                    onChange = {(e) => setZipCode(e.target.value)}
                    />
            </FormGroup>
            <FormGroup>
                <Label for='county' className='county'>County</Label>
                <Input
                    type='text'
                    id='county'
                    name='county'
                    placeholder='Enter a county'
                    value={county}
                    onChange = {(e) => setCounty(e.target.value)}
                    />
            </FormGroup>
            <Button type='submit' color='danger'>Add Course</Button>&nbsp;&nbsp;
            <Link to='/admin'><Button type='button' color='secondary'>Cancel</Button></Link>
        </Form>
    )
}

export default CourseForm;