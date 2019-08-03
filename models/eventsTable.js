module.exports = function(sequelize, DataTypes) {
  var Events = sequelize.define("Events", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      len: [2, 50],
      validate: {
        allowNull: false
      }
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        allowNull: false,
        min: 2
      }
    },
    event_type: {
      type: DataTypes.STRING,
      len: [2, 50],
      validate: {
        allowNull: true
      }
      //   no validation here
    },
    start_time: {
      type: DataTypes.TIME,
      validate: {
        allowNull: false
      }
    },
    end_time: {
      type: DataTypes.TIME,
      validate: {
        allowNull: false
      }
    },
    date: {
      type: DataTypes.DATE, // can also try DATEONLY
      validate: {
        allowNull: false,
        isDate: true // only allow date strings
      }
    },
    address_line: {
      type: DataTypes.STRING,
      validate: {
        allowNull: false
      }
    },
    city: {
      type: DataTypes.STRING,
      validate: {
        allowNull: false,
        is: ["^[a-z]+$", "i"] // will only allow letters
      }
    },
    state: {
      type: DataTypes.STRING,
      validate: {
        is: ["^[a-z]+$", "i"], // will only allow letters
        max: 2, // only allow values <= 2
        min: 2, // only allow values >= 2
        allowNull: false
      }
    },
    zipcode: {
      type: DataTypes.INTEGER,
      len: [5, 5],
      validate: {
        isInt: true, // checks for valid integers
        allowNull: false,
        not: ["[a-z]", "i"] // will not allow letters
      }
    },
    next_step_prompt: {
      type: DataTypes.STRING,
      validate: {
        min: 2
      }
    },
    question1: {
      type: DataTypes.STRING,
      validate: {
        min: 2
      }
    },
    question2: {
      type: DataTypes.STRING,
      validate: {
        min: 2
      }
    },
    question3: {
      type: DataTypes.STRING,
      validate: {
        min: 2
      }
    },
    creator: {
      type: DataTypes.STRING,
      validate: {
        allowNull: false
      }
    }
  });

  Events.associate = function(models) {
    Events.belongsTo(models.Admins, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  Events.associate = function(models) {
    Events.hasMany(models.Guests, {
      foreignKey: "id",
      onDelete: "cascade"
    });
  };

  return Events;
};
