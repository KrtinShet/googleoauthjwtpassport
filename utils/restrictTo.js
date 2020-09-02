module.exports = (user) => {
  return (req, res, next) => {
    if (typeof req.user !== 'undefined') {
      if (req.user.userType !== user) {
        return res.redirect('/auth/login');
      }
    } else {
      return res.redirect('/auth/login');
    }
    next();
  };
};
