const url = "https://talkies-authentication-server-1.onrender.com";

let signbtn = document.getElementById("btn");
signbtn.addEventListener("click", (e) => {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let pass = document.getElementById("pass").value;
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
  }).then((res) => res.json())
    .then((res) => {
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("pass").value = "";
      
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

