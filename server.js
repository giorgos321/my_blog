const express = require('express');
const app = express();
const connectDB = require('./config/db');
const morgan = require('morgan');
const passport = require('passport');
const dotenv = require('dotenv');
const session = require('express-session');
const cors = require('cors');
const path = require('path');

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

//Serve Static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
