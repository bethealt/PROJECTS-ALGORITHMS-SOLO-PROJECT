import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Container, ListGroup, ListGroupItem, ListGroupItemHeading} from 'reactstrap';

const CourseDetails = (props) => {
    const {_id} = props;
    const [course, setCourse] = useState({});
    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/courses/${_id}`,
        {withCredentials: true})
            .then((res) => {
                console.log(res);
                setCourse(res.data)   
            })
            .catch((err) => console.log(err))  
    }, []);

    return(
        <Container>
            <ListGroup flush>
                <ListGroupItemHeading>TITLE: {course.title}</ListGroupItemHeading>
                <ListGroupItem>DESCRIPTION: {course.description}</ListGroupItem>
                <ListGroupItem>DATE: {course.date}</ListGroupItem>
                <ListGroupItem>START TIME: {course.start}</ListGroupItem>
                <ListGroupItem>END TIME: {course.end}</ListGroupItem>
                <ListGroupItem>LOCATION: {course.location}</ListGroupItem>
                <ListGroupItem>STREET ADDRESS: {course.streetAddress}</ListGroupItem>
                <ListGroupItem>CITY: {course.city}</ListGroupItem>
                <ListGroupItem>ZIP CODE: {course.zipCode}</ListGroupItem>
                <ListGroupItem>COUNTY: {course.county}</ListGroupItem>
            </ListGroup>
        </Container>
    )
}

export default CourseDetails;

