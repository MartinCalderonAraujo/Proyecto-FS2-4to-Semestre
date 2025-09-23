document.addEventListener('DOMContentLoaded', function () {
  // Crear el modal LOGIN si no existe
  if (!document.getElementById('login-modal')) {
    const modal = document.createElement('div');
    modal.id = 'login-modal';
    modal.className = 'modal';

    modal.innerHTML = `
      <div class="modal-content" id="login-modal-content">
        <button class="close-modal" id="close-login-modal" aria-label="Cerrar">×</button>
        <h2 id="login-title">Iniciar sesión</h2>
        <form id="login-form">
          <label for="login-email">Correo</label>
          <input id="login-email" name="email" type="text" placeholder="tucorreo@gmail.com">

          <label for="login-password">Contraseña</label>
          <input id="login-password" name="password" type="password" placeholder="••••••••">

          <div class="remember-row">
            <input type="checkbox" id="remember" name="remember">
            <label for="remember">Recordarme</label>
          </div>

          <button type="submit">Entrar</button>
        </form>
      </div>
    `;
    document.body.appendChild(modal);
  }

  // Crear el modal REGISTER si no existe
  if (!document.getElementById('register-modal')) {
    const modal = document.createElement('div');
    modal.id = 'register-modal';
    modal.className = 'modal';

    modal.innerHTML = `
      <div class="modal-content" id="register-modal-content">
        <button class="close-modal" id="close-register-modal" aria-label="Cerrar">×</button>
        <h2 id="register-title">Registrarse</h2>
        <form id="register-form">
          <label for="register-email">Correo</label>
          <input id="register-email" name="email" type="text" placeholder="tucorreo@gmail.com">

          <label for="register-password">Contraseña</label>
          <input id="register-password" name="password" type="password" placeholder="••••••••">

          <label for="register-confirm">Confirmar contraseña</label>
          <input id="register-confirm" name="confirm" type="password" placeholder="••••••••">

          <button type="submit">Crear cuenta</button>
        </form>
      </div>
    `;
    document.body.appendChild(modal);
  }

  // Variables LOGIN
  const LoginModal = document.getElementById('login-modal');
  const CloseLoginBtn = document.getElementById('close-login-modal');
  const LoginForm = document.getElementById('login-form');

  // Variables REGISTER
  const RegisterModal = document.getElementById('register-modal');
  const CloseRegisterBtn = document.getElementById('close-register-modal');
  const RegisterForm = document.getElementById('register-form');

  // Abrir LOGIN
  document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'open-login-modal') {
      if (LoginModal) {
        LoginModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        const email = document.getElementById('login-email');
        if (email) email.focus();
      }
    }
  });

  // Abrir REGISTER
  document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'open-register-modal') {
      if (RegisterModal) {
        RegisterModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        const email = document.getElementById('register-email');
        if (email) email.focus();
      }
    }
  });

  // Cerrar LOGIN
  function closeLogin() {
    LoginModal.classList.remove('active');
    document.body.style.overflow = '';
  }
  if (CloseLoginBtn) {
    CloseLoginBtn.addEventListener('click', closeLogin);
  }

  // Cerrar REGISTER
  function closeRegister() {
    RegisterModal.classList.remove('active');
    document.body.style.overflow = '';
  }
  if (CloseRegisterBtn) {
    CloseRegisterBtn.addEventListener('click', closeRegister);
  }

  // LOCAL STORAGE
  function getUsers() {
    return JSON.parse(localStorage.getItem("usuarios_validos")) || [];
  }

  function saveUsers(users) {
    localStorage.setItem("usuarios_validos", JSON.stringify(users));
  }

  // Validación LOGIN
  if (LoginForm) {
    LoginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      const email = document.getElementById('login-email');
      const password = document.getElementById('login-password');

      if (!email.value) {
        alert("El correo no puede estar vacío.");
        valid = false;
      } else if (!email.value.endsWith("@gmail.com")) {
        alert("El correo debe ser una cuenta @gmail.com");
        valid = false;
      }

      if (!password.value) {
        alert("La contraseña no puede estar vacía.");
        valid = false;
      }

      if (valid) {
        const users = getUsers();
        const success_login = users.find(u => u.email === email.value && u.password === password.value);

        if (success_login) {
          window.location.href = "/Demeter/extras/login.html"; // redirige a página de administrador
        } else {
          alert("Correo o contraseña incorrectos.");
        }
      }
    });
  }

  // Validación REGISTER
  if (RegisterForm) {
    RegisterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      const email = document.getElementById('register-email');
      const password = document.getElementById('register-password');
      const confirm = document.getElementById('register-confirm');

      if (!email.value) {
        alert("El correo no puede estar vacío.");
        valid = false;
      } else if (!email.value.endsWith("@gmail.com")) {
        alert("El correo debe ser una cuenta @gmail.com");
        valid = false;
      }

        //arreglo caracteres especiales
      const is_caracter_especial = /[!@#$%^&*(),.?":{}|<>_]/;

      // Validación de contraseña
      if (!password.value) {
        alert("La contraseña no puede estar vacía.");
        valid = false;
      } else if (password.value.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
        valid = false;
      } else if (!is_caracter_especial.test(password.value)) {
        alert("La contraseña debe contener al menos un carácter especial.");
        valid = false;
      }




      if (valid) {
        let users = getUsers();

        if (users.some(u => u.email === email.value)) {
          alert("Este correo ya está registrado.");
          return;
        }

        users.push({ email: email.value, password: password.value });
        saveUsers(users);

        window.location.href = "/Demeter/extras/register.html"; // después de registrarse, va demeter
      }
    });
  }
});
