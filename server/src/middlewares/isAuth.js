function isAuth(req, res, next) {
  const user = req.session?.user;
  if (!user) {
    return res.redirect('/login');
  }
  return next();
}

module.exports = isAuth;
