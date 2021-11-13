import React, {useState, useEffect} from 'react';
import {Container, Table, Button} from 'reactstrap';
import {Link, navigate} from '@reach/router';
import axios from 'axios';
import io from 'socket.io-client';

const CourseList = (props) => {
    const {admin, catalog, setCatalog, dbHost, setLoaded} = props;
    const [courses, setCourses] = useState([]);
    const [socket] = useState(() => io(':8000'));
    //passes a callback function to initialize the socket
    //setSocket is not required as the socket state will not be updated

    useEffect(() => {
        console.log('inside {CL} useEffect for socket.io-client');
        socket.on('connect', () => {
            console.log(`Connected to the server via socket: ${socket.id}`);
        })
        //confirms connection to and communication with the server

        socket.on('new_course_added', (newCourseObj) => {
            console.log('in added_new_course:');
            console.log(newCourseObj);
            console.log(catalog);
            setCatalog((currentCatalog) => [...catalog, newCourseObj]);
            //passes the current value of the catalog array as a parameter for the function
            //returns brand new array for the setter to use
            //by default, it's an empty array because of when it was initiated and saved into state
        })
        socket.on('course_updated', (updatedCourseObj) => {
            console.log('in updated_course:');
            console.log(updatedCourseObj);
            console.log(catalog);
            setCatalog((currentCatalog) => [...catalog, updatedCourseObj]);
        })
        socket.on('course_deleted', (deletedCourseId) => {
            console.log('in deleted_course:');
            console.log(deletedCourseId);
            console.log(catalog);
            setCatalog((currentCatalog) => {
                let filteredCatalog = currentCatalog.filter(oneCourseObj => 
                    oneCourseObj._id !== deletedCourseId);
                return filteredCatalog});
            //performs work inside the setter method to have access to the current course array value
            //returns the filtered array value to be used by the setCatatlog setter method
        })
        return () => socket.disconnect();
        //best practice: socket client disconnects when the component is closed
        //return from useEffect will only run when the component is closed
        //include the dependency array to enusure that the useEffect continues to run

    }, []);
    
    useEffect(() => {
        axios.get(`http://${dbHost}/api/courses`,
        {withCredentials: true})
            .then((res) => {
                console.log(res);
                setCatalog(res.data);
                setLoaded(true);
            })
            .catch((err) => console.log(err));
    }, [dbHost, setCatalog, setLoaded]);

    const removeFromDom = (_id) => {
        setCatalog(catalog.filter(course => course._id !== _id));
    }

    const deleteCourse = (_id) => {
        axios.delete(`http://${dbHost}/api/courses/${_id}`,
        {withCredentials: true})
            .then(res => {
                removeFromDom(_id);
                console.log('Deleting an existing course:')
                console.log(res.data);
                socket.emit("deleted_course", _id);
                socket.disconnect();
                navigate('/admin');
                //successfully deletes an existing course
                //notifies the server so that it sends a message and data to all listeners
                //sends the course _id to the socket.io server
                //disconnects from the server before navigating away
            })
            .catch(err =>  console.log(err));
    }

    const enrollUser = (_id) => {
        axios.get(`http://${dbHost}/api/courses/${_id}`,
        {withCredentials: true})
        .then((res) => {
            let enrollObj = res.data;
            setCourses((currentCourses) => [...courses, enrollObj]);
            console.log('Enrolling user into a class:')
            console.log(res.data);
            socket.emit("enroll_user", enrollObj)
            socket.disconnect();
        })
        .catch((err) => console.log(err));
    }

    const dropUser = (_id) => {
        return null
    }

    return (
        <Container>
            <Table hover>
                <thead>
                    <tr>
                        <th data-type='string'>Title</th>
                        <th data-type='string'>Description</th>
                        <th data-type='date'>Date</th>
                        <th data-type='string'>Start Time</th>
                        <th data-type='string'>End Time</th>
                        <th data-type='string'>City</th>
                        <th data-type='number'>Zip Code</th>
                        <th data-type='string'>County</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {catalog
                        .slice().sort((a, b) => b.date - a.date)
                        .map((course, _id) => {
                            return(
                                <tr key={_id}>
                                    <td>{course.title}</td>
                                    <td>{course.description}</td>
                                    <td>{course.date}</td>
                                    <td>{course.start}</td>
                                    <td>{course.end}</td>
                                    <td>{course.city}</td>
                                    <td>{course.zipCode}</td>
                                    <td>{course.county}</td>
                                    {
                                        admin === true ?
                                        <td>
                                        <Link to={`/courses/${course._id}`}>
                                        <Button>View</Button></Link>&nbsp;&nbsp;
                                        <Link to={`/courses/edit/${course._id}`}>
                                        <Button>Edit</Button></Link>&nbsp;&nbsp;
                                        <Button onClick={deleteCourse}>Delete</Button>&nbsp;&nbsp;
                                        </td>
                                        :
                                        <td>
                                        <Link to={`/courses/${course._id}`}>
                                        <Button>View</Button></Link>&nbsp;&nbsp;
                                        <Button onClick={enrollUser}>Enroll</Button>&nbsp;&nbsp;
                                        <Button onClick={dropUser}>Drop</Button>
                                        </td>
                                    }
                                </tr>
                        )})}
                </tbody>
            </Table>
        </Container>
    )
};

export default CourseList;