module.exports = function(sequelize, DataTypes) {
  var Admins = sequelize.define("Admins", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING,
      len: [2, 50],
      allowNull: false
      // validate: {

      // }
    },
    last_name: {
      type: DataTypes.STRING,
      len: [2, 50],
      allowNull: false
      // validate: {

      // }
    },
    email: {
      type: DataTypes.STRING,
      len: [2],
      allowNull: false
      // validate: {
      //  isEmail: true, // checks for email format (foo@bar.com)
      // }
    },
    username: {
      type: DataTypes.STRING,
      len: [2, 50],
      allowNull: false
      // validate: {

      // }
    },
    password: {
      type: DataTypes.STRING,
      len: [2],
      allowNull: false
      // validate: {

      // }
    },
    photo: {
      // need to get reference to the file location of the image
      // look at assignment before burgers// WHAT IS THE DATA TYPE?
      type: DataTypes.STRING,
      allowNull: false
      // validate: {

      // }
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false
      // validate: {

      //   min: 2,
      //   max: 100
      // }
    }
  });

  Admins.associate = function(models) {
    Admins.hasMany(models.Events, {
      foreignKey: "id",
      onDelete: "cascade"
    });
  };

  return Admins;
};
