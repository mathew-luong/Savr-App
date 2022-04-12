const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);

const { createProxyMiddleware } = require('http-proxy-middleware');

app.use(
    '/',
    createProxyMiddleware(
        { target: "http://localhost:3000", changeOrigin: true }
    )
);
io.on('connection', socket => {
    //initial message
    socket.emit('message', 'welcome to savr');
    //listen for chatMessage
    socket.on('message', msg => {
        socket.broadcast.emit('incomingMessage', msg);
    })
});

server.listen(3100, () => { console.log("Server started in port 3100"); });