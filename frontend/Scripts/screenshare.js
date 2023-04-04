<<<<<<< HEAD:frontend/Scripts/screenshare.js
// const PRE = "Room ID is"
// const SUF = ""
=======
const PRE = "Talkies";
const SUF = "";
>>>>>>> 855eb2f26764dfe5e9f55f4ace67fc767ba31f5b:backend/features/screenshare/app.js

var room_id;
// THESE ALL ARE MEDIA CALL HERE________
const getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia;
var local_stream;
var screenStream;

var peer = null;
var currentPeer = null;
var screenSharing = false;
const urlParams = new URLSearchParams(window.location.search);
const room = urlParams.get('roomID');

// create room function...
function createRoom() {
<<<<<<< HEAD:frontend/Scripts/screenshare.js
    console.log("Room has been created");

    // check room should not empty.
    // if (room == " " || room == " ") {
    //     alert("Please submit room id")
    //     return;
    // }

    room_id = room;
    peer = new Peer(room_id);


    peer.on('open', (id) => {
        console.log("Peer has joined ID no", id);
        // hideModal()
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
=======
  console.log("Room has been created");
  const room = document.getElementById("room-input").value;

  // check room should not empty.
  if (room == " " || room == " ") {
    alert("Please submit room id");
    return;
  }
  room_id = PRE + room + SUF;
  peer = new Peer(room_id);

  peer.on("open", (id) => {
    console.log("Peer has joined ID no", id);
    hideModal();
    // media options...
    getUserMedia(
      { video: true, audio: true },
      (stream) => {
        local_stream = stream;
        setLocalStream(local_stream);
      },
      (err) => {
        console.log(err);
      }
    );
    notify("Waiting for the peer to join.");
  });
  peer.on("call", (call) => {
    call.answer(local_stream);
    call.on("stream", (stream) => {
      setRemoteStream(stream);
    });
    currentPeer = call;
  });
>>>>>>> 855eb2f26764dfe5e9f55f4ace67fc767ba31f5b:backend/features/screenshare/app.js
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

<<<<<<< HEAD:frontend/Scripts/screenshare.js

// function hideModal() {
//     document.getElementById("entry-modal").hidden = true;
// }
=======
function hideModal() {
  document.getElementById("entry-modal").hidden = true;
}
>>>>>>> 855eb2f26764dfe5e9f55f4ace67fc767ba31f5b:backend/features/screenshare/app.js

function notify(msg) {
  let notification = document.getElementById("notification");
  notification.innerHTML = msg;
  notification.hidden = false;

  setTimeout(() => {
    notification.hidden = true;
  }, 3000);
}

function joinRoom() {
<<<<<<< HEAD:frontend/Scripts/screenshare.js
    console.log('User is Joining Room')

    // let room = document.getElementById("room-input").value;
    // if (room == " " || room == "") {
    //     alert("Please enter room number")
    //     return;
    // }
    room_id = room;

    // hideModal();
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
=======
  console.log("User is Joining Room");

  let room = document.getElementById("room-input").value;
  if (room == " " || room == "") {
    alert("Please enter room number");
    return;
  }
  room_id = PRE + room + SUF;

  hideModal();
  peer = new Peer();
  peer.on("open", (id) => {
    console.log("Connected with ID: " + id);
    getUserMedia(
      { video: true, audio: true },
      (stream) => {
        local_stream = stream;
        setLocalStream(local_stream);
        notify("Peer is Joining");
        let call = peer.call(room_id, stream);
        call.on("stream", (stream) => {
          setRemoteStream(stream);
        });
        currentPeer = call;
      },
      (err) => {
        console.log(err);
      }
    );
  });
>>>>>>> 855eb2f26764dfe5e9f55f4ace67fc767ba31f5b:backend/features/screenshare/app.js
}

// start sharing here
function startScreenShare() {
<<<<<<< HEAD:frontend/Scripts/screenshare.js
    if (screenSharing) {
        stopScreenSharing();
    }
    navigator.mediaDevices.getDisplayMedia({
        video: true
    }).then((stream) => {
        screenStream = stream;
        let videoTrack = screenStream.getVideoTracks()[0];

        videoTrack.onended = () => {
            stopScreenSharing()
        }

        if (peer) {
            let sender = currentPeer.peerConnection.getSenders().find(function (s) {
                return s.track.kind == videoTrack.kind;
            })
            sender.replaceTrack(videoTrack)
            screenSharing = true;
        }
        console.log(screenStream)

=======
  if (screenSharing) {
    stopScreenSharing();
  }
  navigator.mediaDevices
    .getDisplayMedia({
      video: true,
>>>>>>> 855eb2f26764dfe5e9f55f4ace67fc767ba31f5b:backend/features/screenshare/app.js
    })
    .then((stream) => {
      screenStream = stream;
      let videoTrack = screenStream.getVideoTracks()[0];

      videoTrack.onended = () => {
        stopScreenSharing();
      };

      if (peer) {
        let sender = currentPeer.peerConnection.getSenders().find(function (s) {
          return s.track.kind == videoTrack.kind;
        });
        sender.replaceTrack(videoTrack);
        screenSharing = true;
      }
      console.log(screenStream);
    });
}

function stopScreenSharing() {
<<<<<<< HEAD:frontend/Scripts/screenshare.js
    // not sharing than return 
    if (!screenSharing) return;
=======
  // not sharing than return
  if (!screenSharing) return;
>>>>>>> 855eb2f26764dfe5e9f55f4ace67fc767ba31f5b:backend/features/screenshare/app.js

  let videoTrack = local_stream.getVideoTracks()[0];

<<<<<<< HEAD:frontend/Scripts/screenshare.js
    if (peer) {
        let sender = currentPeer.peerConnection.getSenders().find(function (s) {
            return s.track.kind == videoTrack.kind;
        })
        sender.replaceTrack(videoTrack);
    }
    screenStream.getTracks().forEach(function (track) {
        track.stop();
    });
    screenSharing = false;

}



async function userLoggedIn() {
    const token = localStorage.getItem("token");
    const request = await fetch(`https://talkies-authentication-server-1.onrender.com/user/check`,{
      method:"POST",
      headers:{
        "content-type":"application/json",
      },
      body:JSON.stringify({token:token})
    });
  
    const response = await request.json();
    if(!response.ok){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Login First",
      });
      setTimeout(()=>{
        
        window.location.href = "./login.html";
      },3000)
    }
  }
//   userLoggedIn();
=======
  if (peer) {
    let sender = currentPeer.peerConnection.getSenders().find(function (s) {
      return s.track.kind == videoTrack.kind;
    });
    sender.replaceTrack(videoTrack);
  }
  screenStream.getTracks().forEach(function (track) {
    track.stop();
  });
  screenSharing = false;
}
>>>>>>> 855eb2f26764dfe5e9f55f4ace67fc767ba31f5b:backend/features/screenshare/app.js
