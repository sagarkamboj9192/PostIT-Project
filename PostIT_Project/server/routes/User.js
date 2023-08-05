const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken')


router.post("/auth", async (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash
        });
        res.json("Done!");
    });
});

router.post("/loginpage", async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username: username } });

    if (!user) {
        res.json({ error: "This Username is not valid" });
    } else {
        bcrypt.compare(password, user.password).then((match) => {
            if (!match) {
                res.json({ error: "Usrname & Password is invalid" });
            } else {
                
                const gettoken = sign({username: user.username , id: user.id}, "Keepthistokenasasecret");
                res.json(gettoken);
            }
        });
    }
});
module.exports = router;