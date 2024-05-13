import React from "react";
import { useNavigate } from 'react-router-dom';
import isAuth from '../utils/isAuth';
import Button from 'react-bootstrap/Button';


export default function AppLogout() {

    const history = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
        history('/');
    };

    const handleBackToLogin = () => {
        history("/login");
    };

    React.useEffect(() => {
        handleLogout();
    }, []);

    if (!isAuth()) {
        return (
            <div>
            <h1>you are not Login</h1>
            <Button onClick={handleBackToLogin}>Back to Login</Button>
            </div>
        );
    } 

    return <h1>Success Logout</h1>
}

