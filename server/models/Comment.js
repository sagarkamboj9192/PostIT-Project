module.exports= (sequelize, DataTypes)=>{

    const comment =  sequelize.define("CommentTables",{
        commentbody:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        username:{
            type: DataTypes.STRING,
            allowNull:false,
        },
    });

    return comment;
};