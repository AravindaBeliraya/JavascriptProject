document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const userId = params.get("id");

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find((u) => String(u.id) === String(userId));

  // If user is not found, show alert and redirect
  if (!user) {
    alert("User not found!");
    window.location.href = "userlist.html";
    return;
  }

  // Get input fields and error message elements
  const fullNameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");

  // Populate form fields with existing user data
  fullNameInput.value = user.name;
  emailInput.value = user.email;

  //Form submission handling
  document
    .getElementById("editUserForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      let fullName = fullNameInput.value.trim();
      let email = emailInput.value.trim();

      // Clear previous error messages
      nameError.textContent = "";
      emailError.textContent = "";

      fullNameInput.classList.remove("error-input");
      emailInput.classList.remove("error-input");

      // Validate full name
      if (fullName === "") {
        nameError.textContent = "Full Name is required.";
        fullNameInput.classList.add("error-input");
        return;
      }

      // Validate email format
      if (!validateEmail(email)) {
        emailError.textContent = "Invalid email format.";
        emailInput.classList.add("error-input");
        return;
      }

      // Update user data and save to local storage

      let userToUpdate = users.find((u) => String(u.id) === String(userId));

      if (userToUpdate) {
        userToUpdate.name = fullName;
        userToUpdate.email = email;
        localStorage.setItem("users", JSON.stringify(users));
      }
      alert("User information updated successfully!");
      window.location.href = "userlist.html";
    });

  // Function to validate email format
  function validateEmail(email) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});
