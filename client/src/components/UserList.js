import React from 'react';
import {Container, Table, Button} from 'reactstrap';
import {Link} from '@reach/router';

const UserList = (props) => {
    const {users} = props;

    const authorizeUser = (e) => {

    };

    const deleteUser = (e) => {

    };

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