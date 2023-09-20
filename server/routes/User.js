const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken')
const {validateToken} = require('../middlewares/authcheckmiddleware')


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
                
                const accessToken = sign({username: user.username , id: user.id}, "Keepthistokenasasecret");
                res.json({token:accessToken, username:username, id: user.id});
            }
        });
    }
});

router.get("/auth/validuser", validateToken, (req, res)=>{
    res.json(req.user);
});

module.exports = router;