const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Educate', {useNewUrlParser: true});
const port = 4080;

//Define Mongoose Schema
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  concern: String
});

const contact = mongoose.model('Contact', contactSchema);

app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/contact', (req, res)=>{
  var myData = new contact(req.body);
  myData.save().then(()=>{
      // res.send("This item has been saved to the database");
    res.sendFile(path.join(__dirname + '/alert.html'));
  }).catch(()=>{
      res.status(400).sendFile(path.join(__dirname + '/alert2.html'));
  });
  // res.status(200).render('contact.pug');
})

// START THE SERVER
app.listen(port, ()=>{
  console.log(`The Aplication Started Sccessfully on Port ${port}`);
});