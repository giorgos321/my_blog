const express = require('express');
const app = express();
const connectDB = require('./config/db');
const morgan = require('morgan');
const passport = require('passport');
const dotenv = require('dotenv');
const session = require('express-session');
const cors = require('cors');

//Configure enviroment variables
dotenv.config({ path: './config/config.env' });

//Passport config
require('./config/passport')(passport);

app.use(express.json({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
connectDB();

// Sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  })
);

//Set passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/register', require('./routes/api/register'));
app.use('/api/auth', require('./routes/api/auth'));

app.get('/', (req, res) => {
  res.send('Api running');
});

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
