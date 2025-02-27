document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let emailError = document.getElementById("email-error");
    let passwordError = document.getElementById("password-error");
    let errorMessage = document.getElementById("error-message");

    email.classList.remove("error");
    password.classList.remove("error");
    emailError.style.display = "none";
    passwordError.style.display = "none";
    errorMessage.textContent = "";

    let isValid = true;
    // Check the values present or not, If not present add error class
    if (!email.value.trim()) {
      email.classList.add("error");
      emailError.textContent = "Email is required.";
      emailError.style.display = "block";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.classList.add("error");
      emailError.textContent = "Invalid email format.";
      emailError.style.display = "block";
      isValid = false;
    }

    if (!password.value.trim()) {
      password.classList.add("error");
      passwordError.textContent = "Password is required.";
      passwordError.style.display = "block";
      isValid = false;
    }

    if (!isValid) return;

    //Get the all the user details
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(
      (user) => user.email === email.value && user.password === password.value
    );

    if (user) {
      // Store only the user ID instead of email
      localStorage.setItem("loggedInUser", JSON.stringify(user.id));
      window.location.href = "LoginSuccess.html";
    } else {
      //Validate the login user email and passowrd whether it is in localstorage or not
      errorMessage.textContent = "Wrong Email or Password.";
    }
  });
