require("dotenv").config(); // dotenv config
require("./db")(); // db connect
const express = require("express"); // express
const app = express(); // express app
const cors = require("cors"); // cors
const router = require("./router"); // router
const PORT = process.env.PORT || 5000; // port

// middlewares
app.use(cors({ origin: [process.env.FRONTEDN_URL], credentials: true }));
app.use(express.json());
app.use((err, req, res, next) => {
  // console.log(err)
  res.status(500).send({ msg: "someting went wrong" });
});
app.use("/", router);
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

//listen app
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
