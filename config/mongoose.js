const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/contacts_db');

const db = mongoose.connection;

db.on('error',console.error.bind(console,'error connecting to mongo'));

db.once('open',() => {
    console.log("Successfully connected to mongo");
});