document.addEventListener("DOMContentLoaded", function () {
  // Get user ID from local storage
  let loggedInUserId = JSON.parse(localStorage.getItem("loggedInUser"));
  let users = JSON.parse(localStorage.getItem("users")) || [];
  // Find user by ID
  let loggedInUser = users.find((user) => user.id === loggedInUserId);

  let welcomeMessage = document.getElementById("welcome-message");

  if (loggedInUser) {
    welcomeMessage.textContent = `Welcome, ${loggedInUser.email}!`;
  } else {
    // Redirect if no user found
    window.location.href = "login.html";
  }
});

//Logout the user
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "Welcome.html";
}
