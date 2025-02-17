require("dotenv").config(); // For storing API key in .env
const express = require("express");
const cors = require("cors");
const axios = require("axios");  

const app = express();
const PORT = process.env.PORT || 5000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; 

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.post("/chat", async (req, res) => {
        const userMessage = req.body.message;

        if (!userMessage) {
            return res.status(400).json({ error: "Message is required" });
        }

        try {
            const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, 
                {
                    contents: [{ parts: [{ text: userMessage }] }]
                },
                {   headers: { "Content-Type": "application/json" },
            });

            const botResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";
            res.json({ reply: botResponse });


        } catch (error) {
            console.error("Error calling Gemini API:", error);
            res.status(500).json({ reply: "Oops! Something went wrong." });
        }
    });

app.listen(PORT, () => 
    console.log(`Server running on http://localhost:${PORT}`));
