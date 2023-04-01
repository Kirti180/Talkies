const url = "https://talkies-authentication-server-1.onrender.com";

// login script is  start hare
let login = document.getElementById("login-form");

login.addEventListener("submit", (e) => {
  e.preventDefault();

  let lemail = document.getElementById("lemail").value;
  let lpass = document.getElementById("lpass").value;
  let signdata = {
    email: lemail,
    password: lpass,
  };


  fetch(`${url}/user/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(signdata),
  })
    .then((res) => res.json())

    .then((res) => {

      document.getElementById("lemail").value = "";
      document.getElementById("lpass").value = "";
      if (res.ok) {
        alert("Login Successfull");
        localStorage.setItem("userDetails", JSON.stringify(res.user_details));
        localStorage.setItem("token", res.token);
        window.location.href = "./dashboard.html";
      } else {
        alert(`${res.msg}`);
      }
    })
    .catch((err) => {
      console.log(err);
      alert("Something went wrong")
    });
});
