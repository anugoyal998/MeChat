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

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEDN_URL,
    method: ["GET", "POST"],
  },
});

// middlewares
app.use(cors({ origin: [process.env.FRONTEDN_URL]}));
app.use(express.json());
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "someting went wrong" });
});
app.use("/", router);
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

/****  Socket.io   ****/


let arr = []

const addUserToArray = ({user,id})=> {
	const findUser = arr.find(e=> e?.user?._id === user?._id)
	if(findUser)return
	arr.push({user,id})
}

const removeUserFromArray = ({id}) => {
	arr = arr.filter(e=> e?.id !== id)
}

const getSocketIdFromUserID = ({id}) => {
	const find = arr.find(e=> e?.user?._id === id)
	return find?.id
}

io.on('connection',socket=> {
	const id = socket?.id
	// join room
	socket.on('user-online',data=> {
		addUserToArray({user: data, id})
		io.emit('activeUsers',arr)
	})
	// send msg
	socket.on('send-msg',data=> {
		const recieverSocketId = getSocketIdFromUserID({id: data?.reciever})
		io.to(recieverSocketId).emit('rec-msg',{data,time: Date.now()})
	})
	// disconnect
	socket.on('disconnect',()=> {
		removeUserFromArray({id})
		io.emit('activeUsers',arr)
	})
})

/****  Socket.io   ****/

// listen app
server.listen(PORT, () => {
	console.log(`listening on ${PORT}`);
});
