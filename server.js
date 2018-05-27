const express            = require('express');
const mongoose           = require('mongoose');
const bodyParser         = require('body-parser');
const db                 = require('./config/db');
const app                = express();

// Application Start at 8000 port
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// MongoDB Connection using mongoose
mongoose.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  require('./app/routes')(app, database);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
})
