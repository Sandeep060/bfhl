const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// POST endpoint
app.post('/bfhl', (req, res) => {
    try {
        const { data, file_b64 } = req.body;

        // Validate input
        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: 'Invalid data format' });
        }

        // Process data
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item));
        const highestLowercase = alphabets.filter(char => char === char.toLowerCase()).sort().slice(-1);
        
        // File handling
        let fileValid = false;
        let fileMimeType = null;
        let fileSizeKb = 0;

        if (file_b64) {
            const buffer = Buffer.from(file_b64, 'base64');
            fileValid = true;
            fileMimeType = 'image/png'; // Example MIME type
            fileSizeKb = (buffer.length / 1024).toFixed(2);
        }

        // Construct user_id
        const user_id = "john_doe_17091999"; // Example user_id

        // Response
        return res.status(200).json({
            is_success: true,
            user_id: user_id,
            email: "john@xyz.com",
            roll_number: "ABCD123",
            numbers: numbers,
            alphabets: alphabets,
            highest_lowercase_alphabet: highestLowercase,
            file_valid: fileValid,
            file_mime_type: fileMimeType,
            file_size_kb: fileSizeKb
        });
    } catch (error) {
        console.error('Error processing request:', error);
        return res.status(500).json({ is_success: false, message: 'Internal Server Error' });
    }
});

// GET endpoint
app.get('/bfhl', (req, res) => {
    try {
        return res.status(200).json({ operation_code: 1 });
    } catch (error) {
        console.error('Error processing request:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
