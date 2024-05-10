import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import isAuth from '../utils/isAuth';


export default function AppLogin() {

    const history = useNavigate();

    const headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json',
    }
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5001/login', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la soumission du formulaire');
            }

            const data = await response.json();
            localStorage.setItem("accessToken", data.access_token);
            localStorage.setItem("role", data.role);

            setEmail('');
            setPassword('');
            history('/');
            window.location.reload();
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire:', error);
        }
    };


    const handleBackToHome = () => {
        history("/");
    };

    if (isAuth()) {
        return (
            <div>
            <h1>Already Login</h1>
            <Button onClick={handleBackToHome}>Back to Home</Button>
            </div>
        );
    }

    return (
        <Container>
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}