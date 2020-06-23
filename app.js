console.clear();
/*
  Step 1: Create a new express app
*/
const express = require('express'); //npm install express
const app = express();

require('dotenv').config(); //npm install dotenv

const path = require('path');

/*
  Step 2: Setup Mongoose (using environment variables)
*/
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, {
    auth: {
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(err => console.error(`Error: ${err}`));

/*
  Step 3: Setup and configure Passport
*/
//require passport before sessions: npm install passport passport-local passport-local-mongoose
const passport = require('passport');


// Setting up Passport
app.use(passport.initialize());
app.use(passport.session());
const User = require('./models/User');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//create a session to track user, npm install express-session 
const session = require('express-session');
app.use(session({
    secret: `Zuko's my favorite character in Avatar`,
    resave: true,
    saveUninitialized: false
}));


/*
  Step 4: Setup the asset pipeline, path, the static paths,
  the views directory, and the view engine
*/
//set our view directory
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

//style sheets
app.use('/css', express.static('assets/css'));
app.use('/javascript', express.static('assets/javascript'));
app.use('/images', express.static('assets/images'));

/*
  Step 5: Setup the body parser
*/
// implement body parser done after out connection but before routes
const bodyParser = require('body-parser');// npm install body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




/*
  Step 6: Setup our flash helper, default locals, and local helpers (like formData and authorized)
*/
//use flash notifications, npm install connect-flash
//and add defaults
const flash = require('connect-flash');
app.use(flash());

app.use('/', (req, res, next) => {
    //setting up default locals
    res.locals.pageTitle = "Flash Title!";

    //pass messages to next request
    res.locals.flash = req.flash();
    res.locals.formData = req.session.formData || {};
    req.session.formData = {};

    res.locals.authorized = req.isAuthenticated();
    if (res.locals.authorized) res.locals.email = req.session.passport.user;
    next();
});

/*
  Step 7: Register our route composer
*/
//register routing
const routes = require('./routes.js');
app.use('/', routes);

/*
  Step 8: Start the server
*/
//start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));