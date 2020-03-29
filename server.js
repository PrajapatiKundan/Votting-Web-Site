const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
var serviceAccount = require('./blog-app-node-4359e-firebase-adminsdk-kic75-d9fec905fd.json');

var firebaseAdmin = admin.initializeApp({
    credential:admin.credential.cert(serviceAccount),
    databaseURL:'https://blog-app-node-4359e.firebaseio.com'
});
const app = express();
var database = firebaseAdmin.database();

app.set('view engine', 'ejs');
app.use(express.static('views'));
app.set('views', __dirname + '/views');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// //authenticate middleware
// function isAuthenticate(req, res, next){//this middleware(function) check user logged or not
//     //if it is then attach to them with request object else redirect to the login page
//     next();
// }

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

app.listen(3000 || process.env.PORT, () => {
    console.log("Listening...");

});