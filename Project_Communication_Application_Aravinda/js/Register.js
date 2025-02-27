document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let fullname = document.getElementById("fullname");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirm-password");
    let fullnameError = document.getElementById("fullname-error");
    let emailError = document.getElementById("email-error");
    let passwordError = document.getElementById("password-error");
    let confirmPasswordError = document.getElementById(
      "confirm-password-error"
    );
    let errorMessage = document.getElementById("error-message");

    //Remove the error class at begining
    fullname.classList.remove("error");
    email.classList.remove("error");
    password.classList.remove("error");
    confirmPassword.classList.remove("error");
    fullnameError.style.display = "none";
    emailError.style.display = "none";
    passwordError.style.display = "none";
    confirmPasswordError.style.display = "none";
    errorMessage.textContent = "";

    let isValid = true;

    //Check the values present or not. If not present add error class
    if (!fullname.value.trim()) {
      fullname.classList.add("error");
      fullnameError.textContent = "Full Name is required.";
      fullnameError.style.display = "block";
      isValid = false;
    }

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

    if (!confirmPassword.value.trim()) {
      confirmPassword.classList.add("error");
      confirmPasswordError.textContent = "Confirm Password is required.";
      confirmPasswordError.style.display = "block";
      isValid = false;
    } else if (password.value !== confirmPassword.value) {
      confirmPassword.classList.add("error");
      confirmPasswordError.textContent = "Passwords do not match.";
      confirmPasswordError.style.display = "block";
      isValid = false;
    }

    if (!isValid) return;

    //Get the user details from localstorage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    //Check if user already exists or not
    let userExists = users.some((user) => user.email === email.value);

    //If already exists give error
    if (userExists) {
      errorMessage.textContent = "User already exists.";
    } else {
      //Else add to local storage
      let newUser = {
        id: Date.now(),
        name: fullname.value,
        email: email.value,
        password: password.value,
      };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      window.location.href = "RegisterSuccess.html";
    }
  });
