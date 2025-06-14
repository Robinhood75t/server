const express = require('express');
const cors = require('cors');
require('dotenv').config();
const router = require('./routes');

const app = express();
app.use(express.json());

// ✅ Updated CORS
app.use(cors({
  origin: [
    'http://127.0.0.1:5500',
    'http://localhost:5500',
    'https://brandscaler.com'
  ],
  credentials: true
}));

// ✅ API routes
app.use('/api', router);

// ✅ Correct port for Render
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
