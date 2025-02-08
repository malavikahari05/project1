const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse the body of the request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (like your HTML form)
app.use(express.static(path.join(__dirname, 'public')));

// Handle form submission
app.post('/submit', (req, res) => {
    const formData = req.body;

    // Save the form data to a local file (you can change the file name and path as needed)
    fs.appendFile('user_data.txt', JSON.stringify(formData) + '\n', (err) => {
        if (err) {
            console.error('Error saving data', err);
            return res.status(500).send('Error saving data');
        }

        console.log('Data saved');
        res.send('Form data saved successfully!');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
