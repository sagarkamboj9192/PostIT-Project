const express = require('express');
const router= express.Router();
const {Posts} = require('../models');

router.get("/", async (req, res)=>{
    const listofall = await Posts.findAll();
    res.json(listofall);
});


router.get("/byid/:id", async (req, res)=>{
    const id1 = req.params.id;
    const post1 = await Posts.findByPk(id1);
    res.json(post1);
});

router.post("/", async (req, res)=>{
    // try{
        const post = req.body;
        await Posts.create(post);
        res.json(post);
    //   }
    //   catch(error)
    //   {
    //     res.send(error);
    //   }

})

module.exports =  router;