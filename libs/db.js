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

    const Op = Sequelize.Op;
    const operatorsAliases = {
        $eq: Op.eq,
        $ne: Op.ne,
        $gte: Op.gte,
        $gt: Op.gt,
        $lte: Op.lte,
        $lt: Op.lt,
        $not: Op.not,
        $in: Op.in,
        $notIn: Op.notIn,
        $is: Op.is,
        $like: Op.like,
        $notLike: Op.notLike,
        $iLike: Op.iLike,
        $notILike: Op.notILike,
        $regexp: Op.regexp,
        $notRegexp: Op.notRegexp,
        $iRegexp: Op.iRegexp,
        $notIRegexp: Op.notIRegexp,
        $between: Op.between,
        $notBetween: Op.notBetween,
        $overlap: Op.overlap,
        $contains: Op.contains,
        $contained: Op.contained,
        $adjacent: Op.adjacent,
        $strictLeft: Op.strictLeft,
        $strictRight: Op.strictRight,
        $noExtendRight: Op.noExtendRight,
        $noExtendLeft: Op.noExtendLeft,
        $and: Op.and,
        $or: Op.or,
        $any: Op.any,
        $all: Op.all,
        $values: Op.values,
        $col: Op.col
    };
    let opts = {
        host: config.dbHost,
        dialect: 'mysql',
        pool:{
            max: 4,
            min: 1,
            idle: 60000
        },
        operatorsAliases
    };
    module.exports.sequelize = sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword, opts);
    let modelArea = models;
    fs.readdirSync(modelRoot).forEach(area => {
            if(path.extname(area) != '.js') return;
            let filename = path.basename(area, '.js').capitalizeFirstLetter();
            modelArea[filename] =  sequelize.import(path.resolve(modelRoot, area));
    });
};
