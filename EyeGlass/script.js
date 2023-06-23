document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  
  if (username === 'doctor' && password === '1') {
    window.location.href = 'admin.html';
  } else if (username === 'paciente' && password === '2') {
    window.location.href = 'download.html';
  } else {
    alert('Usuario o contraseña incorrectos');
  }
});
