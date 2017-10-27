require('./string-extension');
const Sequelize = require('sequelize'),
    config = require('../config.js')[env].mysql,
    fs = require('fs'),
    path = require('path'),
    argv = require('optimist').argv;

let sequelize,
    models = {},
    modelRoot = path.resolve(__dirname, '../models');

module.exports.models = models;

module.exports.sequelize = null;

module.exports.init = async function(){
    let opts = {
        host: config.dbHost,
        dialect: 'mysql',
        pool:{
            max: 4,
            min: 1,
            idle: 60000
        }
    };
    opts.logging = argv.env == 'dev';


    module.exports.sequelize = sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword, opts);
    let modelArea = models;
    fs.readdirSync(modelRoot).forEach(area => {
            if(path.extname(area) != '.js') return;
            let filename = path.basename(area, '.js').capitalizeFirstLetter();
            modelArea[filename] =  sequelize.import(path.resolve(modelRoot, area));
    });
};
