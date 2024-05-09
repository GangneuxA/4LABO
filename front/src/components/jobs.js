import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import React from "react";

export default function AppJobs() {
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
            const response = await fetch('http://localhost:5000/users/job', {
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


            const response = fetch('http://localhost:5000/job', {
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

    useEffect(() => {
        handleGetJobs();
    }, []);

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
