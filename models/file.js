module.exports = function (sequelize, DataTypes) {
    return sequelize.define("file", {
        id: {type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true},
        savePath: {type: DataTypes.STRING, defaultValue: null},
        fileName: {type: DataTypes.STRING, defaultValue: null},
        mimeType: {type: DataTypes.STRING, defaultValue: null},
        size: {type: DataTypes.INTEGER, defaultValue: 0},
        originalname: {type: DataTypes.STRING, defaultValue: null},
        account: {type: DataTypes.STRING, defaultValue: null}
    }, {
        engine: 'MYISAM',
        charset: 'utf8',
        timestamps: false
    });
};
