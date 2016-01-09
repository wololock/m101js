var express = require('express'),
    app = express();

app.get('/', function(request,response){
    response.send('Hello, World!');
});

app.use(function(request,response){
    response.sendStatus(404);
});

var server = app.listen(3000, function(){
    var port = server.address().port;
    console.log('Express server listening on http://localhost:%s', port);
});


