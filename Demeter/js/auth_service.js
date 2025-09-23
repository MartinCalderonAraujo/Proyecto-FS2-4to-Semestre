// Versión simple: solo localStorage, sin hash, sin broadcast, sin atajos modernos.
export class DemeterAuth {
  // Claves
  static CLAVE_USUARIOS = 'demeter_usuarios';
  static CLAVE_SESION   = 'demeter_sesion_actual';

  /* ---------- Lecturas de estado ---------- */
  estaAutenticado() {
    var s = this.obtenerSesion();
    if (s && s.email) { return true; }
    return false;
  }

  obtenerSesion() {
    try {
      var txt = localStorage.getItem(DemeterAuth.CLAVE_SESION);
      if (!txt) { return null; }
      return JSON.parse(txt);
    } catch (e) {
      return null;
    }
  }

  obtenerCorreo() {
    var s = this.obtenerSesion();
    if (s && s.email) { return s.email; }
    return null;
  }

  obtenerRol() {
    var s = this.obtenerSesion();
    if (s && s.rol) { return s.rol; }
    return null;
  }

  /* ---------- Acciones ---------- */
  iniciarSesion(email, password) {
    var u = this.buscarUsuario(email);
    if (!u) { return { ok: false, error: 'USUARIO_NO_ENCONTRADO' }; }

    var passGuardada = u.password ? u.password : '';
    var passRecibida = password ? password : '';
    if (passGuardada !== passRecibida) {
      return { ok: false, error: 'CONTRASENA_INVALIDA' };
    }

    this.guardarSesion({
      email: u.email,
      rol: (u.rol ? u.rol : 'user')
    });

    return { ok: true, usuario: { email: u.email, rol: (u.rol ? u.rol : 'user') } };
  }

  registrar(email, password) {
    if (this.buscarUsuario(email)) {
      return { ok: false, error: 'CORREO_YA_REGISTRADO' };
    }

    var usuarios = this.obtenerUsuarios();
    usuarios.push({
      email: email,
      password: password,
      rol: 'user'
    });
    this.guardarUsuarios(usuarios);

    this.guardarSesion({
      email: email,
      rol: 'user'
    });

    return { ok: true, usuario: { email: email, rol: 'user' } };
  }

  cerrarSesion(opciones) {
    var redirigirA = '/Demeter/Demeter.html';
    if (opciones && opciones.redirigirA) {
      redirigirA = opciones.redirigirA;
    }
    localStorage.removeItem(DemeterAuth.CLAVE_SESION);
    if (redirigirA) { location.replace(redirigirA); }
  }

  protegerPagina(opciones) {
    var redirigirA = '/';
    var rolRequerido = null;
    if (opciones) {
      if (typeof opciones.redirigirA !== 'undefined') { redirigirA = opciones.redirigirA; }
      if (typeof opciones.rolRequerido !== 'undefined') { rolRequerido = opciones.rolRequerido; }
    }

    var s = this.obtenerSesion();
    if (!s || !s.email) { location.replace(redirigirA); return; }
    if (rolRequerido && s.rol !== rolRequerido) { location.replace(redirigirA); }
  }

  /* ---------- Internos ---------- */
  obtenerUsuarios() {
    try {
      var txt = localStorage.getItem(DemeterAuth.CLAVE_USUARIOS);
      if (!txt) { return []; }
      var arr = JSON.parse(txt);
      if (!arr || !(arr instanceof Array)) { return []; }
      return arr;
    } catch (e) {
      return [];
    }
  }

  guardarUsuarios(usuarios) {
    try {
      localStorage.setItem(DemeterAuth.CLAVE_USUARIOS, JSON.stringify(usuarios));
    } catch (e) {}
  }

  buscarUsuario(email) {
    var key = (email ? email : '').toLowerCase();
    var lista = this.obtenerUsuarios();
    for (var i = 0; i < lista.length; i++) {
      var u = lista[i];
      var uemail = (u && u.email) ? String(u.email).toLowerCase() : '';
      if (uemail === key) { return u; }
    }
    return null;
  }

  guardarSesion(obj) {
    try {
      localStorage.setItem(DemeterAuth.CLAVE_SESION, JSON.stringify(obj));
    } catch (e) {}
  }

  /* Opcional: crear admin si no hay usuarios */
  sembrarAdminSiHaceFalta(opciones) {
    var email = 'admin@gmail.com';
    var password = 'admin123_';
    if (opciones) {
      if (opciones.email) { email = opciones.email; }
      if (opciones.password) { password = opciones.password; }
    }

    var usuarios = this.obtenerUsuarios();
    if (usuarios.length > 0) { return; }

    usuarios.push({
      email: email,
      password: password,
      rol: 'admin'
    });
    this.guardarUsuarios(usuarios);
  }
}
