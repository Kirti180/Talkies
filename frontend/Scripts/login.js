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
  console.log(signdata);
  fetch(`${url}/user/login`, {
    method: "POST",
    body: JSON.stringify(signdata),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())

    .then((res) => {

      let lemail = (document.getElementById("lemail").value = "");
      let lpass = (document.getElementById("lpass").value = "");

      

      if (res.ok) {
        alert("done");
        window.location.href = "./dashboard.html";
      } else {
        alert(`${res.mes}`);
      }
    })
    .catch((err) => {
      console.log(err);
      // alert(err.res)
      let lemail = (document.getElementById("lemail").value = "");
      let lpass = (document.getElementById("lpass").value = "");
    });
});
