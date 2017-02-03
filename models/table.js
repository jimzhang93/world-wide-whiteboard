let Sequelize = require('Sequelize');
db = new Sequelize('postgres://localhost/whiteboard', {logging: false});

let Session = db.define('session', {
  startX: {
    type: Sequelize.INTEGER
  },
  startY: {
    type: Sequelize.INTEGER
  },
  endX: {
    type: Sequelize.INTEGER
  },
  endY: {
    type: Sequelize.INTEGER
  },
  color: {
    type: Sequelize.STRING
  }
});

module.exports = Session;
