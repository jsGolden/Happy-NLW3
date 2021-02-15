// Importar libs
const express = require("express");
const path = require('path');
const pages = require('./pages');

// Iniciando o express
const server = express();
server
    //utilizar body do req
    .use(express.urlencoded({ extended: true }))

    //utilizando arquivos estáticos
    .use(express.static('public'))

    //configurar template engine
    .set('views', path.join(__dirname, "views"))
    .set('view engine', 'hbs')

    // criar rotas da aplicação
    .get('/', pages.index)
    .get('/orphanages', pages.orphanages)
    .get('/orphanage', pages.orphanage)
    .get('/create-orphanage', pages.createOrphanage)
    .post('/save-orphanage', pages.saveOrphanage);

// Ligar o servidor
server.listen(process.env.PORT || 5500);



