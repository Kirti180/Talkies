const socket = io('http://localhost:5000/');
const videoDiv = document.getElementById('videoDiv');
const myPeer = new Peer();

const video = document.createElement('video');
video.muted = true;

//To keep track of user connected 
const userConnected = {}
// s
// The function will be returning a promise so it will be executed at the end
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {

    // Invoking function to append client's video in the video element
    addStream(video, stream)

    //When Someone call us
    myPeer.on('call', (call) => {

        //--For receiving Calls--

        //answered call and sending our current stream
        call.answer(stream)

        //responding to coming videoStream and adding the another client's stream in our video element
        const video = document.createElement('video');
        call.on('stream', (userStream) => {
            addStream(video, userStream)
        })
    })

    socket.on('user-join', (userID) => {
        connectNewUser(userID, stream);
    })

}).catch(err => {
    console.log(err);
})

// Whenever a peer connects, sending the peer/user id to the server
myPeer.on('open', (id) => {
    // ID is used to connect other peer
    // console.log(id);
    const RoomID = localStorage.getItem("RoomID");
    // console.log(RoomID)
    socket.emit('join-room', RoomID, id);
})


// when any of the client leaves
socket.on('user-disconnected', (userID) => {
    //To close the conneciton of disconnected user
    if (userConnected[userID]) {
        userConnected[userID].close();
    }
})


// Series of events:-
// 1. when new user connects here we are creating a new video element, by the peer id 
const connectNewUser = (userID, stream) => {

    //--Make call when new user connects to our room--

    const call = myPeer.call(userID, stream);
    const video = document.createElement('video');

    call.on('stream', (userStream) => {
        addStream(video, userStream)
    })

    call.on('close', () => {
        video.remove()
    })

    //Add to object whenever new user joins
    userConnected[userID] = call;
}


// Appending the video stream to video container
const addStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    })
    videoDiv.append(video)
}

// let hangup = document.getElementById("hangup");
// hangup.onclick = () => {
//     // console.log("Call cut");
//     window.location.href("https://icons.veryicon.com/png/o/miscellaneous/cloud-call-center/hang-up.png")
// }