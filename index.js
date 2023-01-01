const express = require('express');
const bodyParser = require('body-parser');
const api = require('./src/api');

const app = express();
const PORT = 5000;

// this was app.use(bodyParser.json()); but i dont think we need body parser so imma leave it out for a bit
app.use(express.json());
app.use('/api/v1', api);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});