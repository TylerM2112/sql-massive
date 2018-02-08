const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
require('dotenv').config();


const app = express();
app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance);
});

app.get('/api/heroes', (req, res) => {
    req.app.get('db').get_heroes().then(heroes => {
        console.log('heroes', heroes)
        res.status(200).json(heroes);
    }).catch(error => {
        console.log('Oh no! An error has happened!', error);
        res.status(500).json({ message: 'Bummer!' })
    });
 })

const port = 4000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});