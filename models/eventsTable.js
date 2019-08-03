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
        allowNull: false // won't allow null
      }
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        allowNull: false, // won't allow null
        min: 2
      }
    },
    eventtype: {
      type: DataTypes.STRING,
      len: [2, 50],
      validate: {
        allowNull: true // won't allow null
      }
      //   no validation here
    },
    starttime: {
      type: DataTypes.TIME,
      validate: {
        allowNull: false // won't allow null
      }
    },
    end_time: {
      type: DataTypes.TIME,
      validate: {
        allowNull: false // won't allow null
      }
    },
    date: {
      type: DataTypes.DATE, // can also try DATEONLY
      validate: {
        allowNull: false, // won't allow null
        isDate: true // only allow date strings
      }
    },
    address_line: {
      type: DataTypes.STRING,
      validate: {
        allowNull: false // won't allow null
      }
    },
    city: {
      type: DataTypes.STRING,
      validate: {
        allowNull: false, // won't allow null
        is: ["^[a-z]+$", "i"] // will only allow letters
      }
    },
    state: {
      type: DataTypes.STRING,
      validate: {
        is: ["^[a-z]+$", "i"], // will only allow letters
        max: 2, // only allow values <= 2
        min: 2, // only allow values >= 2
        allowNull: false // won't allow null
      }
    },
    zipcode: {
      type: DataTypes.INTEGER,
      len: [5, 5],
      validate: {
        isInt: true, // checks for valid integers
        allowNull: false, // won't allow null
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
    }
    // foreign_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: Guests, // this will need to be dynamically created -- not sure how to refernece that
    //     key: "id",
    //     deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    //   }
    // }
  });
  return Events;
};

// id
// name	R
// description	R
// eventType
// startTime	R
// endTime	R
// date	R
// addressLine	R
// city	R
// state	R
// zipcode	R
// nextStepPrompt
// question1
// question2
// question3
// foreignKey(guestList)
