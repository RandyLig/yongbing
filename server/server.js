const express = require('express')
const userRouter = require('./user')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model.js')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)


io.on('connection', function (socket) {
    socket.on('sendMsg', function (data) {
        const { from, to, msg } = data
        const chatid = [from, to].sort().join('_')
        //创建chat数据
        Chat.create({ chatid, from, to, content: msg }, function (err, doc) {
            //发送到全局
            io.emit('reciveMsg', Object.assign({}, doc._doc))
        })

    })
})

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)

server.listen(9093, function () {
    console.log('启动成功')
})