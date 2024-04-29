require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

const app = express();
const port = process.env.PORT || 8080;

// DB Connection
(async () => {
  await dbConnection();
})();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api', require('./routes'));

app.listen(port, () => {
  console.log('Server running on port', port);
});