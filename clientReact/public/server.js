var express = require('express');
var	port = 80;
	
express()
    // .use(express.static('static'))
    .get('*', (req, res) => res.sendFile(__dirname + '/index.html'))
    .listen(port, () => console.log(`Starting server. http://localhost:${ port }`));
