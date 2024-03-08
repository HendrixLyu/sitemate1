// frontend page -  React 

import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

const endpoint = {
  getAll: `${BASE_URL}/issues`,
  getById: `${BASE_URL}/issues`,
  post: `${BASE_URL}/issues`,
  put: `${BASE_URL}/issues`,
  delete: `${BASE_URL}/issues`,
};

function App() {
  const [issues, setIssues] = useState([]);
  const [newIssue, setNewIssue] = useState({ id: '', title: '', description: '' });
  const [idToDelete, setIdToDelete] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const response = await axios.get(endpoint.getAll);
      setIssues(response.data);
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post(endpoint.post, newIssue);
      setMessage('Issue created successfully.');
      fetchIssues();
    } catch (error) {
      console.error('Error creating issue:', error);
      setMessage('Error creating issue.');
    }
  };

  const handleRead = async (id) => {
    try {
      const response = await axios.get(`${endpoint.getById}/${id}`);
      console.log('Read issue:', response.data);
      setMessage(`Read issue: ${JSON.stringify(response.data)}`);
    } catch (error) {
      console.error('Error reading issue:', error);
      setMessage('Error on reading issue.');
    }
  };

  const handleUpdate = async (id, updatedIssue) => {
    try {
      await axios.put(`${endpoint.put}/${id}`, updatedIssue);
      fetchIssues();
      setMessage('Issue updated successfully.');
    } catch (error) {
      console.error('Error updating issue:', error);
      setMessage('Error updating issue.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${endpoint.delete}/${id}`);
      fetchIssues();
      setMessage('Issue deleted successfully.');
    } catch (error) {
      console.error('Error deleting issue:', error);
      setMessage('Error deleting issue.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewIssue(prevIssue => ({
      ...prevIssue,
      [name]: value
    }));
  };

  const handleChangeIdToDelete = (e) => {
    setIdToDelete(e.target.value);
  };

  return (
    <div className="App">
      <h1>Hendrix Quiz</h1>
      <div>
        <h2>Issues Table</h2>
        <ul>
          {issues.map(issue => (
            <li key={issue.id}>
              {issue.title} - {issue.description}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Create Issue</h2>
        <input type="text" name="id" placeholder="ID" value={newIssue.id} onChange={handleChange} />
        <input type="text" name="title" placeholder="Title" value={newIssue.title} onChange={handleChange} />
        <input type="text" name="description" placeholder="Description" value={newIssue.description} onChange={handleChange} />
        <button onClick={handleCreate}>Create</button>
      </div>
      <div>
        <h2>Read Issue</h2>
        <input type="text" placeholder="ID" onChange={handleChangeIdToDelete} />
        <button onClick={() => handleRead(idToDelete)}>Read</button>
      </div>
      <div>
        <h2>Update Issue</h2>
        <input type="text" placeholder="ID" onChange={handleChangeIdToDelete} />
        <input type="text" name="title" placeholder="New Title" onChange={handleChange} />
        <input type="text" name="description" placeholder="New Description" onChange={handleChange} />
        <button onClick={() => handleUpdate(idToDelete, newIssue)}>Update</button>
      </div>
      <div>
        <h2>Delete Issue</h2>
        <input type="text" placeholder="ID" onChange={handleChangeIdToDelete} />
        <button onClick={() => handleDelete(idToDelete)}>Delete</button>
      </div>
      <div style={{ border: '2px solid red' }}>{message}</div>
    </div>
  );
}

export default App;
