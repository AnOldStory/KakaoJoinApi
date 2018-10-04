module.exports = (sequelize, Datatypes) => {
  
  var User = sequelize.define('User', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Datatypes.INTEGER,
    },
    user_key: {
      type: Datatypes.STRING(200),
    },
    username: {
      type: Datatypes.STRING(200),
    },
    status:{
      type: Datatypes.STRING(1000),
    },
    auth: {
      type: Datatypes.INTEGER,
      defaultValue:'0',
    },
    storysaver:{
      type: Datatypes.STRING(1000),
    },
  });

	return User;

};
