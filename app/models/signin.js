//structure for new user
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [1]
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5, 10]
        }
      },
      hasAlcohol: DataTypes.BOOLEAN
    });
  
    User.associate = function(models) {
      models.User.hasMany(models.Alcohol, { onDelete: 'cascade' });
  };
  
    return User;
  };
