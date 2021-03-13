const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const port = 2020;
const host = 'localhost';

const routes = require('./Routes/index');

const app = express();

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());

app.use('/', routes);

mongoose.connect('mongodb+srv://root:Qwerty@123@cluster0.zcikl.mongodb.net/TestDB?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(res => {
    app.listen(port, host, () => {
        console.log(`Server Running at - ${host}:${port}`);
    })
}).catch(err => { console.log(err) })