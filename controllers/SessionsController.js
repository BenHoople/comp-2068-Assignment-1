const User = require('../models/User');
const passport = require('passport');
const viewPath = 'sessions';

exports.new = (req, res) => {
  res.render(`${viewPath}/login`, {
    pageTitle: 'Login'
  });
};

// Step 1: Create an action that will authenticate the user using Passport
exports.create = (req, res, next) => {
  passport.authenticate('local',{
    successRedirect: "/videos",
    successFlash: 'You were logged in successfully',
    failureRedirect: "/login",
    failureFlash: "Invalid email or password"
  })(req, res, next);
};

// Step 2: Log the user out
exports.delete = (req, res) => {
  req.logout();
  req.flash('success', 'you were logged out successfully'),
  res.redirect('/');
};