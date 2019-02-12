const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Routes
const routeUsers = require('./routes/users.route');
const routeSuggestion = require('./routes/suggestion.route');


//mongodb connection
mongoose.connect(config.database, { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
    console.log("Connected to Database", + config.database);
});

mongoose.connection.on('error', (err) => {
    console.log("Database Error", + err);
});

//appliction and port
const app = express();
const port = 3000;

//enable cors
app.use(cors());

//use application folder
app.use(express.static(path.join(__dirname, 'public')));

//Use of body Parser
app.use(bodyParser.json());

//Use of Passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


//route redirection
app.use('/users', routeUsers);
app.use('/suggestion', routeSuggestion);

app.get('/', (req,res) => {
    res.send("Home Page");
})

//port to listen
app.listen(port, () => {
    console.log("Server started on Port: " + port);
});