import React, {useState} from 'react';
import axios from 'axios';
import {Container, Nav, NavItem, NavLink, TabContent, TabPane, Row, Col, CardGroup, Card, CardImg, CardTitle, CardSubtitle, CardText, CardBody, Button} from 'reactstrap';
import classnames from 'classnames';
import {navigate} from '@reach/router';

import CourseList from '../components/CourseList';
import UserForm from '../components/UserForm';

const Dashboard = (props) => {
    const dbPort = process.env.DB_PORT
    const {
        firstName,
        lastName,
        emailAddress,
        birthDate,
        zipcode,
        password,
        confirmPassword, users,
        setUsers, setUserRegistered, userRegistered,
        setUserLoggedIn, userLoggedIn, setErrors, errors
    } = props;
    const [activeTab, setActiveTab] = useState('1');
    const [catalog, setCatalog] = useState([]);
    
    const toggle = (tab) => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    const updateUser = user => {
        axios.post(`http://localhost:${dbPort}/api/users/update`, {
            firstName,
            lastName,
            emailAddress,
            birthDate,
            zipcode,
            password,
            confirmPassword}, 
            //ensures that cookies are sent with each request; 
            //Middleware verifies who is logged in
            {withCredentials: true})
        .then(res => {
            console.log(res);
            setUsers([...users, res.data]);
            setUserRegistered(!userRegistered);
            setUserLoggedIn(!userLoggedIn);
            navigate("/dashboard");
        })
        .catch(err => {
            const errorResponse = err.response.data.errors;
            const errorArr = [];
            for (const key of Object.keys(errorResponse)) {
                errorArr.push(errorResponse[key].message)
            }
            setErrors(errorArr);
            console.log(errorArr);
        })
    }

    return(
        <Container>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({active: activeTab === '1'})}
                        onClick={() => {toggle('1'); }}>
                        PROFILE
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({active: activeTab === '2'})}
                        onClick={() => {toggle('2'); }}>
                        HISTORY
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({active: activeTab === '3'})}
                        onClick={() => {toggle('2'); }}>
                        CATALOG
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId='1'>
                    <Row>
                        <Col 
                            md={{ offset: 2, size: 8}}
                            sm="12"><br/>
                            <h4>Manage Your Profile</h4><br/>
                            <UserForm
                                onSubmitProp = {updateUser} 
                                errors={errors} 
                            />
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId='2'>
                    <Row>
                        <Col 
                            md={{ offset: 1, size: 10}}
                            sm="12"><br/>
                            <h4>Manage Your Courses</h4><br/>
                            <Container>
                                <Row>
                                    <Col><br/>
                                    <CardGroup>
                                    <Card>
                                        <CardImg
                                        alt="Card image cap"
                                        src="https://picsum.photos/318/180"
                                        top
                                        width="100%"
                                        />
                                        <CardBody color="danger"
                                        outline>
                                        <CardTitle tag="h5">
                                            PREVIOUS
                                        </CardTitle>
                                        <CardSubtitle
                                            className="mb-2 text-muted"
                                            tag="h6"
                                        >
                                            Card subtitle
                                        </CardSubtitle>
                                        <CardText>
                                            This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                                        </CardText>
                                        <Button>
                                            Button
                                        </Button>
                                        </CardBody>
                                    </Card>
                                        <Card>
                                            <CardImg
                                            alt="Card image cap"
                                            src="https://picsum.photos/318/180"
                                            top
                                            width="100%"
                                            />
                                            <CardBody color="danger"
                                        outline>
                                            <CardTitle tag="h5">
                                                CURRENT
                                            </CardTitle>
                                            <CardSubtitle
                                                className="mb-2 text-muted"
                                                tag="h6"
                                            >
                                                Card subtitle
                                            </CardSubtitle>
                                            <CardText>
                                                This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                                            </CardText>
                                            <Button>
                                                Button
                                            </Button>
                                            </CardBody>
                                        </Card>
                                        <Card>
                                            <CardImg
                                            alt="Card image cap"
                                            src="https://picsum.photos/318/180"
                                            top
                                            width="100%"
                                            />
                                            <CardBody color="danger"
                                        outline>
                                            <CardTitle tag="h5">
                                                FUTURE
                                            </CardTitle>
                                            <CardSubtitle
                                                className="mb-2 text-muted"
                                                tag="h6"
                                            >
                                                Card subtitle
                                            </CardSubtitle>
                                            <CardText>
                                                This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                                            </CardText>
                                            <Button>
                                                Button
                                            </Button>
                                            </CardBody>
                                            </Card>
                                        </CardGroup>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId='3'>
                    <Row>
                        <Col 
                            md={{ offset: 2, size: 8}}
                            sm="12"><br/>
                            <h4>View Available Courses</h4><br/>
                            <CourseList catalog={catalog}/>
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </Container>
    )
}

export default Dashboard;