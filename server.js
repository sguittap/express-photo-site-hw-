const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
require('./db/db');
const userController = require('./controllers/user');
//const Controller = require('./controllers/');

//middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use('/user', userController);
// app.use('/', Controller);
app.get('/', (req, res) => {
    res.render('index.ejs');
  });
  
  
  app.listen(3000, () => {
    console.log('listening on port 3000');
  })