import React, {useState, useEffect} from 'react';
import {Container, Table, ButtonGroup, Button} from 'reactstrap';
import {Link, navigate} from '@reach/router';
import axios from 'axios';
import {format} from 'date-fns';
import io from 'socket.io-client';

const CourseList = (props) => {
    const {admin, dbHost, setLoaded, user} = props;
    const [catalog, setCatalog] = useState([]);
    const [enrolled, setEnrolled] = useState([]);
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
        socket.on('course_updated', (updCourseObj) => {
            console.log('in updated_course:');
            console.log(updCourseObj);
            console.log(catalog);
            setCatalog((currentCatalog) => [...catalog, updCourseObj]);
        })
        socket.on('course_deleted', (delCourseId) => {
            console.log('in deleted_course:');
            console.log(delCourseId);
            console.log(catalog);
            setCatalog((currentCatalog) => {
                let filteredCatalog = currentCatalog.filter(oneCourseObj => 
                    oneCourseObj._id !== delCourseId);
                return filteredCatalog});
            //performs work inside the setter method to have access to the current course array value
            //returns the filtered array value to be used by the setCatatlog setter method
        })
        socket.on('user_enrolled', (enrlUserObj) => {
            console.log('in enrolled_course:');
            console.log(enrlUserObj)
            console.log(enrolled);
            setEnrolled((currentEnrolled) => [...enrolled, enrlUserObj]);
        })
        socket.on('user_dropped', (dropUserId) => {
            console.log('in dropped_user:');
            console.log(dropUserId);
            console.log(enrolled);
            setEnrolled((currentEnrolled) => {
                let filteredEnrolled = currentEnrolled.filter(oneUserObj => 
                    oneUserObj._id !== dropUserId);
                return filteredEnrolled});
        })
        return () => socket.disconnect();
        //best practice: socket client disconnects when the component is closed
        //return from useEffect will only run when the component is closed
        //include the dependency array to enusure that the useEffect continues to run

    }, []);
    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/courses`,
        {withCredentials: true})
            .then((res) => {
                console.log("inside read all courses:")
                console.log(res.data);
                setCatalog(res.data);
                setLoaded(true);
            })
            .catch((err) => console.log(err));
    }, []);

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
        axios.get(`http://${dbHost}/api/users/${_id}`,
        {withCredentials: true})
        .then((res) => {
            console.log('Enrolling user into a class:')
            console.log(res.data);
            setEnrolled([...enrolled, res.data]);
            socket.emit("enrolled_user", res.data)
            socket.disconnect();
        })
        .catch((err) => console.log(err));
    }

    const removeFromEnrolled = (_id) => {
        setEnrolled(enrolled.filter(user._id !== _id));
    }

    const dropUser = (_id) => {
        axios.get(`http://${dbHost}/api/users/${_id}`,
        {withCredentials: true})
        .then((res) => {
            removeFromEnrolled(_id);
            console.log('Dropping user from a class:')
            console.log(res.data);
            socket.emit("dropped_user", _id);
            socket.disconnect();
        })
        .catch((err) => console.log(err));
    }

    return (
        <Container>
            <Table hover>
                <thead>
                    <tr>
                        <th data-type='string'>Title</th>
                        {/*<th data-type='string'>Description</th>*/}
                        <th data-type='date'>Date</th>
                        <th data-type='string'>Start Time</th>
                        <th data-type='string'>End Time</th>
                        <th data-type='string'>City</th>
                        <th data-type='number'>Zip Code</th>
                        {/*<th data-type='string'>County</th>*/}
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
                                   {/* <td>{course.description}</td>*/}
                                    <td>{format ( new Date(course.date), 'E, dd MMM yy')}</td>
                                    <td>{course.start}</td>
                                    <td>{course.end}</td>
                                    <td>{course.city}</td>
                                    <td>{course.zipCode}</td>
                                    {/*<td>{course.county}</td>*/}
                                    {admin === true ?
                                    <td><ButtonGroup>
                                        <Link to={`/courses/:${course._id}`}><Button color='secondary' outline>View</Button></Link>
                                        <Link to={`/courses/edit/:${course._id}`}><Button color='secondary' outline>Edit</Button></Link>
                                        <Button onClick={() => deleteCourse(_id)} color='secondary' outline>Delete</Button>
                                    </ButtonGroup></td> :
                                    <td><ButtonGroup>
                                        <Link to={`/courses/:${course._id}`}><Button color='secondary' outline>View</Button></Link>
                                        <Button onClick={() => enrollUser(course._id)} color='secondary' outline>Enroll</Button>
                                        <Button onClick={() => dropUser(course._id)} color='secondary' outline>Drop</Button>
                                    </ButtonGroup></td>}
                                </tr>
                        )})}
                </tbody>
            </Table>
        </Container>
    )
};

export default CourseList;