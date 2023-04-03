const PRE = "Room ID is"
const SUF = ""

var room_id;
// THESE ALL ARE MEDIA CALL HERE________
const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
var local_stream;
var screenStream;

var peer = null;
var currentPeer = null;
var screenSharing = false;


// create room function...
function createRoom() {
    console.log("Room has been created")
    const room = document.getElementById("room-input").value;
//     const urlParams = new URLSearchParams(window.location.search);
// const roomID = urlParams.get('roomID');

    // check room should not empty.
    if (room == " " || room == " ") {
        alert("Please submit room id")
        return;
    }
    room_id = PRE + room + SUF;
    peer = new Peer(room_id);

    
    peer.on('open', (id) => {
        console.log("Peer has joined ID no", id);
        hideModal()
        // media options...
        getUserMedia({ video: true, audio: true },
            (stream) => {
                local_stream = stream;
                setLocalStream(local_stream)
            }, (err) => {
                console.log(err);
            })
        notify("Waiting for the peer to join.")
    })
    peer.on("call", (call) => {
        call.answer(local_stream);
        call.on("stream", (stream) => {
            setRemoteStream(stream);
        })
        currentPeer = call;
    })
}

function setLocalStream(stream) {

    let video = document.getElementById("local-video");
    video.srcObject = stream;
    video.muted = true;
    video.play();
}

function setRemoteStream(stream) {

    let video = document.getElementById("remote-video");
    video.srcObject = stream;
    video.play();
}


function hideModal() {
    document.getElementById("entry-modal").hidden = true;
}

function notify(msg) {

    let notification = document.getElementById("notification");
    notification.innerHTML = msg;
    notification.hidden = false;

    setTimeout(() => {
        notification.hidden = true;
    }, 3000);
}


function joinRoom() {
    console.log('User is Joining Room')

    let room = document.getElementById("room-input").value;
    if (room == " " || room == "") {
        alert("Please enter room number")
        return;
    }
    room_id = PRE + room + SUF;

    hideModal();
    peer = new Peer();
    peer.on("open", (id) => {
        console.log('Connected with ID: ' + id);
        getUserMedia({ video: true, audio: true },
            (stream) => {
                local_stream = stream;
                setLocalStream(local_stream)
                notify("Peer is Joining")
                let call = peer.call(room_id, stream)
                call.on("stream", (stream) => {
                    setRemoteStream(stream);
                })
                currentPeer = call;
            }, (err) => {
                console.log(err);
            }
        )
    })
}

// start sharing here
function startScreenShare(){
    if(screenSharing){
      stopScreenSharing();
    }
    navigator.mediaDevices.getDisplayMedia({
        video:true
    }).then((stream)=>{
        screenStream = stream;
        let videoTrack = screenStream.getVideoTracks()[0];

        videoTrack.onended = ()=>{
            stopScreenSharing()
        }
       
         if(peer){
            let sender = currentPeer.peerConnection.getSenders().find(function(s){
                return s.track.kind == videoTrack.kind;
            })
            sender.replaceTrack(videoTrack)
            screenSharing = true;
         }
         console.log(screenStream)
      
    })
}

function stopScreenSharing(){
    // not sharing than return 
    if(!screenSharing) return ;

    let videoTrack = local_stream.getVideoTracks()[0];

    if(peer){
        let sender = currentPeer.peerConnection.getSenders().find(function(s){
            return s.track.kind == videoTrack.kind;
        })
        sender.replaceTrack(videoTrack);
    }
    screenStream.getTracks().forEach(function(track){
        track.stop();
    });
    screenSharing = false;

}