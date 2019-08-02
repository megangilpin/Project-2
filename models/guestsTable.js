module.exports = function(sequelize, DataTypes) {
  var Guests = sequelize.define("Guests", {
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
    organization: {
      type: DataTypes.STRING
    },
    VIP: {
      type: DataTypes.BOOLEAN
    },
    checkedIn: {
      type: DataTypes.BOOLEAN
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
  return Guests;
};

// id
// firstName	R
// lastName	R
// email	R
// organization
// VIP -- boolean
// checkedIn -- boolean
// foreignKey(scheduledEvent)
