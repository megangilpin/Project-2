module.exports = function(sequelize, DataTypes) {
  var Guests = sequelize.define("Guests", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {},
    lastName: {},
    email: {},
    organization: {},
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
