const url = "https://talkies-authentication-server-1.onrender.com";
let signbtn = document.getElementById("signbtn");

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
  console.log(signdata);
  fetch(`${url}/user/sign`, {
    method: "POST",
    body: JSON.stringify(signdata),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())

    .then((res) => {
      console.log(res);
      alert(`Registration succesfull ${signdata.name}`);
      let name = (document.getElementById("name").value = "");
      let email = (document.getElementById("email").value = "");
      let pass = (document.getElementById("pass").value = "");
    })

    .catch((err) => {
      console.log(err);
      alert(`you are Alrady Registrad`);
      let name = (document.getElementById("name").value = "");
      let email = (document.getElementById("email").value = "");
      let pass = (document.getElementById("pass").value = "");
    });
});

// login script is  start hare
var flag = false;
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
      console.log(res);

      let lemail = (document.getElementById("lemail").value = "");
      let lpass = (document.getElementById("lpass").value = "");
      flag = true;

      if (flag) {
        alert("done");
        window.location.href = "./dashboard.html";
      }
    })
    .catch((err) => {
      console.log(err);
      // alert(err.res)
      let lemail = (document.getElementById("lemail").value = "");
      let lpass = (document.getElementById("lpass").value = "");
    });
});
