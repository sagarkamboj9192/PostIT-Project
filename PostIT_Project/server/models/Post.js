module.exports= (sequelize, DataTypes)=>{

    const Post =  sequelize.define("Posts",{
        title:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        postText:{
            type: DataTypes.STRING,
            allowNULL: false,
        },
        username:{
            type: DataTypes.STRING,
            allowNULL: false, 
        },
    });

    Post.associate = (models)=>{
        Post.hasMany(models.CommentTables,{
            onDelete:"cascade",
        });
    };

    return Post;
};