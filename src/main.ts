import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app: any = express()
const server: any = http.createServer(app)
const io: any = new Server(server)

app.get('/', (req:any, res:any)=>{
    res.sendFile(__dirname + '/static/top.html')
})
app.get('/room', (req:any, res:any)=>{
    res.sendFile(__dirname + '/static/index.html')
})

io.on('connection', (socket: any)=>{
    console.log('client connected')

    // disconnect
    socket.on('disconnect', ()=>{
        console.log('user disconnected')
        io.emit('leave', {
            'socket_id': socket.id
        })
    })

    // get message
    socket.on('user_status', (msg: any)=>{
        msg['socket_id'] = socket.id
        console.log(msg)
        io.emit('user_status', msg)
    })
    socket.on('request_status', (msg: any)=>{
        console.log(msg)
        io.emit('request_status', msg)
    })
})

server.listen(3000, ()=>{
    console.log('start app server')
})
