const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const cors = require("cors");
const authRoute = require("./routes/auth.route");

const app = express();
const PORT = process.env.PORT || 9080
const DB_URL = process.env.DB_URL

app.use(cors())
app.use(express.json());

app.use('/api/auth', authRoute);

app.get('/', (req, res) => {
    res.send("Home route");
})

app.listen(PORT, async() => {
    await connectDB(DB_URL)
    console.log(`Server is runnig at http://localhost:${PORT}`);
})