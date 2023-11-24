const express = require("express")
const app = express()
const cors = require("cors")
const { exec } = require('child_process');
const username_set = "spectrum"
const password_set = "paradox"
let state = 0
const corsOptions = {
  origin: "*",
};

let user_exists = false
let password_exists = false

function verify_connect(username, password) {
  if(username == username_set){
    user_exists = true
    console.log("Username Good!")
  }
  if(password == password_set){
    password_exists = true
    console.log("Password Good!")
  }

  return 0
}
function run_command(command) {
  return new Promise((resolve, reject) =>{
    exec(command, (error, stdout, stderr) => {
      if(error){
        console.log("Failed to execute command")
        resolve(stdout.trim())
      }
      else {
        resolve(stdout.trim())
      }
    })
  })
}
app.use(cors(corsOptions))

app.get('/', (req, res) => {
  res.send("All Good!")
})
app.get('/connect/', (req, res) => {
  verify_connect(req.query.username, req.query.password)
  console.log("attempted to connect with name", req.query.username, "and password", req.query.password)
})

app.get('/disconnect/', (req, res) => {
  state = 0
  console.log("Disconnecting from server!")
  console.error("Server Disconnected")
})

app.get('/status/', (req, res) => {
  console.log("Checking status...")
  if(user_exists && password_exists){
    state = 1
    console.log("Logged in succesfully as:", username_set)
    res.send("Connected")
  }
  else {
    console.log("incorrect username or password")
  }
})

app.get('/command/', async (req, res) => {
  console.log("Attempting to run command:", req.query.command)
  if (state == 1){
  console.log("Running: ", req.query.command)
  let output = await run_command(req.query.command)
  console.log(output)
  res.send(output)
  }
  else {
    console.log("Not Connected!")
    res.send("NOT CONNECTED!")
  }
})

app.listen(5000, () => {
  console.log("Im live on port 5000")
})
