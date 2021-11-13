import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Container, Row, Col, CardGroup, Card, CardImg, CardTitle, CardSubtitle, CardText, CardBody, Button} from 'reactstrap';
import {Link} from '@reach/router';

const CourseHistory = (props) => {
    const {dbHost, _id, dropUser} = props;
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    
    useEffect(() => {
        axios.get(`http://${dbHost}/api/users/${_id}`,
        {withCredentials: true})
            .then((res) => {
                console.log(res);
                setEnrolledCourses(res.data.courses);
            })
            .catch((err) => console.log(err));
    }, []);

    return(
        <Container>
        <Row>
            <Col><br/>
            <CardGroup>
            {enrolledCourses
                .sort((a, b) => b.date - a.date)
                .map((course, _id) => {
                    return(
                        <Card>
                            <CardImg
                            alt="More convenient location"
                            src="https://picsum.photos/318/180"
                            top
                            width="100%"
                            />
                            <CardBody color="danger" outline>
                            <CardTitle tag="h5">
                                {course.title}
                            </CardTitle>
                            <CardSubtitle
                                className="mb-2 text-muted"
                                tag="h6"
                            >
                                {course.date}
                            </CardSubtitle>
                            <CardText>
                                {course.description}
                            </CardText>
                            <Link to={`/courses/${course._id}`}>
                            <Button>View</Button></Link>&nbsp;|&nbsp;
                            <Button onClick={dropUser}>Drop</Button>
                            </CardBody>
                        </Card>
                    )
                })}
                </CardGroup>
            </Col>
        </Row>
    </Container>
    )
}

export default CourseHistory;