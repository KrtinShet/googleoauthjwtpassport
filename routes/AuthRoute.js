const router = require('express').Router();
const passport = require('passport');
const createJwt = require('./../utils/createJwt');
const jwt = require('jsonwebtoken');

// auth login
router.get('/login', (req, res) => {
  res.render('login');
});

// auth logout
router.get('/logout', (req, res) => {
  res.cookie('jwt', '', {
    expires: new Date(Date.now() + 1 * 1000),
    httpOnly: true,
  });
  res.redirect('/');
});

// auth with google+
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
  (req, res) => {}
);

router.get(
  '/google/redirect',
  passport.authenticate('google', {
    failureRedirect: '/auth/login',
    session: false,
  }),
  async function (req, res) {
    //take user from req.user
    const { _id, userType } = req.user;
    //sign a jwt token
    const token = createJwt(jwt, _id, userType);
    //send the token
    res.cookie('jwt', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 3600 * 1000),
    });
    //set res.locals.user to req.user
    res.locals.user = req.user;
    res.render('dashboard');
  }
);

module.exports = router;
