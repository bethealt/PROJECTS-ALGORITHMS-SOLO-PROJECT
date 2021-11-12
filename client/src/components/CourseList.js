import React, {useState, useEffect} from 'react';
import {Container, Table, Button} from 'reactstrap';
import {Link} from '@reach/router';
import io from 'socket.io-client';

const CourseList = (props) => {
    const {catalog, enrollUser, dropUser} = props;
    const [socket] = useState(() => io(':8000'));


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