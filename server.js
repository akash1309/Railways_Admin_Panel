const express            = require('express');
const http = require('http');
const mongoose           = require('mongoose');
const bodyParser         = require('body-parser');
const db                 = require('./config/db');
const app                = express();
const server = http.createServer(app);

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8000
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
// Application Start at 8000 port

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// MongoDB Connection using mongoose
mongoose.connect(db.url, (err, database) => {
  if (err) return console.log(err)

  require('./app/routes')(app, database);

  // app.listen(server_port, () => {
  //   console.log('We are live on '+ server_ip_address + ' port ' + server_port);
  // });

  server.listen(server_port,server_ip_address,function(){
   server.close(function(){
     server.listen(server_port,server_ip_address);
     console.log('We are live on '+ server_ip_address + ' port ' + server_port);
   })
  })

})
