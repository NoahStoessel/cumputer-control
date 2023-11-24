const hostname = document.getElementById("hostname");
const password = document.getElementById("password");
const shell = document.getElementById("shell")
const label = document.getElementById("test")
let state = 0
let og_location = window.location.origin
let url_location = new URL(og_location)
let url_page = url_location.hostname


async function request_connect(){
  let user = hostname.value
  let pass = password.value
  let url = 'http://' + url_page + ':5000/connect/?username=' + user + '&password=' + pass

  fetch_api(url) 
  url = 'http://' + url_page + ':5000/status/'
  let response = await fetch_api(url)
  console.log(response)
  if(response == "Connected"){
    console.log("We are succesfully connected")
  }

  
  return 0
}
async function fetch_api(url){
  console.log('connecting to:', url)
  let response = await fetch(url, {
    mode: 'cors'
  })
  
  if(!response.ok){
    console.error("Invalid HTTP request")
  }
  console.log(response.status)
  let text = await response.text()

  return text
}
async function disconnect(){

  let url = 'http://' + url_page + ':5000/disconnect/'
  
  fetch_api(url, mode='no-cors')

  return 0
}
async function command(){
  console.log("sending command:", shell.value)
  let url = 'http://' + url_page + ':5000/command/?command=' + shell.value

  let output = await fetch_api(url)

  label.innerHTML = output

  return 0
}

//while(true){
//  if (state == 1){
//    console.log("Connected Succesfully!")
//    state := 
//  }
//}

// endpoint /connect/?username=name&password=password
// should return 1 0r 0 depending on status of connection

