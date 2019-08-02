module.exports = function(sequelize, DataTypes) {
  var Events = sequelize.define("Events", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      len: [2, 50],
      validate: {
        notNull: true // won't allow null
      }
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        notNull: true, // won't allow null
        min: 2
      }
    },
    eventType: {
      type: DataTypes.STRING,
      len: [2, 50]
      //   no validation here
    },
    startTime: {
      type: Sequelize.TIME,
      validate: {
        notNull: true // won't allow null
      }
    },
    endTime: {
      type: Sequelize.TIME,
      validate: {
        notNull: true // won't allow null
      }
    },
    date: {
      type: DataTypes.DATE, // can also try DATEONLY
      validate: {
        notNull: true, // won't allow null
        isDate: true // only allow date strings
      }
    },
    addressLine: {
      type: DataTypes.STRING,
      validate: {
        notNull: true // won't allow null
      }
    },
    city: {
      type: DataTypes.STRING,
      validate: {
        notNull: true, // won't allow null
        is: ["^[a-z]+$", "i"] // will only allow letters
      }
    },
    state: {
      type: DataTypes.STRING,
      validate: {
        is: ["^[a-z]+$", "i"], // will only allow letters
        max: 2, // only allow values <= 2
        min: 2, // only allow values >= 2
        notNull: true // won't allow null
      }
    },
    zipcode: {
      type: DataTypes.INTEGER,
      len: [5, 5],
      validate: {
        isInt: true, // checks for valid integers
        notNull: true, // won't allow null
        not: ["[a-z]", "i"] // will not allow letters
      }
    },
    nextStepPrompt: {
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
    quesiton3: {
      type: DataTypes.STRING,
      validate: {
        min: 2
      }
    },
    foreign_id: {
      type: Sequelize.INTEGER,
      references: {
        model: Guests, // this will need to be dynamically created -- not sure how to refernece that
        key: "id",
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    }
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
