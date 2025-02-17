import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();

app.use(cors());

app.get('/calendar', (req, res) => {
    fs.readFile('calendar.json', "utf8", (err, data) => {
        if(err){
            return res.status(500).json({ error: 'Problem pri citanju fajla!'});
        }
        res.json(JSON.parse(data));
    })
});

app.get('/quotes', (req, res) => {
    fs.readFile('quotes.json', 'utf8', (err, data) => {
        if(err){
            return res.status(500).json( { error: 'Problem pri citanju fajla!'});
        }
        res.json(JSON.parse(data));
    })
});

app.get('/fasts', (req, res) => {
    fs.readFile('postovi.json', 'utf8', (err, data) => {
        if(err){
            console.log(err);
        }
        res.json(JSON.parse(data));
    })
});

app.get('/about', (req, res) => {
    fs.readFile('about.json', 'utf8', (err, data) => {
        if(err){
            console.log(err);
        }
        res.json(JSON.parse(data));
    })
});
const PORT = 3000;

app.listen(PORT, () => console.log(`Server je pokrenut na http://localhost:${PORT}`));