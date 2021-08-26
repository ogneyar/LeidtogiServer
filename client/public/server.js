var express = require('express');
var	port = 80;
const fs = require('fs')

fs.stat("upgrade", (err, stats) => {
    if (err) {
        express()
            .get('*', (req, res) => res.sendFile(__dirname + '/index.html'))
            .listen(port, () => console.log(`Starting server. http://localhost:${ port }`))
    }else {
        express()
            .get('*', (req, res) => res.sendFile(__dirname + '/upgrade.html'))
            .listen(port, () => console.log(`Starting server. http://localhost:${ port }`))
    }
})
	
