const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 8000;
const bodyparser = require("body-parser")

//Conect to MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ContactDance', { useNewUrlParser: true, useUnifiedTopology: true});

//Define Mongoose Schema
const ContactSchema = new mongoose.Schema({
    Name: String,
    Age: String,
    Gender: String,
    Phone_No: String,
    Email: String,
    Message: String
});
const Contact = mongoose.model('Contact', ContactSchema);

//EXPRESS STUF
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded());

//PUG STUFF
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//ENDPOINTS
app.get('/', (req, res) => {
    res.status(200).render('home.pug')
});
app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug')
});

app.post('/contact', (req, res) => {
    var AllData = new Contact(req.body);
    AllData.save().then(() => {
        res.send("This data has been savesd to the data base. THANK YOU")
    }).catch(() => {
        res.status(400).send("There is some error during saving your data.")
    });
    // res.status(200).render('contact.pug')
});

app.listen(port, () => {
    console.log(`The server is currently running at port : ${port}.`);
})