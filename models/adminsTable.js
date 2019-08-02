module.exports = function(sequelize, DataTypes) {
  var Admins = sequelize.define("Admins", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING,
      len: [2, 50],
      validate: {
        notNull: true // won't allow null
      }
    },
    lastName: {
      type: DataTypes.STRING,
      len: [2, 50],
      validate: {
        notNull: true // won't allow null
      }
    },
    email: {
      type: DataTypes.STRING,
      len: [2],
      validate: {
        isEmail: true, // checks for email format (foo@bar.com)
        notNull: true // won't allow null
      }
    },
    username: {
      type: DataTypes.STRING,
      len: [2, 50],
      validate: {
        notNull: true // won't allow null
      }
    },
    password: {
      type: DataTypes.STRING,
      len: [2],
      validate: {
        notNull: true // won't allow null
      }
    },
    photo: {
      // need to get reference to the file location of the image
      // look at assignment before burgers// WHAT IS THE DATA TYPE?
      // type: DataTypes.STRING,
      validate: {
        notNull: true // won't allow null
      }
    },
    company: {
      type: DataTypes.STRING,
      validate: {
        notNull: true, // won't allow null
        min: 2,
        max: 100
      }
    },
    foreign_id: {
      type: Sequelize.INTEGER,
      references: {
        model: Events,
        key: "id",
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    }
  });
  return Admins;
};

// id
// firstName
// lastName
// email
// username
// password
// photo
// company
// foreignKey(scheduledEvent)

// If you use sequelize transforms, this will remove spaces on both ends
// of the string also
// trim: true,
