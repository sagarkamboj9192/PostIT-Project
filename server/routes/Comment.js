const express = require('express');
const router = express.Router();
const {CommentTables} = require('../models');
const {validateToken } = require('../middlewares/authcheckmiddleware')
// const Comment = require('../models/Comment');



router.get("/comments/:postId", async (req, res)=>{
    const postId1 = req.params.postId;
    const commentpost1 = await CommentTables.findAll({where:{PostId:postId1}});
    res.json(commentpost1);
});

router.post("/comments", validateToken,  async (req, res)=>{
    const comment= req.body;
    const username = req.user.username;
    comment.username = username;
    await CommentTables.create(comment);
    res.json(comment);
});

module.exports = router;