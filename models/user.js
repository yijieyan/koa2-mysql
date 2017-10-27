module.exports = function (sequelize, DataTypes) {
    return sequelize.define("user", {
        id: {type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true},
        username: {type: DataTypes.STRING, defaultValue: null},
        account: {type: DataTypes.STRING, defaultValue: null},
        password: {type: DataTypes.STRING, defaultValue: null},
        isAdmin: {type: DataTypes.BOOLEAN, defaultValue: false},
        isValid: {type: DataTypes.BOOLEAN, defaultValue: false},
        phone: {type: DataTypes.STRING, defaultValue: null},
        mobile: {type: DataTypes.STRING, defaultValue: null},
        email: {type: DataTypes.STRING, defaultValue: null},
        gender: {type: DataTypes.BOOLEAN, defaultValue: false},
        avatar: {type: DataTypes.STRING, defaultValue: null}
    }, {
        engine: 'MYISAM',
        charset: 'utf8',
        timestamps: false
    });
};
