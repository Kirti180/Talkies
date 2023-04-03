
let ham = document.getElementById("hamburger");
let screenshare = document.getElementById("ss");
let videocall = document.getElementById("vc");
let message = document.getElementById("msg");
let user_name = document.getElementById("name-user")
let namee = JSON.parse(localStorage.getItem("userDetails"))
user_name.innerText = "Hey! " + namee?.name
videocall.addEventListener("click", () => {
  window.location.href = "https://talkies-video-chat.netlify.app?type=videochat"
})
screenshare.addEventListener("click", () => {
  window.location.href = "https://talkies-share-screen.netlify.app?type=screenshare"
})
message.addEventListener("click", () => {
  window.location.href = "https://talkies-lets-connect.netlify.app/room.html?type=message?type=message"
})

ham.addEventListener("click", function () {
  this.classList.toggle("is-active");
  if (this.classList.contains("is-active")) {
    openNav();
  } else {
    closeNav();
  }
});
function openNav() {
  console.log("open");
  document.getElementById("burger").style.display = "initial";
  document.getElementById("burger").style.transition =
    "transform 250ms ease-in-out";
}
function closeNav() {
  console.log("close nav");
  document.getElementById("burger").style.display = "none";
}

const logout = document.getElementById("logout");

logout.addEventListener("click", async () => {
  const token = localStorage.getItem("token");

  const request = await fetch(`https://talkies-authentication-server-1.onrender.com/user/logout`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({ token })
  })
  console.log("hi");
  localStorage.clear();
  localStorage.setItem("signedIn",false);
  window.location.href = "./index.html"
})


async function userLoggedIn() {
  const token = localStorage.getItem("token");
  console.log(token);
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
