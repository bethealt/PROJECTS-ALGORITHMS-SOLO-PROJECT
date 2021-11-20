const logout = (e, userLogin, setUserLogin) => {
    e.prevent.Default();
    console.log(userLogin);
    axios.post(`http://localhost:8000/api/users/logout`, userLogin,
    {withCredentials: true})
        .then((res) => {
            console.log('Logging out user:');
            console.log(res.data);
            socket.emit("logout_user", res.data);
            socket.disconnect();
            setUserLoggedIn(!userLoggedIn);
                setUserLogin({
                    emailAddress: '',
                    password:''
                    
            })
            setErrors({});
            navigate('/logout');
        })
        .catch((err) => {
            console.log('in user logout');
            console.log(err);
            console.log(err.response.data);
            setErrors(err.response.data.errors);
            navigate('/login');
        });   
};