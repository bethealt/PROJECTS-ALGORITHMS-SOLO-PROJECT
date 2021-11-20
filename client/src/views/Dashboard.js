import React, {useState} from 'react';
import {Container, Nav, NavItem, NavLink, TabContent, TabPane, Row, Col} from 'reactstrap';
import classnames from 'classnames';

import CourseHistory from '../components/CourseHistory';
import CourseList from '../components/CourseList';
import UserUpdate from '../components/UserUpdate';

const Dashboard = (props) => {
    const {catalog, user, setUser, errors, setErrors} = props;
    const [activeTab, setActiveTab] = useState('1');
    
    const toggle = (tab) => {
        if(activeTab !== tab) setActiveTab(tab);
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
                        onClick={() => {toggle('3'); }}>
                        CATALOG
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId='1'>
                    <Row>
                        <Col 
                            md={{ offset: 1, size: 10}}
                            sm="12"><br/>
                            <h4>Manage Your Profile</h4><br/>
                            <UserUpdate />
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId='2'>
                    <Row>
                        <Col 
                            md={{ offset: 1, size: 10}}
                            sm="12"><br/>
                            <h4>Manage Your Courses</h4><br/>
                            <CourseHistory />
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId='3'>
                    <Row>
                        <Col 
                            md={{ offset: 0, size: 12}}
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