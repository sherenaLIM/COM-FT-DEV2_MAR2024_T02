// let apiUrl = 'https://0f4bf6d6-9f8f-4c25-bef9-93cb98f859ee.mock.pstmn.io';
let apiUrl = 'http://localhost:9000';

function displayOutput(endpoint, data) {
  const outputDiv = document.getElementById(endpoint.toLowerCase() + 'Output');
  outputDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}

function getUserProfile(userId) {
  getUserById(userId)
    .then(data => {
      // Handle the response data here
      console.log('User profile:', data);
      if (data) {
        document.getElementById('userprofileOutput').innerText = JSON.stringify(data);
      } else {
        console.error('Error: User data is undefined');
      }
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
}

function getUserById(userId) {
  return fetch(`${apiUrl}/api/v1/users/${userId}`, {
    method: 'GET',
    credentials: 'include',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to retrieve user profile');
      }
      return response.json();
    })
    .then(data => {
      // Handle the response data here
      console.log('User:', data);
      // Log the data to see if it's correctly retrieved
      console.log('User data:', data);
      return data; // Return the parsed JSON data
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
}

function getUserExpenses() {
  fetch(`${apiUrl}/user/expenses`, {method: "GET"})
    .then(response => response.json())
    .then(data => displayOutput('expenses', data))
    .catch(error => console.error('Error fetching user expenses:', error));
}

function createUserExpenses() {
  fetch(`${apiUrl}/user/{userid}/expenses`, {method: "POST"})
    .then(response => response.json())
    .then(data => displayOutput('createexp', data))
    .catch(error => console.error('Error fetching user expenses:', error));
}

function isUserAuthenticated() {
  fetch(`${apiUrl}/verify_login`, {method: "GET", credentials: 'include' })
    .then(response => response.json())
    .then(data => showContent(data.isAuthenticated, data.user))
    .catch(error => console.error('Error fetching user authenticated:', error));
}

function showContent(isUserAuthenticated, user) {
  if (isUserAuthenticated) {
    document.getElementById('isNotAuthenticatedNavbar').style.display = 'none';
    document.getElementById('isNotAuthenticatedBody').style.display = 'none';
    document.getElementById('isAuthenticatedNavbar').style.display = 'block';  
    document.getElementById('isAuthenticatedBody').style.display = 'block';  
    document.getElementById('userName').innerHTML = user.nickname;
  } else {
    document.getElementById('isNotAuthenticatedNavbar').style.display = 'block';
    document.getElementById('isNotAuthenticatedBody').style.display = 'block';
    document.getElementById('isAuthenticatedNavbar').style.display = 'none';
    document.getElementById('isAuthenticatedBody').style.display = 'none';
  }
}

function btnLoginClick() {
    window.location.href = `${apiUrl}/login`;
}

function logoutAuth0() {
    window.location.href = `${apiUrl}/logout`;
}

window.addEventListener("load", (event) => {
  isUserAuthenticated();
})


;