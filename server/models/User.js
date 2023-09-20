module.exports = (sequelize, DataTypes)=>{

    const user = sequelize.define("Users", {
        username:{
            type:DataTypes.STRING,
            allowNULL:false,
            // primaryKey:true,
        },
        password:{
            type:DataTypes.STRING,
            allowNULL:false,
        },
    });

    user.associate = (models)=>{
        user.hasMany(models.Likes,{
            onDelete:"cascade",
        });
    };
    return user;
}