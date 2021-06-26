const http = require('http');

http.createServer(function(req, res) {
    
    res.end('Hell o World!');
    
}).listen(80);