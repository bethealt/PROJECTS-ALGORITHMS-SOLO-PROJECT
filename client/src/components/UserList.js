import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Container, Table, Button} from 'reactstrap';
import {Link} from '@reach/router';
import io from 'socket.io-client';

const UserList = (props) => {
    const {dbHost, setAdmin, setLoaded, users, setUsers} = props;
    const [socket] = useState(() => io(':8000'));
    //passes a callback function to initialize the socket
    //setSocket is not required as the socket state will not be updated

    useEffect(() => {
        //confirms connection to and comuunication with the server
        console.log(`Inside {UL} useEffect for socket.io-client`)

        socket.on('connect', () => {
            console.log(`Connected to the server via socket: ${socket.id}`);
        })
    })

    useEffect(() => {
        axios.get(`http://${dbHost}/api/users`,
        {withCredentials: true})
            .then((res) => {
                console.log(res);
                setUsers(res.data);
                setLoaded(true);
            })
            .catch((err) => console.log(err));
    }, [setAdmin, setLoaded, setUsers, dbHost]);

    const authorizeUser = (_id) => {
        setAdmin(true);
    }

    const removeFromDom = (_id) => {
        setUsers(users.filter(user => user._id !== _id));
    }

    const deleteUser = (_id) => {
        axios.delete(`http://${dbHost}/api/users/${_id}`,
        {withCredentials: true})
            .then(res => {removeFromDom(_id)})
            .catch(err => console.log(err));
    }

    return (
        <Container>
            <Table hover>
                <thead>
                    <tr>
                        <th data-type='string'>First Name</th>
                        <th data-type='string'>Last Name</th>
                        <th data-type='date'>Email</th>
                        <th data-type='string'>Zip Code</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users
                        .slice().sort((a, b) => a.lastName > b.lastName ? 1 : -1)
                        .map((user, _id) => {
                            return(
                                <tr key={_id}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.emailAddress}</td>
                                    <td>{user.zipcode}</td>
                                    <td>
                                        <Link to={`/users/${user._id}`}><Button>View</Button></Link>&nbsp;&nbsp;
                                        <Button onClick={authorizeUser}>Authorize</Button>&nbsp;&nbsp;
                                        <Button onClick={deleteUser}>Delete</Button>
                                    </td>
                                </tr>
                        )})}
                </tbody>
            </Table>
        </Container>
    )
}

export default UserList;