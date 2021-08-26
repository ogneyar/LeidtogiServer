var express = require('express');
var	port = 80;
const fs = require('fs')

const app = express()

fs.stat("upgrade", (err, stats) => {
    if (err) {
        app.get('*', (req, res) => res.sendFile(__dirname + '/index.html'))
    }else {
        app.get('*', (req, res) => res.sendFile(__dirname + '/upgrade_index.html'))
            
    }
})
	
app.listen(port, () => console.log(`Starting server. http://localhost:${ port }`))
