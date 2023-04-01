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