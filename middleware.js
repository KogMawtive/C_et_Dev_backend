import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';

const app = express()
const port = 3000

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//express.json RENVOIE un middlewarei
let jsonBodyMiddleware = express.json() 
console.log(jsonBodyMiddleware)
//app.use Veut une fonction ! 
app.use(jsonBodyMiddleware)

app.use(loggerMiddleware);

app.use(express.static(path.join(__dirname, 'templates')));
app.use(express.static(path.join(__dirname, 'public')));

function loggerMiddleware(req, res, next) {
    console.log('nouvelle requete entrante');
    console.log(req.body);
    next();
}

app.get('/test2', loggerMiddleware, (req, res) => {
    res.send('Hello 2')
  })

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});

