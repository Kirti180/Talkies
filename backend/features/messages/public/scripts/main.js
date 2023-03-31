const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const  userList = document.getElementById("users");

const urlParams =  new URLSearchParams(window.location.search)

const username = urlParams.get('username');
const room = urlParams.get("room");



const socket = io("http://localhost:8080/",{transports:["websocket"]});

socket.emit("joinRoom",({username,room}));

socket.on("message",(message)=>{

    outputMessage(message);

})



// Sending message

chatForm.addEventListener("submit",(e)=>{
    e.preventDefault()

    let msg  = e.target.elements.msg.value;

    msg  = msg.trim();

    if(!msg){
        return false;
    }

    socket.emit('chatMessage',msg);
    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();

})

socket.on("roomUsers",({room,users})=>{

    roomName.innerText= room;

outputRoomUsers(users)

})


function outputRoomUsers(users){
    
    userList.innerHTML = '';

    users.forEach(user => {
        const li = document.createElement("li");
        li.innerText = user.username;
        userList.appendChild(li)
    });
}

//outPut message

function outputMessage(message){

    const div = document.createElement("div");
    div.classList.add("message");

    const p = document.createElement("p");

    p.classList.add("meta");

    p.innerText = message.username;

    p.innerHTML += `<span>${message.time}</span>`;

    div.appendChild(p);

    const para = document.createElement("p");

    para.classList.add("text");
    para.innerText = message.text;


    div.appendChild(para);
    chatMessages.appendChild(div);
    

}