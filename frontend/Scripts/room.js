const roomID = document.getElementById('roomID');
const joinRoom = document.getElementById('join-room');
const create = document.getElementById("create-room");

const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get('type');

const title = document.getElementById("title");

if(type == "message"){
    title.innerText = `Talkies Chat Platform`;

} else if(type == "videochat"){

    title.innerText = `Talkies Video Chat Platform`;

} else if(type == "screenshare"){

    title.innerText = `Talkies Screen Sharing Platform`;
} else {
    title.innerText = `Talkies Meeting Platform`;
}

create.addEventListener('click', () => {

    Swal.fire({
        title: `Creating your room<br>Please Wait !!`,
        // html: 'I will close in <b></b> milliseconds.',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
        }
    })
    console.log("checking");
    fetching();
    async function fetching(){
        try {
            const room = Math.floor(Math.random() * 900) + 100;
            const request = await fetch(`https://video-chat-rbe8.onrender.com/room/create`, {
                method:"POST",
                headers: {
                    "content-type": "application/json"
                },
                body:JSON.stringify({roomID:room,type:type})
            });
            const response = await request.json();
            console.log(response);
            if(response.ok){

                if(type == "message"){
                    window.location.href = `./message.html?type=${type}&roomID=${room}`;

                } else if(type == "videochat"){

                    window.location.href = `./videochat.html?type=${type}&roomID=${room}`;
                } else if(type == "screenshare"){
                    window.location.href = `./screenshare.html?type=${type}&roomID=${room}`;
                }

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            }
            
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
    }
})


joinRoom.addEventListener("click", () => {

    Swal.fire({
        title: 'Enter Your Room Number',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off',
            placeholder: 'XXX',
            required: true,
            id: 'roomID',
            typeof: 'number'
        },
        showCancelButton: true,
        confirmButtonText: 'Join',
        showLoaderOnConfirm: true,

        allowOutsideClick: () => !Swal.isLoading()
    })
    document.getElementsByClassName('swal2-confirm swal2-styled')[0].addEventListener("click", async() => {
        const roomID = document.getElementById('roomID').value;
        try {
            const request = await fetch(`https://video-chat-rbe8.onrender.com/room/join`, {
                method:"POST",
                headers: {
                    "content-type": "application/json"
                },
                body:JSON.stringify({roomID:roomID,type:type})
            });
            const response = await request.json();
            if(response.ok){
                if(type == "message"){
                    window.location.href = `./message.html?type=${type}&roomID=${roomID}`;

                } else if(type == "videochat"){

                    window.location.href = `./videochat.html?type=${type}&roomID=${roomID}`;
                } else if(type == "screenshare"){
                    window.location.href = `./screenshare.html?type=${type}&roomID=${roomID}`;
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${response.msg}`,
                })
            }
            
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
            })
        }
    })
})



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