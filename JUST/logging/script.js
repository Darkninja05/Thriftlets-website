// Get DOM elements
const userList = document.querySelector('.user-list');
const chatArea = document.querySelector('.chat-area');
const messageInput = document.getElementById('message-input');
const sendMessageButton = document.getElementById('send-message-button');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

let selectedUserId = null; // Store the selected user ID

// Function to show the signup form
function showSignupForm() {
  loginForm.style.display = 'none';
  signupForm.style.display = 'block';
}

// Function to show the login form
function showLoginForm() {
  signupForm.style.display = 'none';
  loginForm.style.display = 'block';
}


// Function to load user list after successful login
function loadUserList() {
  // Replace with actual AJAX request to your PHP script
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'get_users.php', true);
  xhr.onload = function() {
    if (this.status === 200) {
      const userList = JSON.parse(this.responseText);
      displayUserList(userList);
    } else {
      console.error('Error loading users:', this.status);
    }
  };
  xhr.send();
}

// Function to display the user list
function displayUserList(userList) {
  const userListItem = document.querySelector('.user-list');
  userListItem.innerHTML = ''; // Clear existing users

  userList.forEach(user => {
    const li = document.createElement('li');
    li.textContent = user.username;
    li.dataset.userId = user.id;
    userListItem.appendChild(li);
  });
}

// Event listener for user selection
userList.addEventListener('click', event => {
  if (event.target.tagName === 'LI') {
    const previousActive = userList.querySelector('.active');
    if (previousActive) {
      previousActive.classList.remove('active');
    }
    event.target.classList.add('active');
    selectedUserId = event.target.dataset.userId;
    loadMessages(selectedUserId);
    loadUserList(); // Call loadUserList after selecting a user
  }
});

// Event listener for sending messages
sendMessageButton.addEventListener('click', event => {
  const message = messageInput.value;
  if (message.trim() !== '' && selectedUserId) {
    sendMessage(selectedUserId, message);
    messageInput.value = '';
  }
});

// Function to load messages for a user
function loadMessages(userId) {
  // Replace with actual AJAX request to your PHP script
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'get_messages.php?user_id=' + userId, true);
  xhr.onload = function() {
    if (this.status === 200) {
      const messages = JSON.parse(this.responseText);
      // Only update the chat area if the user is at the bottom
      if (chatArea.scrollTop + chatArea.clientHeight >= chatArea.scrollHeight) { 
        displayMessages(messages);
        // Scroll to the bottom after displaying messages
        chatArea.scrollTop = chatArea.scrollHeight;
      } else {
        // Otherwise, just update the messages without scrolling
        displayMessages(messages);
      }
    } else {
      console.error('Error loading messages:', this.status);
    }
  };
  xhr.send();
}


function displayMessages(messages) {
  chatArea.innerHTML = ''; // Clear existing messages
  messages.forEach(message => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(message.message_type); // Add the message type class

    // Create the username label
    const senderLabel = document.createElement('span');
    senderLabel.classList.add('sender');
    senderLabel.textContent = message.sender_username + ':'; 
    messageElement.appendChild(senderLabel);

    // Add message content
    const messageContent = document.createElement('span');
    messageContent.textContent = message.message;
    messageElement.appendChild(messageContent);

    chatArea.appendChild(messageElement);
  });
}


function sendMessage(userId, message) {
  // Replace with actual AJAX request to your PHP script
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'send_message.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function() {
    if (this.status === 200) {
      // Message sent successfully
      loadMessages(selectedUserId); // Refresh messages after sending
    } else {
      console.error('Error sending message:', this.status);
    }
  };
  xhr.send('receiver_id=' + userId + '&message=' + message);
}

// Refresh messages every 1 seconds
setInterval(function() {
  if (selectedUserId) {
    loadMessages(selectedUserId); // Call loadMessages to check for new messages
  }
}, 1000); // Adjust the interval as needed

// Check if user is logged in
if (localStorage.getItem('loggedIn') === 'true') {
  document.getElementById('login-signup-container').style.display = 'none';
  document.getElementById('messaging-system').style.display = 'block';
  loadUserList();

  // Display the navigation bar
  const navigation = document.createElement('div');
  navigation.classList.add('navigation');
  const username = document.createElement('span');
  username.classList.add('username');
  username.textContent = localStorage.getItem('username'); // Get username from localStorage
  const logout = document.createElement('a');
  logout.classList.add('logout');
  logout.textContent = 'Logout';
  logout.href = '#'; // Placeholder for logout link
  logout.addEventListener('click', function() {
    localStorage.setItem('loggedIn', 'false');
    window.location.reload(); // Reload the page
  });
  navigation.appendChild(username);
  navigation.appendChild(logout);
  document.body.insertBefore(navigation, document.getElementById('login-signup-container')); // Add navigation before login form

  // Refresh messages every 1 seconds
  setInterval(function() {
    if (selectedUserId) {
      loadMessages(selectedUserId);
    }
  }, 1000); // Adjust the interval as needed
} else {
  // User is not logged in, show login/signup form
  document.getElementById('login-signup-container').style.display = 'flex';
  document.getElementById('messaging-system').style.display = 'none';
}