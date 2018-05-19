
const express = require('express')
const Router = express.Router()
const model = require('./model.js')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const Task = model.getModel('task')
const Evaluate = model.getModel('evaluate')
const util = require('utility')
const _filter = {
    pwd: 0,
    __v: 0
}
//清空聊天数据
// Chat.remove({}, function (e, d) {})
// 清空list下所有数据
// User.remove({}, function (e, d) {})
// })
// 清空tasklist下所有数据
// Task.remove({}, function (e, d) {})
// Evaluate.remove({}, function (e, d) { })
//获取type=?的列表
Router.get('/list', function (req, res) {
    const { type } = req.query
    User.find({ type }, function (err, doc) {
        return res.json({ code: 0, data: doc })
    })
})
//获取评价信息
Router.get('/getevaluate', function (req, res) {
    Evaluate.find({}, function (err, doc) {
        //获取评论时的boss昵称
        // const { bossid } = doc
        // console.log(bossid)
        User.find({}, function (e, d) {
            return res.json({ code: 0, data: doc, data2: d })
        })
        // return res.json({ code: 0, data: doc })
    })
})
//获取评价信息(特定)
Router.get('/getevaluateOne', function (req, res) {
    const { taskid } = req.query
    // console.log({ taskid })
    Evaluate.find({ taskid }, function (err, doc) {
        const boss = doc[0].boss
        // console.log('boss:', boss, '111:', doc)
        User.findOne({ _id: boss }, function (e, d) {
            const { nickname, avatar } = d
            return res.json({ code: 0, data: doc, bossname: nickname, avatar: avatar })
        })
    })
})
//评价
Router.post('/evaluate', function (req, res) {
    const { evaluate, files, praise, taskid } = req.body
    // const boss = from
    // const yongbing = user
    const done = true
    Evaluate.update({ taskid }, { evaluate, files, praise, done, create_time: new Date().getTime() }, function (err, doc) {

        if (err) {
            return res.json({ code: 1, msg: '后台出错啦' })
        }
        return res.json({
            code: 0, data: doc
        })
    })
    // const { evaluate, files, praise, from, user, chatid } = req.body
    // const boss = from
    // const yongbing = user
    // const done = true
    // // console.log(praise)
    // const EvaluateModel = new Evaluate({ evaluate, files, praise, boss, yongbing, chatid, done })
    // EvaluateModel.save(function (e, d) {
    //     if (e) {
    //         return res.json({ code: 1, msg: '后台出错啦' })
    //     }
    //     return res.json({
    //         code: 0, data: d
    //     })
    // })


})
//Boss删除任务
Router.post('/canceltask', function (req, res) {
    const { taskid } = req.body
    // console.log(taskid)
    Task.deleteOne({ _id: taskid }, function (err, doc) {
        // console.log(doc)
        Task.find({}, function (e, d) {
            return res.json({ code: 0, data: d })
        })
    })
})
//查询符合地区条件的用户
Router.get('/listArea', function (req, res) {
    const { type, home } = req.query
    // const { home } = req.body
    // console.log({ home })
    User.find({ type, home: eval("/" + home + "/g") }, function (err, doc) {
        return res.json({ code: 0, data: doc })
    })
})
//根据任务标题查询
Router.get('/tasktitle', function (req, res) {
    const { title } = req.query

    Task.find({ taskname: eval("/" + title + "/g") }, function (err, doc) {
        return res.json({ code: 0, data: doc })
    })
})
//根据任务内容查询
Router.get('/taskdetail', function (req, res) {
    const { detail } = req.query

    Task.find({ detail: eval("/" + detail + "/g") }, function (err, doc) {
        return res.json({ code: 0, data: doc })
    })
})
Router.get('/tasklist', function (req, res) {
    Task.find({}, function (err, doc) {
        return res.json({ code: 0, data: doc })
    })
})
//获取单个任务 以获得其信息
Router.get('/tasklistOne', function (req, res) {
    const { taskid } = req.query
    Task.find({ _id: taskid }, function (err, doc) {
        return res.json({ code: 0, data: doc })
    })
})
//获取请求状态中的任务
Router.get('/requesttask', function (req, res) {
    // 清空tasklist下所有数据
    // Task.remove({}, function (e, d) {})
    Task.find({ requset: true }, function (err, doc) {
        return res.json({ code: 0, data: doc })
    })
})
//获取聊天数据
Router.get('/getMsglist', function (req, res) {
    //获取 userid
    const user = req.cookies.userid
    User.find({}, function (e, d) {
        let users = {}
        d.forEach(v => {
            users[v._id] = { name: v.nickname, avatar: v.avatar }
        })
        // { '$or': [{ from: user, to: user }] }
        //'或'查询
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
        //讲user的_id注册为cookie
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

//首次登录完善信息
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
    // console.log(from)
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
    // 获取当前任务的id
    const { taskid, yongbingid, chatid, taskname } = req.body
    // const { boss } = userid
    // //先查找到yongbingid
    // console.log({ taskid, boss: userid, yongbing: yongbingid, chatid })
    const EvaluateModel = new Evaluate({ taskid, boss: userid, yongbing: yongbingid, chatid, visiable: true, taskname })
    EvaluateModel.save(function (a, b) {
        if (a) {
            return res.json({ code: 1, msg: '后台出错啦' })
        }
        //标记任务完成
        Task.findByIdAndUpdate(
            { _id: taskid }
            , { done: true, create_time: new Date().getTime() }
            // , { 'multi': true }
            , function (err, doc) {
                if (!err) {
                    return res.json({ code: 0, data: doc, data2: b })
                }
                return res.json({ code: 1, msg: '修改失败' })
            })
    })



    //找到当前任务返回
    // Task.findOne(_id, function (err, doc) {
    //     if (err) {
    //         return res.json({ code: 1, msg: '后台出错了' })
    //     }
    //     return res.json({ code: 0, data: doc })
    // })
})

//佣兵请求接受任务
Router.post('/accepttask', function (req, res) {
    //获取佣兵的id
    const userid = req.cookies.userid
    //获取当前请求任务的id
    const { taskid } = req.body
    const _id = taskid
    //根据佣兵id获取其用户名再返回给task
    User.findOne({ _id: userid }, function (e, d) {
        name = d.nickname
        Task.findByIdAndUpdate(
            _id
            , { yongbing: name, yongbingid: userid, request: true }
            // , { 'multi': true }
            , function (err, doc) {
                if (!err) {
                    return res.json({ code: 0, data: doc })
                }
                return res.json({ code: 1, msg: '修改失败', err: err })
            })
    })

})

//Boss确认该佣兵接受任务
Router.post('/checktask', function (req, res) {
    //获取请求的数据
    const bossid = req.cookies.userid
    // 获取当前任务的id
    const { taskid } = req.body
    const _id = taskid
    //标记任务完成
    Task.findByIdAndUpdate(
        _id
        , { accept: true, request: false }
        // , { 'multi': true }
        , function (err, doc) {
            Task.find({}, function (e, d) {
                return res.json({ code: 0, data: d })
            })
            // return res.json({ code: 1, msg: '修改失败' })
        })

})
//发布任务
Router.post('/addTask', function (req, res) {
    const userid = req.cookies.userid
    //确定发起任务boss 的id
    const bossid = userid
    const { taskname, detail, time, reward, _id, yongbingid, files } = req.body
    Task.findOne({ taskname }, function (err, doc) {
        if (doc) {
            return res.json({ code: 1, msg: '该任务已存在' })
        }
        //用save方法是为了获得_id,用creat方法取不到_id
        const TaskModel = new Task({ taskname, detail, time, reward, bossid, _id, yongbingid, files })
        TaskModel.save(function (e, d) {
            if (e) {
                return res.json({ code: 1, msg: '后台出错啦' })
            }
            const { taskname, detail, time, reward, _id, type, bossid, yongbingid, files } = d
            // 重要，注册cookie
            // res.cookie('taskid', _id)
            return res.json({
                code: 0, data: d
            })
        })
    })
})


module.exports = Router