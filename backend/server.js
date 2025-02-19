import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;
// Configure CORS to allow requests from your frontend
app.use(
  cors({
    origin: "http://localhost:3000/", // Allow only your frontend
    credentials: true, // Allow cookies (if needed)
  })
);
// Endpoint to fetch user pages
app.post('/api/user-pages', async (req, res) => {
  const { accessToken } = req.body;
  try {
    const response = await axios.get(`https://graph.facebook.com/v12.0/me/accounts?access_token=${accessToken}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pages' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});