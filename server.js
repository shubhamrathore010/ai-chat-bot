require("dotenv").config(); // For storing API key in .env
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 5000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; 


console.log("Gemini API Key: ", GEMINI_API_KEY);


app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.post("/chat", async (req, res) => {
    console.log("Request Body:", req.body);  // Debugging

        const userMessage = req.body.message;
      
        if (!userMessage) {
            return res.status(400).json({ error: "Message is required" });
        }
        
        try {
            const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
         
         

    const result = await model.generateContent(userMessage);
    console.log("Gemini API Response:", result);  // Debugging


    const botResponse = result.response.text(); // Extract the generated text

    res.json({ reply: botResponse });

} catch (error) {
    console.error("Error calling Gemini API:", error);

    if (error.response) {
        console.error("API Error Response:", error.response.data);
    } else if (error.request) {
        console.error("No response received from API:", error.request);
    } else {
        console.error("Unexpected Error:", error.message);
    }
    res.status(500).json({ reply: "Oops! Something went wrong." });
}
});

    // console.log("Gemini API Key:", GEMINI_API_KEY);  // Add this line to log the API key


app.listen(PORT, () => 
    console.log(`Server running on http://localhost:${PORT}`));
