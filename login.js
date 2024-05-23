function getValue(id) {
    return document.getElementById(id).value;
}
const handleRegistration = (event) => {
    event.preventDefault();
    const username = getValue("username");
    console.log(username)
    const first_name = getValue("first_name");
    const last_name = getValue("last_name");
    const email = getValue("email");
    const password = getValue("password");
    const confirm_password = getValue("confirm_password");
    const info = {
      username,
      first_name,
      last_name,
      email,
      password,
      confirm_password,
    };
    console.log( "line 21", info);

    if (password === confirm_password) {

      console.log(info)
      fetch("https://dummy-jobpace-ment-project.onrender.com/user/register/",{
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(info),

      })
      .then((res) => res.json())
      .then((data) => {
        console.log( "line 37", data);
        if (data.success){
          Swal.fire({
            title: "Success!",
            text: `Dear ${info.first_name} ${info.last_name}, please go to your email ${info.email} inbox and click on the received activation link to confirm and complete the registration. Note: Check your spam folder.`,
            icon: "success",
          })
          .then((result) => {
            if (result.isConfirmed) {
                window.location.href = "login.html";
            }
        });
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email or username Already exists ! Please try again !',
        })
      }
      })
    }
    else {
      document.getElementById("error").innerText =
        "password and confirm password do not match";
    }

}
const handleLogin = (event) => {
  event.preventDefault();
  const username = getValue("login-username");
  const password = getValue("login-password");
  console.log(username, password);

  if (username && password) {
      fetch("https://dummy-jobpace-ment-project.onrender.com/user/login/", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ username, password }),
      })
      .then((res) => res.json())
      .then((data) => {
          console.log(data);
          if (data.token && data.user_id) {
              localStorage.setItem("token", data.token);
              localStorage.setItem("user_id", data.user_id);
            console.log(data)

            fetch(`https://dummy-jobpace-ment-project.onrender.com/user/list/${data.user_id}`)
            .then(res => res.json())
            .then(udata => {
              console.log(udata)
              if (udata.is_superuser) {
                localStorage.setItem("usex", udata.id)
                Swal.fire({
                    title: "Superuser Login",
                    text: "You have logged in as a superuser!",
                    icon: "info",
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "index.html";  // Redirect to admin page if applicable
                    }
                });
            } else {
                Swal.fire({
                    title: "Login Successful!",
                    text: "Welcome to ISBN BD!",
                    icon: "success",
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "index.html";
                    }
                });
            }

            })
          }
          else {
              Swal.fire({
                  title: "Error",
                  text: "Username or password incorrect, please try again",
                  icon: "error",
              });
          }
        
      })
      .catch((error) => {
          console.error("Error:", error);
          Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Something went wrong! Please try again later.',
          });
      });
  }
};

const handlelogOut = (event) => {
  event.preventDefault();
  Swal.fire({
    title: "warning!",
    text: "Are you sure to logout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, logout"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Logged Out!",
        text: "You have been logged out.",
        icon: "success",
        showConfirmButton: true // Show OK button
      }).then(() => {
        // Perform logout actions
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("usex");
        window.location.href = "index.html"; // Redirect to login.html
      });
    }
  });
};