const express = require("express");
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const connectMongooseDB = require("./db/index");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static(__dirname + "/static"));
connectMongooseDB();

const mainRoute = require("./routes/index");
const authCustomer = require("./routes/authentication");
const auth = require('./controllers/auth');

app.use("/authentication", authCustomer);
app.use("/", mainRoute);

io.on('connection', socket => {
	socket.on('userData', async (data) =>{
		const userStatus = await auth.checkUser(data)
		socket.emit("userStatus", userStatus);
	})
});

http.listen(process.env.PORT_SERVER, () =>
  console.log(`${process.env.PORT_SERVER} you in this port now`)
);