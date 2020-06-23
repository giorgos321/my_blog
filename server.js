const express = require('express');
const app = express();
const connectDB = require('./config/db');
const morgan = require('morgan');
require('dotenv').config();

app.use(express.json({ extended: false }));
app.use(morgan('dev'));
connectDB();

app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/register', require('./routes/api/register'));
app.use('/api/auth', require('./routes/api/auth'));

app.get('/', (req, res) => {
  res.send('Api running');
});

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
