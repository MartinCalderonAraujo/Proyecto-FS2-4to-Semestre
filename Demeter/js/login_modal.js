
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

    // aqui se define modalElemento y formulario para rescatar elementos del modal
    const modalElemento = document.getElementById('loginModal');
    const formulario = document.getElementById('loginForm');
    
//ModalElemento solo sirve para enfocar el primer campo al abrir el modal
    modalElemento.addEventListener('shown.bs.modal', () => {
      modalElemento.querySelector('input[name="email"]')?.focus();
    });

    //Esta linea si es importante, valida el formulario con las constrains de HTML5 que definimos en el HTML
    formulario?.addEventListener('submit', (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      }
      formulario.classList.add('was-validated');
    });
  }

  // Verifica si el DOM ya está cargado. Si ya está cargado, ejecuta inmediatamente
  // Si no, espera a que cargue
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();