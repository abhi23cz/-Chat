const socket = io()

let name;

do {
  name = prompt("Enter Your name to join in the chat")
} while (!name);

let textarea = document.getElementById('message_inp')
let message_area = document.getElementById('append')

textarea.addEventListener('keyup', (e) =>{

  if(e.key == 'Enter'){
    send_msg(e.target.value)
  }
})

function send_msg(message){
  let msg = {
    user : name,
    message:message
  }

  append_msg(msg, 'right')
  socket.emit('message', msg)
  textarea.value = ""
}

function append_msg(msg, type){

  let container = document.getElementById('append')

  let new_amaz = document.createElement('div')
  new_amaz.className = `amazing ${type}`
  markup = `
  <p>${msg.user}: ${msg.message}</p>`

  new_amaz.innerHTML = markup
  container.appendChild(new_amaz)


}

socket.on('message', (msg) =>{
  append_msg(msg, 'left')
})
