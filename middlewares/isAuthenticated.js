const isAuthenticated = (req, res, next) => {
    const { username } = req.body
    if (username === req.session.username) {
        next()
    }
    else {
        next(new Error('user not authenticated'))
    }
  }
  
  module.exports = { isAuthenticated }
  