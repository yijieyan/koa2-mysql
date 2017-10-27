const router = require('koa-router')();
const multer = require('koa-multer');
const db = require('../libs/db');
const mkdirp = require('mkdirp');
const fs = require('fs');
const path = require('path');
const commonError = require('../libs/error');
let now = new Date(),
    currMonth = now.toISOString().substr(0, 7);
let dest = `uploads/${currMonth}/`;
let upload = multer({ dest: dest});

let util = require('../libs/util');
let User = db.models.User;
let File = db.models.File;
let security = require('../libs/security');
fs.existsSync(upload) ? '' : mkdirp.sync(path.join(__dirname,'../' ,dest));

router.prefix('/public');

/**
 * 上传文件（支持多文件上传）
 */
router.post('/uploadFile', upload.array('files', 12), async function(ctx, next){

    let files = ctx.req.files;
    let f = [];
    for(let i= 0;i < files.length; i++) {
        let item = files[i];
        let ret = await File.create({savePath: item.path, fileName: item.filename, mimeType: item.mimetype, size: item.size, originalname: item.originalname, account: ctx.req.body.account});
        f.push({_id: ret.id});
    }
    ctx.success(f);
});

/**
 * 文件下载
 *
 */
router.get('/downLoadFile', async function (ctx, next) {
    let {fileId} = ctx.query;
    let f = await File.findOne({where: {id: fileId}, raw: true});
    ctx.res.setHeader('Content-disposition', `attachment; filename=${encodeURIComponent(f.originalname)};filename*=utf-8${f.fileName}`);
    ctx.res.setHeader('Content-type', f.mimeType);
    f.size ? ctx.res.setHeader("Content-Length", Number(+f.size).toString()) : '';
    ctx.body = fs.createReadStream(path.resolve(process.env.dataDir, f.savePath));

});


router.get('/test', async function (ctx, next) {
   throw new commonError.PermissionDelied();
});

/**
 * 注册
 */
router.post('/signUp', async (ctx, next) => {
    let {password, phone, username, email, account} = util.getParams(ctx.request.body);
    let u = await User.findOne({where: {phone}, raw: true});
    if(u) {
        throw new commonError.UserIsExist();
    }else {
        password = security.sign(password);
        let u = await User.create({username, phone, email, password, account});
        ctx.success('signUp successful!');
    }
});


/**
 * 登陆
 */
router.post('/signIn', async (ctx, next) => {
    let {phone, email, password, account} = util.getParams(ctx.request.body);
    let u = await User.findOne({where: {account}, raw: true});
    if(!u) {
        throw new commonError.UserIsNotExist();
    }else {
        password = security.sign(password);
        if(u.password != password) {
            throw new commonError.PasswordError();
        }else {
            let token = ctx.sign(u.id);
            await ctx.setSession(u, token);
            ctx.setSession(u, token);
            ctx.success({token});
        }
    }
});
module.exports = router;
