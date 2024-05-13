import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import isAuth from '../utils/isAuth';

export default function AppRegister() {
    
    const history = useNavigate();

    const headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json',
    }
    const [name, setName] = useState('');
    const [companie, setCompanie] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleRegister = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_URL_BACK}users`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    name: name,
                    companie: companie,
                    email: email,
                    password: password
                })
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la soumission du formulaire');
            }

            setName('');
            setCompanie('');
            setEmail('');
            setPassword('');
            history('/login');
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
            <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="name" 
                        placeholder="Enter name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCompanie">
                    <Form.Label>Companie</Form.Label>
                    <Form.Control 
                        type="companie" 
                        placeholder="Enter companie" 
                        value={companie} 
                        onChange={(e) => setCompanie(e.target.value)} 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
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