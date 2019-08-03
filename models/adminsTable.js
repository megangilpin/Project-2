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
      validate: {
        allowNull: false
      }
    },
    last_name: {
      type: DataTypes.STRING,
      len: [2, 50],
      validate: {
        allowNull: false
      }
    },
    email: {
      type: DataTypes.STRING,
      len: [2],
      validate: {
        isEmail: true, // checks for email format (foo@bar.com)
        allowNull: false
      }
    },
    username: {
      type: DataTypes.STRING,
      len: [2, 50],
      validate: {
        allowNull: false
      }
    },
    password: {
      type: DataTypes.STRING,
      len: [2],
      validate: {
        allowNull: false
      }
    },
    photo: {
      // need to get reference to the file location of the image
      // look at assignment before burgers// WHAT IS THE DATA TYPE?
      type: DataTypes.STRING,
      validate: {
        allowNull: false
      }
    },
    company: {
      type: DataTypes.STRING,
      validate: {
        allowNull: false,
        min: 2,
        max: 100
      }
    }
  });

  Admins.associate = function(models) {
    Admins.hasMany(models.Events, {
      as: "Events",
      foreignKey: "id",
      onDelete: "cascade"
    });
  };

  return Admins;
};
