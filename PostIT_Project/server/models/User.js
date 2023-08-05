module.exports = (sequelize, DataTypes)=>{

    const user = sequelize.define("Users", {
        username:{
            type:DataTypes.STRING,
            allowNULL:false,
        },
        password:{
            type:DataTypes.STRING,
            allowNULL:false,
        },
    });

    // user.associate = (models)=>{
    //     user.hasMany(models.Posts,{
    //         onDelete:"cascade",
    //     });
    // };
    return user;
}