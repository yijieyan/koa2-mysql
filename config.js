global.env = process.env.environment || 'development';


module.exports = {
    'development': {
        port: 5000,
        dbUrl: 'mongodb://localhost:27017/test1',
        redis: {
            port: 6379,
            host: 'localhost'
        },
        mysql: {
            dbHost: '112.74.13.145',
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
        }
    },
    'prouction': {
        port: 5000,
        dbUrl: 'mongodb://localhost:27017/test1',
        redis: {
            port: 6379,
            host: 'localhost'
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
            dbHost: '112.74.13.145',
            dbUser: 'root',
            dbPassword: '123456',
            dbName: 'test'
        }
    }
};