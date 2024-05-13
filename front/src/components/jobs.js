import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import React from "react";
import isAuth from '../utils/isAuth';
import { useNavigate } from 'react-router-dom';

export default function AppJobs() {

    const history = useNavigate();

    const [jobsData, setJobsData] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [repo, setRepo] = useState('')
    const [images, setImages] = useState('')
    const [command, setCommand] = useState('')

    const headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
    }

    const handleGetJobs = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL_BACK}users/job`, {
                method: 'GET',
                headers: headers
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la soumission du formulaire');
            }

            const data = await response.json();
            setJobsData(data); 
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire:', error);
        }
    };

    const splitCommands = (commandsString) => {
        return commandsString.split(',').map(command => command.trim());
    };

    const handleCreateJob = async (event) => {
        event.preventDefault();

        try {


            const response = fetch(`${process.env.REACT_APP_URL_BACK}job`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    repo: repo,
                    images: images,
                    commands: splitCommands(command)
                })
            });

            window.location.reload();
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire:', error);
        }
    };

    const HandleDownload = async (logs) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL_BACK}download/${logs}`, {
                method: 'GET',
                headers: headers
            });

            if (!response.ok) {
                throw new Error('Échec du téléchargement');
            }
    
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
    
            const a = document.createElement('a');
            a.href = url;
            a.download = `logs_${logs}.txt`; 
            document.body.appendChild(a); 
            a.click(); 
            document.body.removeChild(a); 
            window.URL.revokeObjectURL(url); 
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire:', error);
        }
    };

    useEffect(() => {
        handleGetJobs();
    }, []);

    const handleBackToLogin = () => {
        history("/login");
    };

    if (!isAuth()) {
        return (
            <div>
            <h1>you are not Login</h1>
            <Button onClick={handleBackToLogin}>Back to Login</Button>
            </div>
        );
    }

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Repo</th>
                    <th>Status</th>
                    <th>Commandes</th>
                </tr>
                </thead>
                <tbody>
                {jobsData.map((job) => ( 
                    <tr>
                        <td>{job.id}</td>
                        <td>{job.repo}</td>
                        <td>{job.status}</td>
                        <td>{job.commands.join(', ')}</td>
                        {job.status === "validate" && (
                            <td>
                                <Button variant="success" onClick={() => HandleDownload(job.logs)}>Download</Button>
                            </td>
                        )}
                    </tr>
                ))}
                </tbody>
            </Table>
            {!showForm && (
            <Button variant="info" onClick={() => setShowForm(true)}>Create Job</Button>
            )}
            {showForm && (
                <>
                    <input placeholder="repository Github link" type="text" value={repo} onChange={(e) => setRepo(e.target.value)} />
                    <input placeholder="https://hub.docker.com/" type="text" value={images} onChange={(e) => setImages(e.target.value)} />
                    <input placeholder="command separe by ','" type="text" value={command} onChange={(e) => setCommand(e.target.value)} />
                    <Button variant="info" onClick={handleCreateJob}>Save</Button>
                </>
            )}
        </div>
        

    );
}
