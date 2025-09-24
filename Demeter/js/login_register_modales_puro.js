// Básico, sin atajos modernos, pero con template literals para HTML multi-línea.
import { DemeterAuth } from '/Demeter/js/auth_service.js';

var DESARROLLO_SEMBRAR_ADMIN = true;
var REDIRIGIR_AUTOMATICO     = true;
var RUTA_EXITO_LOGIN         = '/Demeter/extras/login.html';
var RUTA_EXITO_REGISTRO      = '/Demeter/extras/register.html';

document.addEventListener('DOMContentLoaded', function () {
  // Inyección de modal LOGIN
  if (!document.getElementById('login-modal')) {
    var modalL = document.createElement('div');
    modalL.id = 'login-modal';
    modalL.className = 'modal';
    modalL.innerHTML = `
      <div class="modal-content" id="login-modal-content">
        <button class="close-modal" id="close-login-modal" aria-label="Cerrar">×</button>
        <h2 id="login-title">Iniciar sesión</h2>
        <form id="login-form" novalidate>
          <label for="login-email">Correo</label>
          <input id="login-email" name="email" type="email" placeholder="tucorreo@dominio.com" required>
          <label for="login-password">Contraseña</label>
          <input id="login-password" name="password" type="password" placeholder="••••••••" required>
          <button type="submit">Entrar</button>
        </form>
      </div>
    `;
    document.body.appendChild(modalL);
  }

  // Inyección de modal REGISTER
  if (!document.getElementById('register-modal')) {
    var modalR = document.createElement('div');
    modalR.id = 'register-modal';
    modalR.className = 'modal';
    modalR.innerHTML = `
      <div class="modal-content" id="register-modal-content">
        <button class="close-modal" id="close-register-modal" aria-label="Cerrar">×</button>
        <h2 id="register-title">Registrarse</h2>
        <form id="register-form" novalidate>
          <label for="register-email">Correo</label>
          <input id="register-email" name="email" type="email" placeholder="tucorreo@dominio.com" required>
          <label for="register-password">Contraseña</label>
          <input id="register-password" name="password" type="password" placeholder="••••••••" required>
          <label for="register-confirm">Confirmar contraseña</label>
          <input id="register-confirm" name="confirm" type="password" placeholder="••••••••" required>
          <label for="register-nombres">Nombres</label>
          <input id="register-nombres" name="nombres" type="text" placeholder="Tus nombres" required>
          <label for="register-apellidos">Apellidos</label>
          <input id="register-apellidos" name="apellidos" type="text" placeholder="Tus apellidos" required>
          <label for="register-region">Región</label>
          <input id="register-region" name="region" type="text" placeholder="Región" required>
          <label for="register-comuna">Comuna</label>
          <input id="register-comuna" name="comuna" type="text" placeholder="Comuna" required>
          <label for="register-rut">RUT</label>
          <input id="register-rut" name="rut" type="text" placeholder="RUT" required>
          <label for="register-direccion">Dirección</label>
          <input id="register-direccion" name="direccion" type="text" placeholder="Dirección" required>
          <button type="submit">Crear cuenta</button>
        </form>
      </div>
    `;
    document.body.appendChild(modalR);
  }

  var LoginModal = document.getElementById('login-modal');
  var CloseLoginBtn = document.getElementById('close-login-modal');
  var LoginForm = document.getElementById('login-form');

  var RegisterModal = document.getElementById('register-modal');
  var CloseRegisterBtn = document.getElementById('close-register-modal');
  var RegisterForm = document.getElementById('register-form');

  // Abrir / cerrar desde los botones de la barra
  document.addEventListener('click', function (e) {
    var target = e ? e.target : null;
    var tid = target ? target.id : '';

    if (tid === 'open-login-modal') {
      if (LoginModal) { LoginModal.classList.add('active'); }
      document.body.style.overflow = 'hidden';
      var le = document.getElementById('login-email');
      if (le && le.focus) { le.focus(); }
    }

    if (tid === 'open-register-modal') {
      if (RegisterModal) { RegisterModal.classList.add('active'); }
      document.body.style.overflow = 'hidden';
      var re = document.getElementById('register-email');
      if (re && re.focus) { re.focus(); }
    }
  });

  if (CloseLoginBtn) {
    CloseLoginBtn.addEventListener('click', function () {
      if (LoginModal) { LoginModal.classList.remove('active'); }
      document.body.style.overflow = '';
    });
  }
  if (CloseRegisterBtn) {
    CloseRegisterBtn.addEventListener('click', function () {
      if (RegisterModal) { RegisterModal.classList.remove('active'); }
      document.body.style.overflow = '';
    });
  }

  var auth = new DemeterAuth();

  // Sembrar admin en dev (opcional)
  if (DESARROLLO_SEMBRAR_ADMIN) {
    auth.sembrarAdminSiHaceFalta();
  }

  // LOGIN
  if (LoginForm) {
    LoginForm.addEventListener('submit', function (e) {
      if (e && e.preventDefault) { e.preventDefault(); }

      var emailEl = document.getElementById('login-email');
      var passEl  = document.getElementById('login-password');

      var email = emailEl && emailEl.value ? String(emailEl.value).trim() : '';
      var password = passEl && passEl.value ? String(passEl.value) : '';

      if (!email) { alert('El correo no puede estar vacío.'); return; }
      if (!password) { alert('La contraseña no puede estar vacía.'); return; }

      var res = auth.iniciarSesion(email, password);
      if (!res || !res.ok) {
        if (res && res.error === 'USUARIO_NO_ENCONTRADO') { alert('Usuario no encontrado.'); }
        else { alert('Contraseña incorrecta.'); }
        return;
      }

      if (LoginModal) { LoginModal.classList.remove('active'); }
      document.body.style.overflow = '';
      if (REDIRIGIR_AUTOMATICO) { location.href = RUTA_EXITO_LOGIN; }
    });
  }

  // REGISTER
  if (RegisterForm) {
    RegisterForm.addEventListener('submit', function (e) {
      if (e && e.preventDefault) { e.preventDefault(); }

      var emailEl = document.getElementById('register-email');
      var passEl  = document.getElementById('register-password');
      var confEl  = document.getElementById('register-confirm');
      var nombresEl = document.getElementById('register-nombres');
      var apellidosEl = document.getElementById('register-apellidos');
      var regionEl = document.getElementById('register-region');
      var comunaEl = document.getElementById('register-comuna');
      var rutEl = document.getElementById('register-rut');
      var direccionEl = document.getElementById('register-direccion');

      var email     = emailEl && emailEl.value ? String(emailEl.value).trim() : '';
      var password = passEl && passEl.value ? String(passEl.value) : '';
      var confirmar  = confEl && confEl.value ? String(confEl.value) : '';
      var nombres = nombresEl && nombresEl.value ? String(nombresEl.value).trim() : '';
      var apellidos = apellidosEl && apellidosEl.value ? String(apellidosEl.value).trim() : '';
      var region = regionEl && regionEl.value ? String(regionEl.value).trim() : '';
      var comuna = comunaEl && comunaEl.value ? String(comunaEl.value).trim() : '';
      var rut = rutEl && rutEl.value ? String(rutEl.value).trim() : '';
      var direccion = direccionEl && direccionEl.value ? String(direccionEl.value).trim() : '';

      if (!email) { alert('El correo no puede estar vacío.'); return; }
      if (!password) { alert('La contraseña no puede estar vacía.'); return; }
      if (password.length < 6) { alert('La contraseña debe tener al menos 6 caracteres.'); return; }
      if (password !== confirmar) { alert('Las contraseñas no coinciden.'); return; }
      if (!nombres) { alert('Los nombres no pueden estar vacíos.'); return; }
      if (!apellidos) { alert('Los apellidos no pueden estar vacíos.'); return; }
      if (!region) { alert('La región no puede estar vacía.'); return; }
      if (!comuna) { alert('La comuna no puede estar vacía.'); return; }
      if (!rut) { alert('El RUT no puede estar vacío.'); return; }
      if (!direccion) { alert('La dirección no puede estar vacía.'); return; }

      var res = auth.registrar(email, password, nombres, apellidos, region, comuna, rut, direccion);
      if (!res || !res.ok) {
        alert('Este correo ya está registrado.');
        return;
      }

      if (RegisterModal) { RegisterModal.classList.remove('active'); }
      document.body.style.overflow = '';
      if (REDIRIGIR_AUTOMATICO) { location.href = RUTA_EXITO_REGISTRO; }
    });
  }
});
