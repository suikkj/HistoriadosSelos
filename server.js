const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {
    res.render('index');
});

app.get('/', (req, res) => {
    res.send('Servidor rodando!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
