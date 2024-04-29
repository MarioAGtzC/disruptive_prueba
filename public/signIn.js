const url = 'http://localhost:8080/api/login';

document.getElementById('signIn').addEventListener('submit', (e) => {
  e.preventDefault();

  document.body.style.cursor = 'progress';

  const btnSignIn = document.getElementById('btnSignIn');
  btnSignIn.style.cursor = 'progress';
  btnSignIn.classList.add('disabled');

  const log = document.getElementById('log').value;
  const password = document.getElementById('password').value;

  const body = {
    log,
    password
  }

  postData(body).then(data => {
    if(data.ok) {
      localStorage.setItem('role', data.role)
      window.location.replace('http://localhost:8080/home.html')
    }

    if(data.errors) {
      const messages = data.errors.map(obj => obj.msg);
      btnSignUp.style.cursor = 'cursor';
      btnSignUp.classList.remove('disabled');
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: messages.join('. '),
      });
    }
  }).catch(error => {
    console.error(error);
  });
});

const postData = async (body) => {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  });
  
  return response.json();
}