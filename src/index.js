const express = require('express');
const app = express();
app.use(express.json());

require('./routes')(app);

app.listen(3000, () => {
    console.log(`running on port 3000`);
});

module.exports = app;