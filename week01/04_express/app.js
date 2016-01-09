var express = require('express'),
    engines = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    bodyParser = require('body-parser'),
    app = express();

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser());

MongoClient.connect('mongodb://localhost:27017/video', function(err, db){
    assert.equal(null, err);
    console.log("Successfully connected to MongoDB");

    app.get('/', function(req,res){
        db.collection('movies').find({}).toArray(function(err, docs){
            res.render('movies', { movies: docs });
        });
    });

    app.get('/form', function(req,res){
        res.render('form', { fruits: ['apple', 'orange', 'banana', 'peach'] });
    });

    app.post('/favorite_fruits', function(req, res) {
        var favorite = req.body.fruit;

        if (typeof favorite == 'undefined') {
            res.send("Please choose a fruit!");
        } else {
            res.send("Your favorite fruit is " + favorite);
        }
    });

    app.get('/:name', function(req,res,next){
        var name = req.params.name,
            getvar1 = req.query.getvar1,
            getvar2 = req.query.getvar2;

        res.render('name', { name: name, getvar1: getvar1, getvar2: getvar2 });
    });

    app.use(function(req,res){
        res.sendStatus(404);
    });

    var server = app.listen(3000, function(){
        var port = server.address().port;
        console.log('Express server listening on http://localhost:%s', port);
    });
});



