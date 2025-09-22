
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
        <form id="login-form" action="/login" method="post" novalidate>
          <label for="login-email">Correo</label>
          <input id="login-email" name="email" type="email" placeholder="tucorreo@dominio.com" required>
          <span class="invalid-feedback">Ingresa un correo válido.</span>

          <label for="login-password">Contraseña</label>
          <input id="login-password" name="password" type="password" placeholder="••••••••" required>
          <span class="invalid-feedback">No puede estar vacío el campo.</span>

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
        <form id="register-form" action="/register" method="post" novalidate>
          <label for="register-email">Correo</label>
          <input id="register-email" name="email" type="email" placeholder="tucorreo@dominio.com" required>
          <span class="invalid-feedback">Ingresa un correo válido.</span>

          <label for="register-password">Contraseña</label>
          <input id="register-password" name="password" type="password" placeholder="••••••••" required>
          <span class="invalid-feedback">No puede estar vacío el campo.</span>

          <label for="register-confirm">Confirmar contraseña</label>
          <input id="register-confirm" name="confirm" type="password" placeholder="••••••••" required>
          <span class="invalid-feedback">Las contraseñas deben coincidir.</span>

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

  // Validación LOGIN
  if (LoginForm) {
    LoginForm.addEventListener('submit', function (e) {
      let valid = true;

      const email = document.getElementById('login-email');
      const password = document.getElementById('login-password');

      if (!email.value || !email.checkValidity()) {
        email.classList.add('invalid');
        valid = false;
      } else {
        email.classList.remove('invalid');
      }

      if (!password.value) {
        password.classList.add('invalid');
        valid = false;
      } else {
        password.classList.remove('invalid');
      }

      if (!valid) e.preventDefault();
    });
  }

  // Validación REGISTER
  if (RegisterForm) {
    RegisterForm.addEventListener('submit', function (e) {
      let valid = true;

      const email = document.getElementById('register-email');
      const password = document.getElementById('register-password');
      const confirm = document.getElementById('register-confirm');

      if (!email.value || !email.checkValidity()) {
        email.classList.add('invalid');
        valid = false;
      } else {
        email.classList.remove('invalid');
      }

      if (!password.value) {
        password.classList.add('invalid');
        valid = false;
      } else {
        password.classList.remove('invalid');
      }

      if (!confirm.value || confirm.value !== password.value) {
        confirm.classList.add('invalid');
        valid = false;
      } else {
        confirm.classList.remove('invalid');
      }

      if (!valid) e.preventDefault();
    });
  }

});
