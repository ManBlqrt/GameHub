const express = require("express");
const router = require("./app/router");

const server = express();
const utilsModule = require("./app/controllers/utils");

server.set("view engine", "ejs");
server.set("views", "./app/views");

server.use(express.static("public"));

server.use(utilsModule.setLocals);

server.use(router);

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`🚀 Server listening at http://localhost:${port}`);
});

