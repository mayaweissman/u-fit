global.config = require("./config.json");
const express = require("express");
const session = require("express-session");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const socketIO = require("socket.io");
const authController = require("./controllers/auth-controller");
const productsController = require("./controllers/products-controller");
const programController = require("./controllers/program-controller");
const server = express();

server.use(cors({
    origin: "http://localhost:3001",
    credentials: true
}));

server.use(session({
    name: "uFitSession",
    secret: "itsASecret",
    resave: true,
    saveUninitialized: false,
}));

server.use(fileUpload());
server.use(express.static(__dirname));
server.use(express.json());
server.use("/api/auth", authController);
server.use("/api/program", programController);
server.use("/api/products", productsController);



const listener = server.listen(3000, () => console.log("Listening on http://localhost:3000"));
global.socketServer = socketIO(listener);
