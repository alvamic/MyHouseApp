module.exports = function(sequelize, DataTypes) {
    var Events = sequelize.define("Events", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          len: [1]
        }
      }
    });
    return Events;
    };
    