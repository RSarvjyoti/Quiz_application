const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 9080

app.get('/', (req, res) => {
    res.send("Home route");
})

app.listen(PORT, async() => {
    console.log(`Server is runnig at http://localhost:${PORT}`);
})