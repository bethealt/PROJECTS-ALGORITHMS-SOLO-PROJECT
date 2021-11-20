import React, {useState} from 'react';
import {Container, Nav, NavItem, NavLink, TabContent, TabPane, Row, Col} from 'reactstrap';
import classnames from 'classnames';

import CourseList from '../components/CourseList';
import CourseForm from '../components/CourseForm';
import UserList from '../components/UserList';

const Admin = (props) => {
    const {setAdmin, catalog, setCatalog, errors, setErrors, users, setUsers,
    } = props;
    const [loaded, setLoaded] = useState(false);
    const [activeTab, setActiveTab] = useState('1');

    const toggle = (tab) => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    return (
        <Container>
        <Nav tabs>
            <NavItem>
                <NavLink
                    className={classnames({active: activeTab === '1'})}
                    onClick={() => {toggle('1'); }}>
                   USERS
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    className={classnames({active: activeTab === '2'})}
                    onClick={() => {toggle('2'); }}>
                    CATALOG
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    className={classnames({active: activeTab === '3'})}
                    onClick={() => {toggle('3'); }}>
                    ADD
                </NavLink>
            </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
            <TabPane tabId='1'>
                <Row>
                    <Col 
                        md={{ offset: 1, size: 10}}
                        sm="12"><br/>
                        <h4>Manage Users</h4><br/>
                        <UserList 
                            setAdmin={setAdmin}
                            setLoaded={setLoaded}
                            users={users}
                            setUsers={setUsers}
                        />
                    </Col>
                </Row>
            </TabPane>
            <TabPane tabId='2'>
                <Row>
                    <Col 
                        md={{ offset: 0, size: 12}}
                        sm="12"><br/>
                        <h4>Manage Courses</h4><br/>
                        <CourseList 
                            setLoaded={setLoaded}
                            catalog={catalog}
                            setCatalog={setCatalog}
                        />
                    </Col>
                </Row>
            </TabPane>
            <TabPane tabId='3'>
                <Row>
                    <Col 
                        md={{ offset: 1, size: 10}}
                        sm="12"><br/>
                        <h4>Add a Course</h4><br/>
                        <CourseForm 
                            errors={errors}
                            setErrors={setErrors}
                            setCatalog={setCatalog}
                        />
                    </Col>
                </Row>
            </TabPane>
        </TabContent>
    </Container>
    )
}

export default Admin;