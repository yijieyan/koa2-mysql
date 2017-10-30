global.env = process.env.environment || 'localhost';


module.exports = {
    'development': {
        port: 5000,
        dbUrl: 'mongodb://localhost:27017/test1',
        redis: {
            port: 6379,
            host: 'localhost'
        },
        mysql: {
            dbHost: 'localhost',
            dbUser: 'root',
            dbPassword: '123456',
            dbName: 'test'
        }
    },
    'test': {
        port: 5000,
        dbUrl: 'mongodb://localhost:27017/test1',
        redis: {
            port: 6379,
            host: 'localhost'
        },
        mysql: {
            dbHost: 'localhost',
            dbUser: 'root',
            dbPassword: '123456',
            dbName: 'test'
        }
    },
    'prouction': {
        port: 5000,
        dbUrl: 'mongodb://localhost:27017/test1',
        redis: {
            port: 6379,
            host: 'localhost'
        },
        mysql: {
            dbHost: 'localhost',
            dbUser: 'root',
            dbPassword: '123456',
            dbName: 'test'
        }
    },
    'localhost': {
        port: 5000,
        dbUrl: 'mongodb://localhost:27017/test1',
        redis: {
            port: 6379,
            host: 'localhost'
        },
        mysql: {
            dbHost: 'localhost',
            dbUser: 'root',
            dbPassword: '123456',
            dbName: 'test'
        }
    }
};