const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
require('dotenv').config();

var serviceAccount = require('./'+process.env.SERVICE_ACCOUNT_FILE);

var firebaseAdmin = admin.initializeApp({
    credential:admin.credential.cert(serviceAccount),
    databaseURL:process.env.DATABASE_URL
});

const app = express();

var database = firebaseAdmin.database();

app.set('view engine', 'ejs');
app.use(express.static('views'));
app.set('views', __dirname + '/views');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {

    var seriesRef = database.ref('/series');

    seriesRef.once('value',function(snapshot){

        var data = snapshot.val();

        if(!data){
            data = {};
        }else{
            res.render('home',{series : data});
        }
    });

});

app.listen(process.env.PORT || 3000, () => {

    console.log("Listenning...");

});