
require('dotenv').config();
var express = require('express');
const http = require('http');
const morgan = require('morgan');
var app = express();

const mongoCon = require('./connections/mongoDB');
mongoCon();

const server = http.createServer(app);

app.use(express.json());
app.use(express.static('public'));
app.use(morgan('tiny'));
var courseRouter = require('./routes/courseRoute');
app.use('/', courseRouter);

const port = process.env.PORT || '3000';
server.listen(port,()=>{
  console.log("Server started on ",port);
});


module.exports = app;