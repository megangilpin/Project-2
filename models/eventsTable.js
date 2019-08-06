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
      allowNull: false
      // validate: {

      // }
    },
    description: {
      type: DataTypes.STRING, //TEXT
      allowNull: false
      // validate: {

      //   min: 2
      // }
    },
    event_type: {
      type: DataTypes.STRING,
      len: [2, 50],
      allowNull: true
      // validate: {

      // }
      //   no validation here
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false
      // validate: {

      // }
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false
      // validate: {

      // }
    },
    date: {
      type: DataTypes.DATE, // DATE or can also try DATEONLY
      allowNull: false
      // validate: {
      //   isDate: true // only allow date strings
      // }
    },
    address_line: {
      type: DataTypes.STRING,
      allowNull: false
      // validate: {

      // }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
      // validate: {
      //   is: ["^[a-z]+$", "i"] // will only allow letters
      // }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
      // validate: {
      //   is: ["^[a-z]+$", "i"], // will only allow letters
      //   max: 2, // only allow values <= 2
      //   min: 2, // only allow values >= 2

      // }
    },
    zipcode: {
      type: DataTypes.STRING, // INTEGER
      len: [5, 5],
      allowNull: false
      // validate: {
      //   isInt: true, // checks for valid integers

      //   not: ["[a-z]", "i"] // will not allow letters
      // }
    },
    next_step_prompt: {
      type: DataTypes.STRING
      // validate: {
      //   min: 2
      // }
    },
    question1: {
      type: DataTypes.STRING
      // validate: {
      //   min: 2
      // }
    },
    question2: {
      type: DataTypes.STRING
      // validate: {
      //   min: 2
      // }
    },
    question3: {
      type: DataTypes.STRING
      // validate: {
      //   min: 2
      // }
    }

    // creator: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    //   // validate: {

    //   // }
    // }
  });

  // Events.associate = function(models) {
  //   Events.belongsTo(models.Admins, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  // Events.associate = function(models) {
  //   Events.hasMany(models.Guests, {
  //     foreignKey: "id",
  //     onDelete: "cascade"
  //   });
  // };

  return Events;
};
