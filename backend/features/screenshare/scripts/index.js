const roomID = document.getElementById('roomID');
const joinRoom = document.getElementById('join-room');
const create = document.getElementById("create-room");

const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get('type');

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
            if(response.ok){
                setTimeout(()=>{
                    window.location.href = `./chat.html?roomID=${room}`;
                },2000)
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
                window.location.href = `./chat.html?roomID=${roomID}`;
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
                text: 'Something went wrong!',
            })
        }
    })
})
