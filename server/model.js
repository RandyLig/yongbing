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
        'desc': { 'type': String },
    },
    //聊天
    chat: {
        'chatid': { 'type': String, require: true },
        'from': { 'type': String, require: true },
        'to': { 'type': String, require: true },
        'content': { 'type': String, require: true, default: '' },
        'create_time': { 'type': Number, default: new Date().getTime() },
        'read': { 'type': Boolean, default: false }
    }
}

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function (name) {
        return mongoose.model(name)
    }
}