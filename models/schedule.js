module.exports = (sequelize, Datatypes) => {
  
    var Schedule = sequelize.define('Schedule', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Datatypes.INTEGER,
      },
      who: {
        type: Datatypes.STRING(200),
      },
      when: {
        type: Datatypes.STRING(200),
      },
      place:{
        type: Datatypes.STRING(1000),
      },
      what:{
        type: Datatypes.STRING(1000),
      },
      price:{
        type: Datatypes.STRING(200),
        defaultValue:'0',
      },
      member:{
        type: Datatypes.TEXT,
        defaultValue:' ',
      },
    });
  
      return Schedule;
  
  };
  