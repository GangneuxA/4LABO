import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import React from "react";
import isAdmin from '../utils/isAdmin';
import { useNavigate } from 'react-router-dom';


export default function AppAdmin() {

    const history = useNavigate();

    const [usersData, setUsersData] = useState([])
    const [jobsData, setJobsData] = useState([])
    const [name, setName] = useState('');
    const [companie, setCompanie] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
    }

    const handleGetUsers = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL_BACK}users`, {
                method: 'GET',
                headers: headers
            });

            const data = await response.json();
            setUsersData(data)
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire:', error);
        }
    };

    const handleGetJobs = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL_BACK}job`, {
                method: 'GET',
                headers: headers
            });

            const data = await response.json();
            setJobsData(data)
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire:', error);
        }
    };

    const handleDeleteJob = async (jobID) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL_BACK}job/${jobID}`, {
                method: 'DELETE',
                headers: headers
            });

            window.location.reload();
        } catch (error) {
            console.error('Erreur lors de la suppresion:', error);
        }
    };

    const handleDeleteUser = async (userID) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL_BACK}admin/${userID}`, {
                method: 'DELETE',
                headers: headers
            });

            window.location.reload();
        } catch (error) {
            console.error('Erreur lors de la suppresion:', error);
        }
    };

    const handleUpdateUser = async (userID) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL_BACK}admin/${userID}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify({
                    name: name,
                    companie: companie,
                    email: email,
                    role: role
                })
            });

            window.location.reload();
        } catch (error) {
            console.error('Erreur lors de la suppresion:', error);
        }
    };

    useEffect(() => {
        handleGetUsers();
        handleGetJobs();
    }, []);

    const handleBackToHome = () => {
        history("/");
    };

    if (!isAdmin()) {
        return (
            <div>
            <h1>You are not Admin</h1>
            <Button onClick={handleBackToHome}>Back to Home</Button>
            </div>
        );
    }

    return(
        <div>
            <section>
            <Container fluid>
                <div className='title-holder'>
                    <h2>user management</h2>
                    <div className='subtitle'>
                        update and delete
                    </div>
                </div>
                <div>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>name</th>
                        <th>email</th>
                        <th>companie</th>
                        <th>role</th>
                    </tr>
                    </thead>
                    <tbody>
                    {usersData.map((user) => ( 
                        <tr>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.companie}</td>
                            <td>{user.role}</td>
                            <td>
                                {selectedUserId === user.id && showForm ? (
                                    <>
                                        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                                        <input placeholder="Companie" value={companie} onChange={(e) => setCompanie(e.target.value)} />
                                        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        <input placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} />
                                        <Button variant="success" onClick={() => handleUpdateUser(user.id)}>Save</Button>
                                    </>
                                ) : (
                                    <Button variant="info" onClick={() => {
                                        setShowForm(true);
                                        setSelectedUserId(user.id);
                                        setName(user.name);
                                        setCompanie(user.companie);
                                        setEmail(user.email);
                                        setRole(user.role);
                                    }}>Update</Button>
                                )}
                                <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                            </td>
                        </tr>
                        
                    ))}
                    </tbody>
                </Table>
                </div>
            </Container>
        </section>
        <section>
            <Container fluid>
                <div className='title-holder'>
                    <h2>job management</h2>
                    <div className='subtitle'>
                        delete
                    </div>
                </div>
                <div>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Repo</th>
                        <th>Status</th>
                        <th>UserID</th>
                    </tr>
                    </thead>
                    <tbody>
                    {jobsData.map((job) => ( 
                        <tr>
                            <td>{job.id}</td>
                            <td>{job.repo}</td>
                            <td>{job.status}</td>
                            <td>{job.user}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleDeleteJob(job.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                </div>
                
            </Container>
        </section>
        </div>
    )
}