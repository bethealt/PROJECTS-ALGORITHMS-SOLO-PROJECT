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
        axios.get(`http://localhost:8000/api/users/${_id}`, user,
        {withCredentials: true})
            .then(res => {
                console.log('in user details:')
                console.log(res.data);
                setFirstName(res.data.firstName)
                setLastName(res.data.lastName)
                setEmailAddress(res.data.emailAddress)
                setBirthDate(res.data.birthDate)
                setZipCode(res.data.zipCode)
                setPassword(res.data.password)
            })
            .catch(err => console.log(err))
    }, [])

    return(
        <Container>
            <h4>User Details</h4><br/>
            <ListGroup flush>
                <ListGroupItemHeading>First Name: {props.firstName}</ListGroupItemHeading>
                <ListGroupItem>Last Name: {props.lastName}</ListGroupItem>
                <ListGroupItem>Email Address: {props.emailAddress}</ListGroupItem>
                <ListGroupItem>Birthdate: {props.birthDate}</ListGroupItem>
                <ListGroupItem>Zip Code: {props.zipCode}</ListGroupItem>
            </ListGroup>
        </Container>
    )
}

export default UserView;