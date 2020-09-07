const db = require('../database/database')

const Login =db.sequelize.define('Cads',{
    Name:{
        type:db.Sequelize.CHAR,
        allowNull: false
    },
    Email:{
      type:db.Sequelize.CHAR,
      allowNull: true
    },
    Password:{
        type:db.Sequelize.STRING,
        allowNull: false
    },
})

// Login.sync({force:true})

module.exports = Login