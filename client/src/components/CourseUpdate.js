import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Container, Row, Col, Form, FormGroup, Input, Label, Button, Alert} from 'reactstrap';
import {navigate} from '@reach/router';
import io from 'socket.io-client';

const CourseUpdate = (props) => {
    const {dbHost, _id, errors, setErrors} = props;
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
    const [course, setCourse] = useState({});
    const [socket] = useState(() => io(':8000'));
    //passes a callback function to initialize the socket
    //setSocket is not required as the socket state will not be updated
    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/courses/${_id}`,
        {withCredentials: true})
            .then((res) => {
                console.log(res);
                setCourse(res.data)
                
            })
            .catch((err) => console.log(err))  
    }, []);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const updatedCourse = {
            title,
            description,
            date,
            start,
            end,
            location,
            streetAddress,
            city,
            zipCode,
            county
        };

    axios.put(`http://${dbHost}/api/courses`, updatedCourse,
        {withCredentials: true})
            .then((res) => {
                console.log('Updating an existing course:')
                console.log(res.data);
                socket.emit("updated_course", res.data);
                socket.disconnect();
                navigate('/admin');
                //succesfully updates an existing course
                //notifies the server so that it sends message and data to all listeners
                //sends the entire updated course object to the socket.io server
                //disconnects from the server before navigating away
            })
            .catch((err) => {
                if(err.response.status === 401) {
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
                                value={course.title}
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
                                value={course.description}
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
                                value={course.date}
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
                                value={course.start}
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
                                value={course.end}
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
                                value={course.location}
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
                                value={course.streetAddress}
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
                                value={course.city}
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
                                value={course.zipCode}
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
                                value={course.county}
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
export default CourseUpdate;