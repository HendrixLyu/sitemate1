// client end

const fetch = require('node-fetch');

const Default_Url = 'http://localhost:4000';

// CRUD functions as well

async function createIssue(issue) {
    const response = await fetch(`${Default_Url}/issues`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(issue)
    });
    const data = await response.json();
    console.log('Created issue:', data);
}

async function readIssue(id) {
    const response = await fetch(`${Default_Url}/issues/${id}`);
    const data = await response.json();
    console.log('Read issue:', data);
}

async function updateIssue(id, issue) {
    const response = await fetch(`${Default_Url}/issues/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(issue)
    });
    const data = await response.json();
    console.log('Updated issue:', data);
}

async function deleteIssue(id) {
    const response = await fetch(`${Default_Url}/issues/${id}`, {
        method: 'DELETE'
    });
    const data = await response.json();
    console.log('Deleted issue:', data);
}

// Example about some data schema ...
createIssue({ id: 3, title: 'Issue 3', description: 'Description for issue 3' });
readIssue(1);
updateIssue(2, { title: 'Updated Issue 2' });
deleteIssue(3);
