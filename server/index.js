const express = require("express");

const app= express();
const cors= require('cors');

// const mysql= require('mysql');
// const db= mysql.createConnection({
//     user:'root',
//     host:'localhost',
//     password:'kamboj',
//     database:'firstproject',
// });
// 
// 
// app.get('/select',(req, res)=>{
//     db.query('select * from countries',
//     (err, result)=>{
//         if(err){
//             console.log(err);
//         }

//         res.send(result);
//     });
// });
// app.get('/insert',(req, res)=>{
    // db.query('INSERT INTO countries (id, countriesname, population) VALUES (2,"UK", 10000)',
    // (err, result)=>{
    //     if(err){
    //         console.log(err);
    //     }

    //     res.send(result);
    // });
    // 
// });

const db = require('./models');

// const {Post} = require('./models');  

// app.get("/delete",(req, res)=>{
//     Post.destroy({where:{title:"kamboj"}});
//     res.send("delete");
// });
// app.get("/insert", (req , res)=>{

//     Post.create({
//         title:"Nodejs",
//         postText:"very good backend lang",
//         username:"sagar1",
//     }).catch((err)=>{
//         if(err){
//             console.log(err);
//         }
//     });

//     res.send("insert");
// });


app.use(express.json());
app.use(cors());



const postrouter = require('./routes/Post');
app.use("/posts",postrouter);
// for comments router
const commentrouter = require('./routes/Comment');
app.use(commentrouter);
// for userlogin router
const userauthrouter= require('./routes/User');
app.use(userauthrouter);

// for login page
const likesRouter = require("./routes/Likes");
app.use(likesRouter);


db.sequelize.sync().then((req)=>{

    app.listen(3002,()=>{
        console.log("Server is running on port no 3002");
    });

});