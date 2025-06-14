const express = require('express');
const cors = require('cors');
require('dotenv').config();
const router = require('./routes');

const app = express();

// ✅ Allow CORS for your *actual domain* in production:
app.use(cors({
  origin: [
    'https://brandscalar.com', 
    'http://brandscalar.com'
  ],
  credentials: true
}));

app.use(express.json());
app.use('/api', router);

// ✅ Use environment port or fallback:
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
