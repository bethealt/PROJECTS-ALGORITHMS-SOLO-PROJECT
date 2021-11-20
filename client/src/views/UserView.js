import React, {useEffect} from 'react';
import axios from 'axios';
import {Container, ListGroup, ListGroupItem, ListGroupItemHeading} from 'reactstrap';

const UserView = (props) => {
    const {_id, 
        firstName, setFirstName, 
        lastName, setLastName, 
        emailAddress, setEmailAddress, 
        birthDate, setBirthDate, 
        zipCode, setZipCode, 
        password, setPassword, 
        errors, setErrors, 
        user, setUser} = props;

    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${_id}`,
        {withCredentials: true})
            .then(res => {
                console.log('in user details:')
                console.log(res.data);
                {/*setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
                setEmailAddress(res.data.emailAddress);
                setBirthDate(res.data.birthDate);
                setZipCode(res.data.zipCode);
                setPassword(res.data.password);*/}
                setUser(res.data);
            })
            .catch(err => console.log(err))
    }, [])

    return(
        <Container>
            <h4>User Details</h4>
            <ListGroup flush>
                <ListGroupItemHeading>FIRST NAME: {user.firstName}</ListGroupItemHeading>
                <ListGroupItem>LAST NAME: {user.lastName}</ListGroupItem>
                <ListGroupItem>EMAIL ADDRESS: {user.emailAddress}</ListGroupItem>
                <ListGroupItem>BIRTH DATE: {user.birthDate}</ListGroupItem>
            </ListGroup>
        </Container>
    )

}

export default UserView;