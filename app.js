const express = require("express")
const app = express()
const path = require("path")
require('dotenv').config()
const port = process.env.PORT

app.use(express.static(path.join(__dirname, 'views')));

app.get("/", (req, res) =>{
    res
        .status(200)
        .render("index.html")
})

app.listen(port, () =>{
    console.log(`Running at port ${port}.`);
})