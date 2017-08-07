var express = require("express");
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World')
});

app.listen(3000);

// https://daveceddia.com/create-react-app-express-backend/
