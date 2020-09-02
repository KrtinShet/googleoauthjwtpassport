module.exports = function (jwt, id, user) {
  return jwt.sign({ uid: id, role: user }, 'secret', {
    expiresIn: '1d',
  });
};
