const express = require("express")
const app = require("./app");
const path = require('path');

const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });

//config
dotenv.config({path:"config/.env"});

//Connecting to database
connectDatabase();

app.use(express.static(path.join(__dirname,'/build')));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname,'/build/index.html')); });

//connecting to the port
let port = parseInt(process.env.PORT);
const server =app.listen(port,()=>{
    console.log(`Server is working on ${port}`);
});

// Unhandled promise rejections
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to unhandled Promise Rejection`);
    server.close(()=>{
      process.exit(1);
    });
  });