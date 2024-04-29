window.addEventListener('load', () => {
  const role = localStorage.getItem('role');

  if(!role) {
    window.location.replace('http://localhost:8080/')
  }

  const h1Role = document.getElementById('role');
  h1Role.textContent = role;
});