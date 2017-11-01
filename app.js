const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const config = require('./config')[env];
const db = require('./libs/db');
const error = require('./middleware/error');
const auth = require('./middleware/auth');


process.env.dataDir = __dirname;
init();
const public1 = require('./routes/public');
const users = require('./routes/users');
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(error);
app.use(require('koa-static')(__dirname + '/public'));
async function init() {
    try {
        await db.init();
    }catch(err) {
        console.log(`mysql connection is fail ,err: ${err}`);
    }

}


// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});

app.use(auth);
// routes
app.use(public1.routes(), public1.allowedMethods());
app.use(users.routes(), users.allowedMethods());


let server = app.listen(`${config.port}`);

server.on('listening', async function() {
    console.log(`listen ${config.port} ...`);
});


module.exports = app;
