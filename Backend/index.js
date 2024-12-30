const express = require('express');
const router=require('./Routes/router')
const app = express();
const bodyParser = require('body-parser')
const port = 4000;
require('dotenv').config();
app.use(express.json())
require("./connection/db")
const path=require('path')
const cors=require('cors')
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// app.get('/', (req, res) => {
//     res.send('H!');
// });

// Serve static files under /app


app.use('/api',router)


app.use('/', express.static(path.join(__dirname, "../greet/dist")));

// Catch-all route for your single-page application (SPA)
app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../greet/dist/index.html"));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
