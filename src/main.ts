import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app: any = express()
const server: any = http.createServer(app)
const io: any = new Server(server)

app.get('/', (req:any, res:any)=>{
    res.sendFile(__dirname + '/static/index.html')
})

io.on('connection', (socket: any)=>{
    console.log('a user connected')

    // disconnect
    socket.on('disconnect', ()=>{
        console.log('user disconnected')
    })
    // get message
    socket.on('chat message', (msg: any)=>{
        console.log('message: ' + msg)
        // socket.broadcast.emit(msg)
        io.emit('chat message', msg)
    })
})

server.listen(3000, ()=>{
    console.log('start app server')
})
