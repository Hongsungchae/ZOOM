const express  = require('express');
const http  = require('http');
const WebSocket = require("ws")
const app = express();
//실행 명령어 npm run dev
app.set("view engine", "pug");
app.set("views",__dirname+ "/views");
app.use("/public", express.static(__dirname+"/public")); // 유저가 public까지 볼 수 있음
app.get("/", (_,res)=>res.render("home"));
app.get("/*",(_,res)=>res.redirect("/"));

const handleListen = () => console.log('http://localhost:3000');
const server = http.createServer(app);

const wss = new WebSocket.Server({server});

const sockets = [];

wss.on("connection",(socket)=>{
    sockets.push(socket);
    socket["nickname"] = "Anon";
    console.log("Conneted to Browser");
    socket.on("close",()=>console.log("Disconneted to Server"));
    socket.on("message",(msg)=>{
        const message = JSON.parse(msg);
        switch(message.type){
            case "new_message":
                sockets.forEach(aSocket=>
                    aSocket.send(`${socket.nickname} : ${message.payload}`)
                ); 
                break;
//                message.forEach(aSocket=>aSocket.send(mesaage.payload.toString('utf8')));
            case "nickname":
                socket["nickname"] = message.payload;
                break;
        }  
        
        //socket.send(message.toString('utf8'));
    });
})
server.listen(3000, handleListen);

