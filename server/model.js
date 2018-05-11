const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/lg'
mongoose.connect(DB_URL)


const models = {
    user: {
        'user': { 'type': String, require: true },
        'pwd': { 'type': String, require: true },
        'type': { 'type': String, require: true },
        //头像
        'avatar': { 'type': String },
        //个人简介
        'desc': { 'type': String },
        'nickname': { 'type': String },
        'age': { 'type': String },
        'sex': { 'type': String },
        'home': { 'type': String },
        //个人简介
        'resume': { 'type': String },
        //特长
        'specialities': { 'type': String },
        //任务目标
        'taskname': { 'type': String },
        //任务详情
        // 'desc': { 'type': String },
    },
    //聊天
    chat: {
        'chatid': { 'type': String, require: true },
        'from': { 'type': String, require: true },
        'to': { 'type': String, require: true },
        'content': { 'type': String, require: true, default: '' },
        'create_time': { 'type': Number, default: new Date().getTime() },
        'read': { 'type': Boolean, default: false }
    },
    //任务
    task: {
        'taskname': { 'type': String, require: true },
        'detail': { 'type': String, require: true, default: '暂无描述' },
        //确定发起任务的人
        'bossid': { 'type': String, require: true },
        //确定完成任务的人
        'yongbing': { 'type': String },
        'yongbingid': { 'type': String },
        'files': { 'type': Array },
        'reward': { 'type': Number },
        //任务类别(暂无)
        'type': { 'type': String },
        //完成
        'done': { 'type': Boolean, default: false, require: true },
        'create_time': { 'type': Number, default: new Date().getTime() },
        //是否进行中
        'accept': { 'type': Boolean, default: false },
        //属性表示是否在请求状态
        'request': { 'type': Boolean, default: false }
    },
    //评价
    evaluate: {
        //评价
        'evaluate': { 'type': String, require: true },
        //图片
        'files': { 'type': Array },
        'boss': { 'type': String, require: true },
        'yongbing': { 'type': String, require: true },
        'visiable': { 'type': Boolean, require: true, default: false },
        'chatid': { 'type': String, require: true },
        //好评
        'praise': { 'type': String, require: true },
        'done': { 'type': Boolean, require: true },
        'create_time': { 'type': Number, default: new Date().getTime() },
    },
}

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function (name) {
        return mongoose.model(name)
    }
}