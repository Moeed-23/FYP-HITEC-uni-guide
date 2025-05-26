const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const FASTAPI_URL = process.env.FASTAPI_URL || "http://127.0.0.1:8000";

router.post('/', async (req, res) => {
    try {
        const response = await fetch(`${FASTAPI_URL}/ask`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        res.status(response.status).json(data);
    } catch (err) {
        console.error("Error proxying to FastAPI:", err);
        res.status(500).json({ error: "Failed to get response from assistant" });
    }
});

module.exports = router;
