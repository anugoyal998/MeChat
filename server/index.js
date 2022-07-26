require("dotenv").config();
require("./db")();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const router = require("./router");
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", process.env.CLIENT],
    method: ["GET", "POST"],
  },
});

app.use(cors({ origin: ["http://localhost:3000", process.env.CLIENT] }));
app.use(express.json());
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



server.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
