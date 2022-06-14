const passport =  require('passport');

module.exports = app => {
  console.log("app.url")
  app.get(
    '/auth/google',
    passport.authenticate('google', 
    {
      scope: ['profile', 'email']
      // scope: ['https://www.googleapis.com/auth/plus.login']
    }
    )
  )

  app.get('/signin-google', 
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/')
    }
  )


  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/current_user', (req, res) => {
    res.send(req.user);
  })
}