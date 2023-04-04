const url = "https://talkies-authentication-server-1.onrender.com";

let signbtn = document.getElementById("btn");
signbtn.addEventListener("click", (e) => {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let pass = document.getElementById("pass").value;
<<<<<<< HEAD

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

=======
>>>>>>> 855eb2f26764dfe5e9f55f4ace67fc767ba31f5b
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
<<<<<<< HEAD
  })
    .then((res) => res.json())
=======
  }).then((res) => res.json())
>>>>>>> 855eb2f26764dfe5e9f55f4ace67fc767ba31f5b
    .then((res) => {
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("pass").value = "";
<<<<<<< HEAD

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
=======
      
      if(res.ok){
        alert(res.msg);
        // Transfer to login page here
      } else {
        alert(res.msg);
      }

    })
    .catch((err) => {
      console.log(err);
    });
});
>>>>>>> 855eb2f26764dfe5e9f55f4ace67fc767ba31f5b
