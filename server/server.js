require("dotenv").config(); // dotenv config
require("./db")(); // db connect
const express = require("express"); // express
const app = express(); // express app
const http = require("http"); // http
const server = http.createServer(app); // http server
const { Server } = require("socket.io"); // socket.io server
const cors = require("cors"); // cors
const router = require("./router"); // router
const PORT = process.env.PORT || 5000; // port
const cookieParser = require("cookie-parser"); // cookie parser
const upload = require("express-fileupload"); // fileupload

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEDN_URL,
    method: ["GET", "POST"],
  },
});

// middlewares
app.use(cors({ origin: [process.env.FRONTEDN_URL], credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "someting went wrong" });
});
app.use(upload());
app.use("/", router);
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

/****  Socket.io   ****/
// let users = []

// const addUser = (user,socketId) => {
// 	!users.some(e=> e?.user?._id === user?._id) && users.push({user, socketId})
// }

// const getUser = (userId) => {
// 	return users.find(user=> user?.user?._id === userId)
// }

// const removeUser = (socketId) => {
// 	users = users.filter(user=> user?.socketId !== socketId)
// }

// io.on("connection",(socket) => {
// 	const id = socket.handshake.query.id
// 	socket.join(id)
// 	// connect
// 	socket.on('addUser',user=> {
// 		addUser(user,id)
// 		io.emit('getUsers',users)
// 	})
// 	// send message
// 	socket.on('sendMessage',({sender, reciever, msgType, msg})=> {
// 		const user = getUser(reciever)
// 		console.log(user)
// 		io.to(user?.socketId).emit('getMessage',{sender, msgType, msg})
// 	})
// 	//disconnect
// 	socket.on('disconnect',()=> {
// 		removeUser(id)
// 		io.emit('getUsers',users)
// 	})
// })









/****  Socket.io   ****/

let arr = []

const addUserToArray = ({user,id})=> {
	const findUser = arr.find(e=> e?.user?._id === user?._id)
	if(findUser)return
	arr.push({user,id})
}

io.on('connection',socket=> {
	const id = socket?.id
	// join room
	socket.on('user-online',data=> {
		addUserToArray({user: data, id})
		io.emit('activeUsers',arr)
	})
})



//listen app
server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
