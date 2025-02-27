document.addEventListener("DOMContentLoaded", function () {
  displayUsername();
  loadChatMessages();
});

// Function to display the logged-in user's name
function displayUsername() {
  let loggedInUserId = JSON.parse(localStorage.getItem("loggedInUser"));
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let loggedInUser = users.find(user => String(user.id) === String(loggedInUserId));

  if (loggedInUser) {
      let usernameLabel = document.getElementById("username-label");
      let loggedInUserName = document.getElementById("loggedInUserName");

      if (usernameLabel) {
          usernameLabel.textContent = loggedInUser.name + ":";
      }
      if (loggedInUserName) {
          loggedInUserName.textContent = loggedInUser.name;
      }
  } else {
      console.error("Logged-in user not found!");
  }
}

// Function to load chat messages from local storage
function loadChatMessages() {
  let chatContainer = document.getElementById("chatContainer");
  chatContainer.innerHTML = ""; // Clear previous messages

  let chats = JSON.parse(localStorage.getItem("chats")) || [];
  let users = JSON.parse(localStorage.getItem("users")) || [];

  chats.forEach(chat => {
      let user = users.find(u => String(u.id) === String(chat.userId)); // Find user by ID
      let username = user ? user.name : "Unknown User"; // Display name or fallback

      let messageElement = document.createElement("div");
      messageElement.classList.add("chat-message");

      // Format: [Date Time] Username: Message
      messageElement.textContent = `[${chat.timestamp}] ${username}: ${chat.message}`;
      chatContainer.appendChild(messageElement);
  });

  // Scroll to the bottom of the chat
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Function to send a new message
function sendMessage() {
  let messageInput = document.getElementById("messageInput");
  let message = messageInput.value.trim();

  if (message === "") {
      alert("Message cannot be empty!");
      return;
  }

  let loggedInUserId = JSON.parse(localStorage.getItem("loggedInUser"));
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let loggedInUser = users.find(user => String(user.id) === String(loggedInUserId));

  if (!loggedInUser) {
      console.error("User not found!");
      return;
  }

  let chats = JSON.parse(localStorage.getItem("chats")) || [];

  let newMessage = {
      userId: loggedInUser.id,  // Store the user ID
      username: loggedInUser.name, // Store the user's name
      timestamp: new Date().toISOString().replace("T", " ").split(".")[0], // Format timestamp
      message: message
  };

  chats.push(newMessage);
  localStorage.setItem("chats", JSON.stringify(chats));

  messageInput.value = ""; // Clear input
  loadChatMessages(); // Refresh chat
}

// Function to refresh the chat page
function refreshPage() {
  location.reload();
}
