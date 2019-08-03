module.exports = function(sequelize, DataTypes) {
  var Guests = sequelize.define("Guests", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING,
      len: [2, 50],
      validate: {
        allowNull: false // won't allow null
      }
    },
    last_name: {
      type: DataTypes.STRING,
      len: [2, 50],
      validate: {
        allowNull: false // won't allow null
      }
    },
    email: {
      type: DataTypes.STRING,
      len: [2],
      validate: {
        isEmail: true, // checks for email format (foo@bar.com)
        allowNull: false // won't allow null
      }
    },
    organization: {
      type: DataTypes.STRING
    },
    vip: {
      type: DataTypes.BOOLEAN
    },
    checked_in: {
      type: DataTypes.BOOLEAN
    }
    // foreign_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: Events,
    //     key: "id",
    //     deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    //   }
    // }
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
