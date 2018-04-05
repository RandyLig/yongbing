const express = require('express')
const Router = express.Router()
const model = require('./model.js')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const Task = model.getModel('task')
const util = require('utility')
const _filter = {
    pwd: 0,
    __v: 0
}
//清空聊天数据
// Chat.remove({}, function (e, d) {

// })
Router.get('/list', function (req, res) {
    // 清空list下所有数据
    // User.remove({}, function (e, d) {})
    const { type } = req.query
    User.find({ type }, function (err, doc) {
        return res.json({ code: 0, data: doc })
    })
})

Router.get('/tasklist', function (req, res) {
    // 清空tasklist下所有数据
    // User.remove({}, function (e, d) {})

    Task.find({}, function (err, doc) {
        return res.json({ code: 0, data: doc })
    })
})
//huoqu chat xinxi
Router.get('/getMsglist', function (req, res) {
    //获取 userid
    const user = req.cookies.userid
    User.find({}, function (e, d) {
        let users = {}
        d.forEach(v => {
            users[v._id] = { name: v.user, avatar: v.avatar }
        })
        // { '$or': [{ from: user, to: user }] }
        Chat.find({ '$or': [{ from: user }, { to: user }] }, function (err, doc) {
            if (!err) {
                return res.json({ code: 0, msgs: doc, users: users })
            }
        })
    })

})

//登录
Router.post('/login', function (req, res) {
    //获取请求的数据
    const { user, pwd } = req.body
    //查询验证用户名密码是否正确 ,{pwd:0} 表示不返回pwd数据
    User.findOne({ user, pwd: util.md5(pwd) }, _filter, function (err, doc) {
        if (!doc) {
            return res.json({ code: 1, msg: '用户名或密码错误' })
        }
        res.cookie('userid', doc._id)
        return res.json({ code: 0, data: doc })
    })
})


//注册
Router.post('/register', function (req, res) {
    const { user, pwd, type } = req.body
    User.findOne({ user }, function (err, doc) {
        if (doc) {
            return res.json({ code: 1, msg: '用户已存在' })
        }
        //创建数据 另外pwd用util密码加密
        //用save方法是为了获得_id,用creat方法取不到_id
        const UserModel = new User({ user, pwd: util.md5(pwd), type })
        UserModel.save(function (e, d) {
            if (e) {
                return res.json({ code: 1, msg: '后台出错啦' })
            }
            const { user, _id, type } = d
            // 重要，注册cookie
            res.cookie('userid', _id)
            return res.json({
                code: 0, data: { user, _id, type }
            })
        })
    })
})
Router.get('/info', function (req, res) {
    const { userid } = req.cookies
    if (!userid) {
        return res.json({ code: 1 })
    }
    User.findOne({ _id: userid }, _filter, function (err, doc) {
        if (err) {
            return res.json({ code: 1, msg: '后台出错了' })
        }
        return res.json({ code: 0, data: doc })
    })
})


// 完善信息后
Router.post('/update', function (req, res) {
    const userid = req.cookies.userid
    if (!userid) {
        return res.json({ code: 1 })
    }
    const body = req.body
    User.findByIdAndUpdate(userid, body, function (err, doc) {
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type
        }, body)
        return res.json({ code: 0, data })
    })
})

// 标记已读 
Router.post('/hadread', function (req, res) {
    //获取请求的数据
    const userid = req.cookies.userid
    const { from } = req.body
    Chat.update({ from, to: userid }
        , { read: true }
        , { 'multi': true }
        , function (err, doc) {
            if (!err) {

                return res.json({ code: 0, num: doc.nModified })
            }
            return res.json({ code: 1, msg: '修改失败' })
        })
})
//标记任务完成
Router.post('/haddone', function (req, res) {
    //获取请求的数据
    const userid = req.cookies.userid
    const { from } = req.body
    Task.update({ from, to: userid }
        , { read: true }
        , { 'multi': true }
        , function (err, doc) {
            if (!err) {

                return res.json({ code: 0, num: doc.nModified })
            }
            return res.json({ code: 1, msg: '修改失败' })
        })
})

//发布任务
Router.post('/addTask', function (req, res) {
    const userid = req.cookies.userid
    //确定发起任务boss 的id
    const bossid = userid
    const { taskname, detail, time, reward, _id } = req.body
    Task.findOne({ taskname }, function (err, doc) {
        if (doc) {
            return res.json({ code: 1, msg: '该任务已存在' })
        }
        //用save方法是为了获得_id,用creat方法取不到_id
        const TaskModel = new Task({ taskname, detail, time, reward, bossid, _id })
        TaskModel.save(function (e, d) {
            if (e) {
                return res.json({ code: 1, msg: '后台出错啦' })
            }
            const { taskname, detail, time, reward, _id, type, bossid } = d
            // 重要，注册cookie
            // res.cookie('taskid', _id)
            return res.json({
                code: 0, data: { taskname, detail, time, reward, _id, type, bossid }
            })
        })
    })
})


module.exports = Router