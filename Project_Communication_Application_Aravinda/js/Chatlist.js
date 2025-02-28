document.addEventListener("DOMContentLoaded", function () {
  loadChatMessages();
  displayUsername();
});

// Load chat messages from localStorage
function loadChatMessages() {
    let chatContainer = document.getElementById("chatContainer");
    chatContainer.innerHTML = ""; // Clear previous messages

    let chatMessages = JSON.parse(localStorage.getItem("chats")) || [];

    chatMessages.forEach(msg => {
        let messageElement = document.createElement("div");
        messageElement.classList.add("chat-message");

        messageElement.innerHTML = `<strong>[${msg.time}] ${msg.sender}:</strong> ${msg.text}`;
        
        chatContainer.appendChild(messageElement);
    });

    // ✅ Scroll to the bottom automatically
    chatContainer.scrollTop = chatContainer.scrollHeight;
}


// Send message
function sendMessage() {
    let messageInput = document.getElementById("messageInput");
    let messageText = messageInput.value.trim();

    if (messageText === "") {
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

    let currentTime = new Date().toISOString().replace("T", " ").split(".")[0]; // Format: YYYY-MM-DD HH:MM:SS
    let newMessage = {
        time: currentTime,
        sender: loggedInUser.name,  // ✅ Store name instead of ID
        text: messageText
    };

    let chatMessages = JSON.parse(localStorage.getItem("chats")) || [];
    chatMessages.push(newMessage);
    localStorage.setItem("chats", JSON.stringify(chatMessages));

    messageInput.value = "";
    loadChatMessages(); // Reload chat to display new message
}

// Refresh page
function refreshPage() {
  location.reload();
}

// Display username before input
function displayUsername() {
  let loggedInUserId = JSON.parse(localStorage.getItem("loggedInUser"));
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let loggedInUser = users.find(
    (user) => String(user.id) === String(loggedInUserId)
  );

  if (loggedInUser) {
    let usernameLabel = document.getElementById("username-label");

    if (usernameLabel) {
      usernameLabel.textContent = loggedInUser.name;
    }
  } else {
    console.error("Logged-in user not found!");
  }
}
