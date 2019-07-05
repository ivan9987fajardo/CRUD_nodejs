const express = require('express');
var app = express();

const bodyparser = require('body-parser');
const methodOverride = require('method-override');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));


app.listen(3000, () => console.log('Express server is running at port no : 3000'));

app.set('view engine', 'ejs');
app.use(methodOverride('_method'));


var items = require('./routes/items')
app.use('/', items)




