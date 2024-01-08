//load .env files
require("dotenv").config();

const express = require("express");
const cors = require("cors");
//importing connection string to index .js coz index js is the file which is running
 require('./DB_Connection/connection')
//creating server
const hostelServer = express();
//use cors in server
hostelServer.use(cors());
//import router
const router = require("./Routes/routes");

//PARse json data using server app and express.json is a middleware
hostelServer.use(express.json());
//use router only after cors and json parse
hostelServer.use(router);
const PORT = 5000 || process.env.PORT;
//to  run server app

hostelServer.listen(PORT, () => {
  console.log(`hostel sever started at ${PORT}`);
});

//resolve request to //port 5000

hostelServer.get("/",(req, res) => {
  res.send(
    `<h1> hostel server statred and got a get request at port ${PORT}!!</h1>`
  );
});

hostelServer.post("/", (req, res) => {
  //   res.send("yayy, we got the post")
  res.status(200).json("register request received to ");
});
//https://github.com/BootstrapDash/corona-react-free-admin-template/tree/main