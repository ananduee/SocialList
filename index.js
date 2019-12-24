require("@babel/register"); // For transforming javascript on the fly
const express = require('express');
const ViewStream = require('./src/views/ViewStream');

const app = express()
const port = 3000

app.get('/', (req, res) => {
    const viewStream = ViewStream.get();
    viewStream.pipe(res)    
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))