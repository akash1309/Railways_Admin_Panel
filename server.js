const express            = require('express');
const http = require('http');
const mongoose           = require('mongoose');
const bodyParser         = require('body-parser');
const db                 = require('./config/db');
const app                = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// MongoDB Connection using mongoose
mongoose.connect(db.url, (err, database) => {
  if (err) return console.log(err)

  require('./app/routes')(app, database);

  server.listen(8080, (err) => {
  	if ( ! err) {
  		console.log(`server is listening on 80`)
  	}
  })

})
