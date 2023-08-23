const express = require('express');
const path = require('path');
const port = 8080;
const bodyParser = require('body-parser');

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('assets'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/', (req, res) => {

    Contact.find({}).then((contacts) => {
        return res.render('home', {
            title: "Contact List",
            contact_list: contacts
        })
    }).catch(err => {
        console.log("error in fetching from db");
    })
});

app.post('/add-contact', (req, res) => {
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }).then((result) => console.log("Added",result))
        .catch((err) => console.log("error in creating contact"));
    return res.redirect('back');
});

app.get('/delete-contact', (req, res) => {
    let delid = req.query.id;
    Contact.findByIdAndDelete(delid).then(docs => {
        console.log('Deleted', docs)
    }).catch(err => {
        console.log('error in deleting')
    });
    return res.redirect('/');
})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Server is running on port : ", port);
});