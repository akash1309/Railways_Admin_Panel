const express            = require('express');
const http               = require('http');
const mongoose           = require('mongoose');
const bodyParser         = require('body-parser');
const config             = require('./config/appConfig');
const app                = express();
var cors                 = require('cors');

const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin: '*'}));

const port = 8080;

// Commenting consoles in production
  console.log = function(){};


// MongoDB Connection using mongoose
mongoose.connect(config.dbUrl, (err, database) => {
  if (err) return console.log(err)

  require('./app/routes')(app, database);

  server.listen(port, (err) => {
  	if ( ! err) {
  		console.log(`server is listening on `+port);
  	}
  })

})
