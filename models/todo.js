module.exports = function(sequelize, DataTypes) {
var Todo = sequelize.define("Todo", {
  title: {
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
  },

});
return Todo;
};
