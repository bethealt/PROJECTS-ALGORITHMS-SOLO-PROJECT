import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Container, Table, ButtonGroup, Button} from 'reactstrap';
import {Link, navigate} from '@reach/router';
import io from 'socket.io-client';

const UserList = (props) => {
    const {setAdmin, setLoaded, users, setUsers} = props;
    const [admins, setAdmins] = useState([]);
    const [socket] = useState(() => io(':8000'));
    //passes a callback function to initialize the socket 
    //setSocket is not required as the socket state will not be updated

    useEffect(() => {
        console.log(`Inside {UL} useEffect for socket.io-client`)
        socket.on('connect', () => {
            console.log(`Connected to the server via socket: ${socket.id}`);
            //confirms connection to and comuunication with the server
        })
        socket.on('user_authorized', (authUserObj) => {
            console.log('in authorized_user:');
            console.log(authUserObj);
            console.log(admins);
            setAdmins((currentAdmins) => [...admins, authUserObj]);
            //passes the current value of the admin array as a parameter for the function
            //returns brand new array for the setter to use
            ///by default, the array is empty due to when it was created and saved into state
        })
        socket.on('user_updated', (updUserObj) => {
            console.log('in updated_user:');
            console.log(updUserObj);
            console.log(users);
            setUsers((currentUsers) => [...users, updUserObj]);
        })
        socket.on('user_deleted', (delUserId) => {
            console.log('in deleted_user:');
            console.log(delUserId);
            console.log(users);
            setUsers((currentUsers) => {
            let filteredUsers = currentUsers.filter(oneUserObj => oneUserObj._id !== delUserId);
            return filteredUsers});
            //performs work inside the setter method to have access to the current users array value
            //returns the filtered array value to be used by the setUsers setter method
        })
        return () => socket.disconnect();
        //best practice: socket client disconnects when the component is closed
        //return from useEffect will only run when the component is closed
        //include the dependency array to enusure that the useEffect continues to run

    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/users`,
        {withCredentials: true})
            .then((res) => {
                console.log('inside read all users');
                console.log(res.data);
                setUsers(res.data);
                setLoaded(true);
            })
            .catch((err) => console.log(err));
    }, []);

    const authorizeUser = (_id) => {
        axios.get(`http://localhost:8000/api/users/:${_id}`,
        {withCredentials: true})
            .then((res) => {
                setAdmin(true);
                setAdmins([...admins, res.data]);
                console.log('Authorizing an existing user:');
                console.log(res.data);
                socket.emit("authorize_user", _id);
                socket.disconnect();
            })
            .catch((err) => console.log(err));
    }

    const removeFromDom = (_id) => {
        setUsers(users.filter(user => user._id !== _id));
    }

    const deleteUser = (_id) => {
        axios.delete(`http://localhost:8000/api/users/:${_id}`,
        {withCredentials: true})
            .then(res => {
                removeFromDom(_id)
                console.log('Deleting an existing user:')
                console.log(res.data);
                socket.emit("deleted_user", _id)
                socket.disconnect();
                navigate('/admin');
                //successfully deletes an existing user
                //notifies the server so that it sends a message and data to all listeners
                //sends the user_id to the socket.io server
                //disconnects from the server before navigating away
            })
            .catch(err => console.log(err));
    }

    return (
        <Container>
            <Table hover>
                <thead>
                    <tr>
                        <th data-type='string'>First Name</th>
                        <th data-type='string'>Last Name</th>
                        <th data-type='string'>Email</th>
                        <th data-type='number'>Zip Code</th>
                        <th data-type='boolean'>Admin Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users
                        .sort((a, b) => a.lastName > b.lastName ? 1 : -1)
                        .map((user, _id) => {
                            return(
                                <tr key={_id}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.emailAddress}</td>
                                    <td>{user.zipCode}</td>
                                    <td>{user.admin}</td>
                                    <td>
                                    <ButtonGroup>
                                        <Link to={`/users/${user._id}`}><Button color='secondary' outline>View</Button></Link>
                                        <Button color='secondary' outline onClick={authorizeUser}>Authorize</Button>
                                        <Button color='secondary' outline onClick={deleteUser}>Delete</Button>
                                    </ButtonGroup>
                                    </td>
                                </tr>
                        )})}
                </tbody>
            </Table>
        </Container>
    )
}

export default UserList;