import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;
const GEMINI_API = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;




app.post('/gemini', async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await axios.post(
            GEMINI_API,
            {
                contents: [{ parts: [{ text: prompt }] }]
            },
            { headers: { 'Content-Type': 'application/json' } }
        );

        const result = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
        res.json({ result });

    } catch (error) {
        console.error("Gemini API Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to connect to Gemini" });
    }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
