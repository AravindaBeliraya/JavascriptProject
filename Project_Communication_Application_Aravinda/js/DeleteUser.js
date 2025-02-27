// Function to confirm and proceed with user deletion
function confirmDeletion() {
  const userId = Number(new URLSearchParams(window.location.search).get("id"));
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users = users.filter((user) => user.id !== userId);
  localStorage.setItem("users", JSON.stringify(users));
  window.opener.location.reload(); // Refresh user list
  window.close();
}

// Function to cancel the deletion process and close the popup
function cancelDeletion() {
  window.close();
}
