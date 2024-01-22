const express = require("express");
const router = require("./app/router");
const server = express();
const utilsModule = require("./app/controllers/utils");

server.set('view engine', 'ejs');
server.set('views', './app/views');

server.use(express.static('public'));

server.use(utilsModule.setLocals);

server.use(router);

server.listen(3001,()=>{
    console.log(`Le serveur est bien lancé à l'adresse : http://localhost:3001`);
});