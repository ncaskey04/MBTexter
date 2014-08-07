module.exports = function(sequelize, DataTypes){
	var Mbtype = sequelize.define('mbtype', {

	type: DataTypes.STRING,
    description: DataTypes.TEXT,
    },
    {
    classMethods: {
      associate: function(db) {
        Mbtype.hasMany(db.user);
      }
  	}
  	});
	return Mbtype;
};