document.addEventListener("DOMContentLoaded", function () {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let userTableBody = document.getElementById("userTableBody");

  // Get logged-in user ID correctly
  let loggedInUserId = localStorage.getItem("loggedInUser");
  loggedInUserId = loggedInUserId ? JSON.parse(loggedInUserId) : null;

  //Appending user details from local storage
  function renderUsers() {
    userTableBody.innerHTML = "";
    if (users.length === 0) {
      userTableBody.innerHTML = "<tr><td colspan='3'>No users found</td></tr>";
      return;
    }

    users.forEach((user) => {
      let row = document.createElement("tr");
      // Compare user ID
      let isLoggedInUser = loggedInUserId === user.id;

      row.innerHTML = `
                <td>${user.fullname || user.name}</td>
                <td>${user.email}</td>
                <td class="action-links">
                    <a href="editUser.html?id=${user.id}">Edit</a>
                    ${
                      isLoggedInUser
                        ? '<span class="disabled">Delete</span>' // Disable Delete only for logged-in user
                        : `<a href="#" onclick="openDeletePopup('${user.id}')">Delete</a>`
                    }
                </td>
            `;
      userTableBody.appendChild(row);
    });
  }

  // Open delete confirmation popup
  window.openDeletePopup = function (userId) {
    window.open(
      `DeleteUser.html?id=${userId}`,
      "DeleteUser",
      "width=400,height=200"
    );
    return false;
  };

  renderUsers();
});
