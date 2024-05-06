import React from "react";
import { useNavigate } from 'react-router-dom';

export default function AppLogout() {

    const history = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
        history('/');
    };
    
    React.useEffect(() => {
        handleLogout();
    }, []); 

    return <h1>Success Logout</h1>
}

