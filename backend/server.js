require('dotenv').config(); // Load .env variables
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const HF_TOKEN = process.env.HF_TOKEN;
const HF_API_URL = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1';

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
      HF_API_URL,
      { inputs: `[INST] ${userMessage} [/INST]` },
      {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const aiReply = response.data[0]?.generated_text || "No response from model.";
    res.json({ reply: aiReply });
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get response from Hugging Face." });
  }
});

app.listen(3000, () => {
  console.log("AI Chat backend running at http://localhost:3000");
});
