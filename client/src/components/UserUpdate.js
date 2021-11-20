import React, {useState, useEffect} from 'react';
import axios from 'axios';
import io from 'socket.io-client';

//components
import UserForm from '../components/UserForm';

const UpdateUser = (props) => {
    const {_id, 
        firstName, setFirstName, 
        lastName, setLastName, 
        emailAddress, setEmailAddress, 
        birthDate, setBirthDate, 
        zipCode, setZipCode, 
        password, setPassword, 
        errors, setErrors, 
        user, setUser} = props;
    const [userUpdConfirm, setUserUpdConfirm] = useState('');
    const [userUpdFail, setUserUpdFail] = useState('');
    const [socket] = useState(() => io(':8000'));
    //passes a callback function to initialize the socket
    //setSocket is omitted as the socket state will not be updated

    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${_id}`,
        {withCredentials: true})
            .then(res => {
                console.log('in update user:')
                console.log(res.data);
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
                setEmailAddress(res.data.emailAddress);
                setBirthDate(res.data.birthDate);
                setZipCode(res.data.zipCode);
                setPassword(res.data.password);
            })
            .catch(err => console.log(err))
    }, [])

    const update = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/users/update/:${_id}`, user,
            {withCredentials: true})
            //ensures that cookies are sent with each request; 
            //Middleware verifies who is logged in
        .then((res) => {
            console.log('Updating user:')
            console.log(res.data);
            socket.emit("updated_user", res.data);
            socket.disconnect();
            setUser({
                firstName: '',
                lastName: '',
                emailAddress: '',
                birthDate: '',
                zipCode: '',
                password: '',
                confirmPassword: ''
            });
            setUserUpdConfirm("User update successful");
            setErrors({});
        })
        .catch(err => {
            console.log('in user update:')
            console.log(err);
            console.log(err.response.data);
            setErrors(err.response.data.errors);
            setUserUpdFail("Update failed: please review the form and resubmit.")
        })
    };
        
    

    return(
        <div>
            <UserForm
                onSubmitHandler={update}
                alertConfirm={userUpdConfirm}
                alertFail={userUpdFail}
                errors={errors}
                firstName={firstName}
                lastName={lastName}
                emailAddress={emailAddress}
                birthDate={birthDate}
                zipCode={zipCode}
                password={password}
                />
        </div>
    )

}

export default UpdateUser;

