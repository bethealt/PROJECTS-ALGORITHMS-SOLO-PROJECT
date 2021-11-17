import React, {useState} from 'react';
import axios from 'axios';
import {Container, Row, Col, Form, FormGroup, Input, FormFeedback, Label, Button, Alert} from 'reactstrap';
import {navigate} from '@reach/router';
import io from 'socket.io-client';

const CourseForm = (props) => {
    const {errors, setErrors} = props;
    const [courseCreateConfirm, setCourseCreateConfirm] = useState('');
    const [courseCreateFail, setCourseCreateFail] = useState('');
    const [socket] = useState(() => io(':8000'));
    //passes a callback function to initialize the socket
    //setSocket is omitted as the socket state will not be updated
  
    const [newCourse, setNewCourse] = useState({
        title: '',
        description: '',
        date: '',
        start: '',
        end: '',
        location: '',
        streetAddress: '',
        city: '',
        zipCode: '',
        county: '',
        //uses a single state object to hold course data
    })

    const onChangeHandler = (e) => {
        setNewCourse({...newCourse, [e.target.name]: e.target.value})
        //uses a single function to update the state object
        //input name serves as the key into the object
        //uses a single function to update the state object
        //input name serves as the key into the object
    }
    
    const createCourse = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/courses`, newCourse,
        {withCredentials: true})
            .then((res) => {
                console.log('Adding a new course:')
                console.log(res.data);
                socket.emit("added_new_course", res.data);
                socket.disconnect();
                setCourseCreateConfirm("New course creation successful.")
                navigate('/admin');
                //successfully adds a new course
                //notifies the server so that it sends a message and data to all listeners
                //sends the entire new course object to the socket.io server
                //disconnects from the server before navigating away
            })
            .catch((err) => {
                if(err.response.status === 401) {
                    navigate('/');
                }
                console.log('in create course:')
                console.log(err);
                console.log(err.response.data);
                console.log(err.response.data.errors);
                setErrors(err.response.data.errors);
                setCourseCreateFail("");
            })
    }
    
    return (
        <Container>
            {courseCreateConfirm ?
                <Alert color='success'>{courseCreateConfirm}</Alert>
                : null}
            {courseCreateFail ? 
                <Alert color='danger'>{courseCreateFail}</Alert>
                : null}
           <Row>
                <Col>
                    <Form inline onSubmit={createCourse}>   
                    {errors.title ? 
                        <FormGroup className="position-relative">
                            <Label for='title' className='Form'>Title</Label>
                            <Input
                                invalid
                                type='text'
                                id='title'
                                name='title'
                                placeholder='Enter a title'
                                value={newCourse.title}
                                onChange={onChangeHandler}
                                />
                            <FormFeedback tooltip>{errors.title.message}</FormFeedback>
                        </FormGroup>
                        :<FormGroup className="position-relative">
                            <Label for='title' className='Form'>Title</Label>
                            <Input
                                type='text'
                                id='title'
                                name='title'
                                placeholder='Enter a title'
                                value={newCourse.title}
                                onChange={onChangeHandler}
                                />
                        </FormGroup>}
                        {errors.description ? 
                        <FormGroup className="position-relative">
                            <Label for='description' className='Form'>Description</Label>
                            <Input
                                invalid
                                type='text'
                                id='description'
                                name='description'
                                placeholder='Enter a description'
                                value={newCourse.description}
                                onChange={onChangeHandler}
                                />
                            <FormFeedback tooltip>{errors.description.message}</FormFeedback>
                        </FormGroup>
                        :<FormGroup className="position-relative">
                            <Label for='description' className='Form'>Description</Label>
                            <Input
                                type='text'
                                id='description'
                                name='description'
                                placeholder='Enter a description'
                                value={newCourse.description}
                                onChange={onChangeHandler}
                                />
                        </FormGroup>}
                        {errors.date ? 
                        <FormGroup className="position-relative">
                            <Label for='date' className='Form'>Date</Label>
                            <Input
                                invalid
                                type='date'
                                id='date'
                                name='date'
                                placeholder='Enter a date'
                                value={newCourse.date}
                                onChange={onChangeHandler}
                                />
                            <FormFeedback tooltip>{errors.date.message}</FormFeedback>
                            </FormGroup>
                        :<FormGroup className="position-relative">
                            <Label for='date' className='Form'>Date</Label>
                            <Input
                                type='date'
                                id='date'
                                name='date'
                                placeholder='Enter a date'
                                value={newCourse.date}
                                onChange={onChangeHandler}
                                />
                        </FormGroup>}
                        {errors.start ? 
                        <FormGroup className="position-relative">
                            <Label for='start' className='Form'>Start Time</Label>
                            <Input
                                invalid
                                type='time'
                                id='start'
                                name='start'
                                placeholder='Enter a start time'
                                value={newCourse.start}
                                onChange={onChangeHandler}
                                />
                            <FormFeedback tooltip>{errors.start.message}</FormFeedback>
                        </FormGroup>
                        :<FormGroup className="position-relative">
                            <Label for='start' className='Form'>Start Time</Label>
                            <Input
                                type='time'
                                id='start'
                                name='start'
                                placeholder='Enter a start time'
                                value={newCourse.start}
                                onChange={onChangeHandler}
                                />
                        </FormGroup>}
                        {errors.end ? 
                        <FormGroup className="position-relative">
                            <Label for='end' className='Form'>End Time</Label>
                            <Input
                                invalid
                                type='time'
                                id='end'
                                name='end'
                                placeholder='Enter a end time'
                                value={newCourse.end}
                                onChange={onChangeHandler}
                                />
                            <FormFeedback tooltip>{errors.end.message}</FormFeedback>
                        </FormGroup>
                        :<FormGroup className="position-relative">
                            <Label for='end' className='Form'>End Time</Label>
                            <Input
                                type='time'
                                id='end'
                                name='end'
                                placeholder='Enter a end time'
                                value={newCourse.end}
                                onChange={onChangeHandler}
                                />
                        </FormGroup>}
                        {errors.location ? 
                        <FormGroup className="position-relative">
                            <Label for='location' className='Form'>Location</Label>
                            <Input
                                invalid
                                type='text'
                                id='location'
                                name='location'
                                placeholder='Enter a location'
                                value={newCourse.location}
                                onChange={onChangeHandler}
                                />
                            <FormFeedback tooltip>{errors.location.message}</FormFeedback>
                        </FormGroup>
                        :<FormGroup className="position-relative">
                            <Label for='location' className='Form'>Location</Label>
                            <Input
                                type='text'
                                id='location'
                                name='location'
                                placeholder='Enter a location'
                                value={newCourse.location}
                                onChange={onChangeHandler}
                                />
                        </FormGroup>}
                        {errors.streetAddress ? 
                        <FormGroup className="position-relative">
                            <Label for='streetAddress' className='Form'>Street Address</Label>
                            <Input
                                invalid
                                type='text'
                                id='streetAddress'
                                name='streetAddress'
                                placeholder='Enter a street address'
                                value={newCourse.streetAddress}
                                onChange={onChangeHandler}
                                />
                            <FormFeedback tooltip>{errors.streetAddress.message}</FormFeedback>
                        </FormGroup>
                        :<FormGroup className="position-relative">
                            <Label for='streetAddress' className='Form'>Street Address</Label>
                            <Input
                                type='text'
                                id='streetAddress'
                                name='streetAddress'
                                placeholder='Enter a street address'
                                value={newCourse.streetAddress}
                                onChange={onChangeHandler}
                                />
                        </FormGroup>}
                        {errors.city ? 
                        <FormGroup className="position-relative">
                            <Label for='city' className='Form'>City</Label>
                            <Input
                                invalid
                                type='text'
                                id='city'
                                name='city'
                                placeholder='Enter a city'
                                value={newCourse.city}
                                onChange={onChangeHandler}
                                />
                            <FormFeedback tooltip>{errors.city.message}</FormFeedback>
                        </FormGroup>
                        :<FormGroup className="position-relative">
                            <Label for='city' className='Form'>City</Label>
                            <Input
                                type='text'
                                id='city'
                                name='city'
                                placeholder='Enter a city'
                                value={newCourse.city}
                                onChange={onChangeHandler}
                                />
                        </FormGroup>}
                        {errors.zipcode ? 
                        <FormGroup className="position-relative">
                            <Label for='zipCode' className='Form'>Zip Code</Label>
                            <Input
                                invalid
                                type='number'
                                id='zipCode'
                                name='zipCode'
                                placeholder='Enter a zip code'
                                value={newCourse.zipCode}
                                onChange={onChangeHandler}
                                />
                            <FormFeedback tooltip>{errors.zipCode.message}</FormFeedback>
                        </FormGroup>
                        :<FormGroup className="position-relative">
                            <Label for='zipCode' className='Form'>Zip Code</Label>
                            <Input
                                type='number'
                                id='zipCode'
                                name='zipCode'
                                placeholder='Enter a zip code'
                                value={newCourse.zipCode}
                                onChange={onChangeHandler}
                                />
                        </FormGroup>}
                        {errors.county ? 
                        <FormGroup className="position-relative">
                            <Label for='county' className='Form'>County</Label>
                            <Input
                                invalid
                                type='text'
                                id='county'
                                name='county'
                                placeholder='Enter a county'
                                value={newCourse.county}
                                onChange={onChangeHandler}
                                />
                            <FormFeedback tooltip>{errors.county.message}</FormFeedback>
                        </FormGroup>
                        :<FormGroup className="position-relative">
                            <Label for='county' className='Form'>County</Label>
                            <Input
                                type='text'
                                id='county'
                                name='county'
                                placeholder='Enter a county'
                                value={newCourse.county}
                                onChange={onChangeHandler}
                                />
                        </FormGroup>}
                        <Button type='submit' color='primary'>Add Course</Button>&nbsp;&nbsp;
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default CourseForm;