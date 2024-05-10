import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from "react";
import isAuth from '../utils/isAuth';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';

import img1 from '../assets/images/user.jpg';

export default function AppProfile() {

    

    const history = useNavigate();

    const [userData, setUserData] = useState('');
    const [name, setName] = useState('');
    const [companie, setCompanie] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showForm, setShowForm] = useState(false);

    const headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem("accessToken")
    }

    const handleGetMe = async () => {

        try {
            const response = await fetch('http://localhost:5001/getme', {
                method: 'GET',
                headers: headers
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la soumission du formulaire');
            }

            const data = await response.json();
            console.log(data)
            setUserData(data);

        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire:', error);
        }
    };

    const handleUpdateUser = async () => {
        try {
            const response = await fetch('http://localhost:5001/users', {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify({
                    name: name,
                    companie: companie,
                    email: email,
                    password: password
                })
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour de l\'utilisateur');
            }

            window.location.reload();

        } catch (error) {
            console.error("Update user error:", error);
        }
    };

    const handleDeleteUser = async () => {

        try {
            await fetch('http://localhost:5001/users', {
                method: 'DELETE',
                headers: headers
            });


            localStorage.clear();
            history("/");
            window.location.reload();

        } catch (error) {
            console.error("Delete user error:", error);
        }
    };

    useEffect(() => {
        handleGetMe();
      }, []);

    const handleBackToLogin = () => {
        history("/login");
    };

    if (!isAuth()) {
        return (
            <div>
            <h1>You're not Login</h1>
            <Button onClick={handleBackToLogin}>Login</Button>
            </div>
        );
    }

    return(
        <section>
            <Container fluid>
                <div className='title-holder'>
                    <h2>Profile</h2>
                    <div className='subtitle'>
                        You can edit your profile 
                    </div>
                </div>
            </Container>
            <Container fluid>
                <div>
                    <Col>
                        <Image src={img1} />
                        <p>Name: {userData.name}</p>
                        <p>Companie: {userData.companie}</p>
                        <p>Email: {userData.email}</p>
                        <p>Role: {userData.role}</p>
                        {!showForm && (
                            <Button variant="info" onClick={() => setShowForm(true)}>Update</Button>
                        )}
                        {showForm && (
                            <>
                                <input placeholder="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                <input placeholder="companie" type="text" value={companie} onChange={(e) => setCompanie(e.target.value)} />
                                <input placeholder="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <input placeholder="password" type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <Button variant="info" onClick={handleUpdateUser}>Save</Button>
                            </>
                        )}
                        <Button onClick={handleDeleteUser} variant="danger">Delete</Button>
                    </Col>
                </div>
            </Container>
        </section>
    )
}