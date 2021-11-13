import React, {useState, useEffect} from 'react';
import {Container, Table, Button} from 'reactstrap';
import {Link} from '@reach/router';
import axios from 'axios';
import io from 'socket.io-client';

const CourseList = (props) => {
    const {catalog, setCatalog, dbHost, setLoaded} = props;
    const [socket] = useState(() => io(':8000'));
    //passes a callback function to initialize the socket
    //setSocket is not required as the socket state will not be updated

    useEffect(() => {
        //confirms connection to and communication with the server
        console.log('inside {CL} useEffect for socket.io-client');

        socket.on('connect', () => {
            console.log(`Connected to the server via socket: ${socket.id}`);
        })

        socket.on('new_course_added', (newCourseObj) => {
            console.log('in added_new_course');
            console.log(newCourseObj);
            console.log(catalog);
            //passes the current value of the catalog array as a parameter for the function
            //returns brand new array for the setter to use
            //by default, it's an empty array because of when it was initiated and saved into state
            setCatalog((currentCatalog) => [...catalog, newCourseObj]);
        })
        //best practice: socket client disconnects when the component is closed
        //return from useEffect will only run when the component is closed
        //include the dependency array to enusure that the useEffect continues to run
        return () => socket.disconnect();

        socket.on('course_canceled', ())
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

    const cancelCourse = (_id) => {
        axios.delete(`http://${dbHost}/api/courses/${_id}`,
        {withCredentials: true})
            .then(res => {removeFromDom(_id)})
            .catch(err =>  console.log(err));
    }

    const enrollUser = (_id) => {
        return null
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
                        <th data-type='number'>Time</th>
                        <th data-type='string'>City</th>
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
                                    <td>{course.time}</td>
                                    <td>{course.city}</td>
                                    <td>{course.county}</td>
                                    {
                                        admin === true ?
                                        <td>
                                        <Link to={`/courses/${course._id}`}>
                                        <Button>View</Button></Link>&nbsp;&nbsp;
                                        <Link to={`/courses/edit/${course._id}`}>
                                        <Button>Edit</Button></Link>&nbsp;&nbsp;
                                        <Button onClick={cancelCourse}>Cancel</Button>&nbsp;&nbsp;
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