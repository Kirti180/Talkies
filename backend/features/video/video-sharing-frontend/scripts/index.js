// const socket = io('http://localhost:5000/');

const roomID = document.getElementById('roomID');
const joinRoom = document.getElementById('join-room');
const create = document.getElementById("create-room");

// joinRoom.onclick = (e) => {
//     e.preventDefault();

//     const RoomID = roomID.value;

//     localStorage.setItem("RoomID", RoomID)

//     window.location.href = "./chat.html"
// }


joinRoom.addEventListener("click", () => {

    Swal.fire({
        title: 'Enter Your Room Number',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off',
            placeholder: 'XXX',
            required: true,
            id: 'roomID',
            type:'number'
        },
        showCancelButton: true,
        confirmButtonText: 'Join',
        showLoaderOnConfirm: true,
        
        allowOutsideClick: () => !Swal.isLoading()
    })
})
