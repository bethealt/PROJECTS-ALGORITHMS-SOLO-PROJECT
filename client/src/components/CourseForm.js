import {React, useState} from 'react';
import {Container, Row, Col, Form, FormGroup, Input, Label, Button, Alert} from 'reactstrap';

const CourseForm = (props) => {
   const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState();
    const [start, setStart] = useState();
    const [end, setEnd] = useState();
    const [location, setLocation] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState();
    const [county, setCounty] = useState('');
    const {errors} = props;

    const onSubmitHandler = (e) => {

    }
    
    return (
        <Container>
            <Form onSubmit={onSubmitHandler}>
            {errors.map((err, index) => {
                return (
                    <Alert key={index} color='primary'>{err}</Alert>
                )})}<br/>
                <Row>
                    <Col>
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
                                className='Desc'
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
                            <Label for='start' className='Form'>Start Time</Label>
                            <Input
                                type='time'
                                id='start'
                                name='start'
                                placeholder='Enter a start time'
                                value={start}
                                onChange = {(e) => setStart(e.target.value)}
                                />
                        </FormGroup>
                        <FormGroup>
                            <Label for='end' className='Form'>End Time</Label>
                            <Input
                                type='time'
                                id='end'
                                name='end'
                                placeholder='Enter a end time'
                                value={end}
                                onChange = {(e) => setEnd(e.target.value)}
                                />
                        </FormGroup>
                    </Col>
                    <Col>
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
                    </Col>
                </Row>
                <Button type='submit' color='danger'>Add</Button>&nbsp;&nbsp;
            </Form>
        </Container>
    )
}

export default CourseForm;