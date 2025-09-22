// ===== Modal Login (namespaced: ) =====
document.addEventListener('DOMContentLoaded', function () {
  // Crear el modal si no existe (sin setAttribute, todo simple)
  if (!document.getElementById('login-modal')) {
    const modal = document.createElement('div');
    modal.id = 'login-modal';
    modal.className = 'modal';

    modal.innerHTML = `
      <div class="modal-content" id="modal-content">
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

  // Variables
  const Modal = document.getElementById('login-modal');
  const CloseBtn = document.getElementById('close-login-modal');
  const Form = document.getElementById('login-form');
  const ModalContent = document.getElementById('modal-content');

  // Abrir modal (click que active cualquier boton #open-login-modal lo detona IMPORTANTE!!!!)
  document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'open-login-modal') {
      if (Modal) {
        Modal.classList.add('active');  // <- ahora sí aparece al abrir
        document.body.style.overflow = 'hidden'; // bloquear scroll
        const email = document.getElementById('login-email');
        if (email) email.focus();
      }
    }
  });

  // Cerrar modal (botón X)
  function closeModal() {
    Modal.classList.remove('active');
    document.body.style.overflow = ''; // restaurar scroll
  }

  if (CloseBtn) {
    CloseBtn.addEventListener('click', closeModal);
  }


  
  // Validación del formulario
  if (Form) {
    Form.addEventListener('submit', function (e) {
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

      if (!valid) {
        e.preventDefault();
      }
    });
  }
});