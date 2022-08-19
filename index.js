const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose =  require('mongoose');
const router = require("./routes/routes");
const path = require('path');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// app.set('view engine', 'ejs');
// app.set("views",'./views')

// Set the default templating engine to ejs
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

app.use("/",router);

mongoose.connect('mongodb://localhost:27017/agendamentos');

app.listen(8080, () => {
    console.log('service start');
});