const Sequelize = require('sequelize')
const sequelize = require("../db/conn");

const MailAPI = sequelize.define("MailAPI", {
//   apiID: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//   },
  credits: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  validIP: {
      type: Sequelize.STRING(50),
    //   allowNull: false,
      unique:true 
  },
  apiKey: {
    type: Sequelize.CHAR(36),
    defaultValue: function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < 32; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
      }
      
      ,
    // allowNull: false
  }
});

module.exports = MailAPI;