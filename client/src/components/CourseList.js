import React, {useState, useEffect} from 'react';
import {Container, Table, Button} from 'reactstrap';
import {Link} from '@reach/router';
import axios from 'axios';
import io from 'socket.io-client';

const CourseList = (props) => {
    const {catalog, setCatalog, setLoaded} = props;
    const dbHost = process.env.DB_HOST;
    const dbPort = process.env.DB_PORT;
    const [socket] = useState(() => io(`:${dbPort}`));
    //passes a callback function to initialize the socket
    //setSocket is not required as the socket state will not be updated

    useEffect(() => {
        //confirms connection to and communication with the server
        console.log(`Inside {CL} useEffect for socket.io-client`);

        socket.on('connect', () => {
            console.log(`Connected to the server via socket: ${socket.id}`);
            

        })
    })
    
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
                                    <td>
                                        <Link to={`/courses/${course._id}`}><Button>View</Button></Link>&nbsp;&nbsp;
                                        <Button onClick={enrollUser}>Enroll</Button>&nbsp;&nbsp;
                                        <Button onClick={dropUser}>Drop</Button>
                                    </td>
                                </tr>
                        )})}
                </tbody>
            </Table>
        </Container>
    )
};

export default CourseList;