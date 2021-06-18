require('dotenv').config()
const express = require('express');

const PORT = process.env.PORT || 5000;
const app = express()

app.use(express.json());
app.use('/api', (req, res, next)=> {
    res.send("resolve");
});

app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))