const url = "https://talkies-authentication-server-1.onrender.com";

let signbtn = document.getElementById("btn");
signbtn.addEventListener("click", (e) => {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let pass = document.getElementById("pass").value;

  if(!name || !pass || !email){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "E-mail and Password can't be empty",
    });
    return;
  }

  // Loader Showing
  showLoader();
  document.getElementById("btn").style.visibility = "hidden";

  let signdata = {
    name: name,
    email: email,
    password: pass,
  };

  fetch(`${url}/user/sign`, {
    method: "POST",
    body: JSON.stringify(signdata),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("pass").value = "";

      if (res.ok) {
        Swal.fire(
            'Registration Successfull',
            '',
            'success'
          )
        // Transfer to login page here
        setTimeout(()=>{
          window.location.href = "./login.html";
        },2500)
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.msg,
        });

        hideLoader();
        document.getElementById("btn").style.visibility = "visible";
      }
    })
    .catch((err) => {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
      hideLoader();
      document.getElementById("btn").style.visibility = "visible";
    });
});

