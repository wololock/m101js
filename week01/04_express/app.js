var express = require('express'),
    engines = require('consolidate'),
    app = express();

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get('/', function(request,response){
    response.render('hello', { name: 'Templates' });
});

app.use(function(request,response){
    response.sendStatus(404);
});

var server = app.listen(3000, function(){
    var port = server.address().port;
    console.log('Express server listening on http://localhost:%s', port);
});


