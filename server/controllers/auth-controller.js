const express = require("express");
const authLogic = require("../business-logic/auth-logic");
const User = require("../models/user-model");
const { request, response } = require("express");
const dal = require("../data-access-layer/dal");
const router = express.Router();

router.post("/register", async (request, response) => {
    try {
        const user = new User(
            0,
            request.body.targetId,
            request.body.firstName,
            request.body.lastName,
            request.body.email,
            request.body.password,
            request.body.gender,
            request.body.height,
            request.body.width,
            request.body.fatPercantage,
            0,
            0);

        const addedUser = await authLogic.register(user);

        request.session.user = addedUser;

        response.status(201).json(addedUser);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.post("/login", async (request, response) => {
    try {
        const credentials = request.body;
        const user = await authLogic.login(credentials);
        console.log(user);
        if (!user) {
            response.status(401).send("Illegal username or password");
            return;
        }
        request.session.user = user;
        response.json(user);
    }
    catch (err) {
        response.status(500).send(err.message);
        console.log(err.message);
    }
});

router.post("/logout", (request, response) => {
    try {
        request.session.destroy();
        response.end();
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


router.get("/isLogged", async (request, response) => {
    if (request.session.user === undefined) {
        response.send("not logged in");
        return;
    }
    const user = await authLogic.login(request.session.user);
    response.json(user);

});

router.patch("/updateUser", async (request, response) => {
    try {
        const user = new User(request.body.userId, request.body.firstName, request.body.targetId,
            request.body.lastName, request.body.email, request.body.password, request.body.gender,
            request.body.height, request.body.width, request.body.fatPercantage, request.body.process, request.body.isAdmin);
        const updatedUser = await authLogic.updateUser(user);
        if (!updatedUser) {
            response.sendStatus(404);
            return;
        }
        response.json(updatedUser);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});



module.exports = router;