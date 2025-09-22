
(function () { //esto hace que se ejecute el script inmediatamente al cargar la página
  function inject() {
    if (document.getElementById('loginModal')) return; // Evita inyectar si ya existe

    const ModalBody = document.createElement('template');
    ModalBody.innerHTML = `
<div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content bg-dark text-light border-secondary">
      <div class="modal-header">
        <h5 id="loginTitle" class="modal-title">Iniciar sesión</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>
      <div class="modal-body">
        <form id="loginForm" action="/login" method="post" novalidate>
          <div class="mb-3">
            <label class="form-label">Correo</label>
            <input class="form-control" type="email" name="email" placeholder="tucorreo@dominio.com" required>
            <div class="invalid-feedback">Ingresa un correo válido.</div>
          </div>
          <div class="mb-3">
            <label class="form-label">Contraseña</label>
            <input class="form-control" type="password" name="password" placeholder="••••••••" required>
            <div class="invalid-feedback">No puede estar vacio el campo.</div>
          </div>
          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" name="remember" id="remember">
            <label class="form-check-label" for="remember">Recordarme</label>
          </div>
          <button class="btn btn-primary w-100" type="submit">Entrar</button>
        </form>
      </div>
    </div>
  </div>
</div>`;

    document.body.appendChild(ModalBody.content);

    // Enfoca email al abrir y aplica validación nativa estilo Bootstrap
    const modalEl = document.getElementById('loginModal');
    const form = document.getElementById('loginForm');

    modalEl.addEventListener('shown.bs.modal', () => {
      modalEl.querySelector('input[name="email"]')?.focus();
    });

    form?.addEventListener('submit', (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      }
      form.classList.add('was-validated');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();