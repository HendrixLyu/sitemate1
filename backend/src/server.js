// server end

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 4000; 

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 
}

app.use(bodyParser.json());
app.use(cors(corsOptions));

let issues = [
    { id: 1, title: 'Issue 1', description: 'Issue_1 Description' },
    { id: 2, title: 'Issue 2', description: 'Issue_2 Description' },
    { id: 3, title: 'Issue 3', description: 'Issue_3 Description' },
];

// CRUD functions:
// Create
app.post('/issues', (req, res) => {
    const newIssue = req.body;
    issues.push(newIssue);
    console.log('New issue created:', newIssue);
    res.json(newIssue);
});

// Read
app.get('/issues/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const issue = issues.find(issue => issue.id === id);
    console.log(`Read issue ${id}:`, issue);
    res.json(issue);
});

// Update
app.put('/issues/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedIssue = req.body;
    issues = issues.map(issue => {
        if (issue.id === id) {
            return { ...issue, ...updatedIssue };
        }
        return issue;
    });
    console.log(`Updated issue ${id}:`, updatedIssue);
    res.json(updatedIssue);
});

// Delete
app.delete('/issues/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const deletedIssue = issues.find(issue => issue.id === id);
    issues = issues.filter(issue => issue.id !== id);
    console.log(`Deleted issue ${id}:`, deletedIssue);
    res.json(deletedIssue);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
