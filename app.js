const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.get("/", (request, response) => {
    response.status(200).json({ message: "Hello from Express Server!" })
});

app.listen(PORT);

