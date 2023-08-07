const express = require('express');
const { validateToken } = require('../middlewares/authcheckmiddleware');
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

router.post("/", validateToken ,async (req, res)=>{
    // try{
        const post = req.body;
        post.username = req.user.username;
        await Posts.create(post);
        res.json(post);
    //   }
    //   catch(error)
    //   {
    //     res.send(error);
    //   }

});

router.delete("/:postId", validateToken, async (req, res) => {
    const postId = req.params.postId;
    await Posts.destroy({
      where: {
        id: postId,
      },
    });
  
    res.json("DELETED SUCCESSFULLY");
  });

module.exports =  router;