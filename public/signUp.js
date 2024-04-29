const url = 'http://localhost:8080/api/users';

document.getElementById('signUp').addEventListener('submit', (e) => {
  e.preventDefault();

  document.body.style.cursor = 'progress';

  const btnSignUp = document.getElementById('btnSignUp');
  btnSignUp.style.cursor = 'progress';
  btnSignUp.classList.add('disabled');

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  const body = {
    username,
    email,
    password,
    role,
  }

  postData(body).then(data => {
    if(data.ok) {
      window.location.replace('http://localhost:8080/signIn.html')
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