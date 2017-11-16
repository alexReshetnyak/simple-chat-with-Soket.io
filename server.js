let express = require('express');
let app = require('express')(); 
let http = require('http').Server(app); 
let io = require('socket.io')(http);
let path = require('path');
let bodyParser = require('body-parser');


//middlewares
app.use(express.static(path.join(__dirname, "dist")));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({type: 'application/json'}));

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    console.log('Internal error(%d): %s',res.statusCode,err.message);
    res.send({ error: err.message });
    return;
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});


io.on('connection', (socket) => {
    console.log('user connected'); 
    socket.on('disconnect', function(){ 
        console.log('user disconnected'); 
    });
    socket.on('add-message', (message) => { 
        io.emit('message', {type:'new-message', text: message});
    });
});

http.listen(5000, () => { console.log('started on port 5000'); });