import React from 'react';
import {Container} from 'reactstrap';

import UserForm from '../components/UserForm';

const ViewUser = (props) => {
    const {errors} = props;
    
    return(
        <Container>
            <h4>User Details</h4>
            <UserForm errors={errors}/>
        </Container>
    )

}

export default ViewUser;