const express = require('express');
const app = express();
const port = 5000;
const authRoute = require('./routes/AuthRoute');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');

mongoose
  .connect('mongodb://localhost:27017/gooauthuser', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log('connected to mongoDb database .... '));

app.set('view engine', 'ejs');
app.use(cookieParser());
require('./utils/passport');
app.use(passport.initialize());

app.use(require('./utils/seralizeUser').seralizeUser);

app.get('/', (req, res) => {
  res.render('home');
});
app.use('/auth', authRoute);
app.get('/dashboard', require('./utils/restrictTo')('user'), (req, res) => {
  res.render('dashboard');
});

app.listen(port, () => console.log('server has started on port 5000'));
