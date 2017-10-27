require('./libs/string-extension');
const mysql = require('mysql'),
    co = require('co'),
    wrapper = require('co-mysql'),
    Sequelize = require('sequelize'),
    fs = require('fs'),
    path = require('path');


let sequelize, config, conn,
    models = {},
    modelRoot = path.resolve(__dirname, './models');




co(function*() {
    config = require('./config')[env].mysql;

    const connection = mysql.createConnection({
        host     : config.dbHost,
        user     : config.dbUser,
        password : config.dbPassword
    });

    conn = wrapper(connection);
    yield conn.query(`create database if not exists ${config.dbName}`);


    sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword, {logging: true, host: config.dbHost, dialect: 'mysql'});

    fs.readdirSync(modelRoot).forEach(file => {
        if(path.extname(file) != '.js') return;
        let filename = path.basename(file, '.js').capitalizeFirstLetter();
        models[filename] =  sequelize.import(path.resolve(modelRoot, file));

    });
    yield sequelize.sync({logging: console.log});
}).catch(err => {
    console.log('err:',err);
});