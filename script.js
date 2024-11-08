const apiURL = 'https://672de365fd89797156442254.mockapi.io/users';
const userList = document.getElementById('user-list');
const userForm = document.getElementById('user-form');
const usernameInput = document.getElementById('username');
const userIdInput = document.getElementById('user-id');
const submitButton = document.getElementById('submit-button');

// Fetch and display users when page loads
window.addEventListener('DOMContentLoaded', fetchUsers);

// Fetch users
async function fetchUsers() {
  try {
    const response = await fetch(apiURL);
    const users = await response.json();
    displayUsers(users);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

// Display users
function displayUsers(users) {
  userList.innerHTML = '';
  users.forEach(user => {
    const userCard = document.createElement('div');
    userCard.classList.add('user-card');
    userCard.innerHTML = `
      <span>${user.name}</span>
      <div>
        <button class="edit" onclick="editUser(${user.id}, '${user.name}')">Edit</button>
        <button class="delete" onclick="deleteUser(${user.id})">Delete</button>
      </div>
    `;
    userList.appendChild(userCard);
  });
}

// Add or update user
userForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = userIdInput.value;
  const name = usernameInput.value;

  if (id) {
    // Update user
    await updateUser(id, { name });
  } else {
    // Add new user
    await addUser({ name });
  }

  // Reset form and button
  userForm.reset();
  submitButton.textContent = 'Add User';
  fetchUsers();
});

// Add user
async function addUser(user) {
  try {
    await fetch(apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
  } catch (error) {
    console.error('Error adding user:', error);
  }
}

// Edit user
function editUser(id, name) {
  userIdInput.value = id;
  usernameInput.value = name;
  submitButton.textContent = 'Update User';
}

// Update user
async function updateUser(id, user) {
  try {
    await fetch(`${apiURL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
  } catch (error) {
    console.error('Error updating user:', error);
  }
}

// Delete user
async function deleteUser(id) {
  try {
    await fetch(`${apiURL}/${id}`, {
      method: 'DELETE'
    });
    fetchUsers();
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}
