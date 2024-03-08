//let apiUrl = 'https://0f4bf6d6-9f8f-4c25-bef9-93cb98f859ee.mock.pstmn.io';
let apiUrl = 'http://localhost:9000';

function displayOutput(endpoint, data) {
  const outputDiv = document.getElementById(endpoint.toLowerCase() + 'Output');
  outputDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}

function getUserProfile() {
  fetch(`${apiUrl}/user/profile`, {method: "GET"})
    .then(response => response.json())
    .then(data => displayOutput('UserProfile', data))
    .catch(error => console.error('Error fetching user profile:', error));
}

function getUserExpenses() {
  fetch(`${apiUrl}/user/expenses`, {method: "GET"})
    .then(response => response.json())
    .then(data => displayOutput('expenses', data))
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
    document.getElementById('isAuthenticatedNavbar').style.display = 'block';  
    document.getElementById('userName').innerHTML = user.nickname;
  } else {
    document.getElementById('isNotAuthenticatedNavbar').style.display = 'block';
    document.getElementById('isAuthenticatedNavbar').style.display = 'none';
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
});