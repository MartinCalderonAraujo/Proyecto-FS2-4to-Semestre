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
      rol: (u.rol ? u.rol : 'user'),
      nombres: u.nombres,
      apellidos: u.apellidos,
      region: u.region,
      comuna: u.comuna,
      rut: u.rut,
      direccion: u.direccion
    });

    return { ok: true, usuario: {
      email: u.email,
      rol: (u.rol ? u.rol : 'user'),
      nombres: u.nombres,
      apellidos: u.apellidos,
      region: u.region,
      comuna: u.comuna,
      rut: u.rut,
      direccion: u.direccion
    } };
  }

  registrar(email, password, nombres, apellidos, region, comuna, rut, direccion) {
    if (this.buscarUsuario(email)) {
      return { ok: false, error: 'CORREO_YA_REGISTRADO' };
    }

    var usuarios = this.obtenerUsuarios();
    usuarios.push({
      email: email,
      password: password,
      rol: 'user',
      nombres: nombres,
      apellidos: apellidos,
      region: region,
      comuna: comuna,
      rut: rut,
      direccion: direccion
    });
    this.guardarUsuarios(usuarios);

    this.guardarSesion({
      email: email,
      rol: 'user',
      nombres: nombres,
      apellidos: apellidos,
      region: region,
      comuna: comuna,
      rut: rut,
      direccion: direccion
    });

    return { ok: true, usuario: {
      email: email,
      rol: 'user',
      nombres: nombres,
      apellidos: apellidos,
      region: region,
      comuna: comuna,
      rut: rut,
      direccion: direccion
    } };
  }

  cerrarSesion(opciones) {
    var redirigirA = '/Demeter/Demeter.html';
    if (opciones && opciones.redirigirA) {
      redirigirA = opciones.redirigirA;
    }
    localStorage.removeItem(DemeterAuth.CLAVE_SESION);
    if (redirigirA) { location.replace(redirigirA); }
  }

  /*
  Descripción: Verifica si el usuario tiene acceso a una sección según su rol.
  Parámetros:
    - rolRequerido: (string|null) El rol necesario para acceder. Si es null, solo se verifica que esté autenticado.
    Efectos secundarios:
    - Redirige a la página principal si no está autenticado o si no tiene el rol adecuado.
  */
  validarAcceso(rolRequerido) {
    var homePage = '/Demeter/Demeter.html';
    var s = this.obtenerSesion();
    if (!s || !s.email) { location.replace(homePage); return; }
    if (rolRequerido && s.rol !== rolRequerido) { location.replace(homePage); }
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
    var nombres = 'Admin';
    var apellidos = 'Principal';
    var region = 'Metropolitana';
    var comuna = 'Santiago';
    var rut = '11.111.111-1';
    var direccion = 'Calle Falsa 123';
    if (opciones) {
      if (opciones.email) { email = opciones.email; }
      if (opciones.password) { password = opciones.password; }
      if (opciones.nombres) { nombres = opciones.nombres; }
      if (opciones.apellidos) { apellidos = opciones.apellidos; }
      if (opciones.region) { region = opciones.region; }
      if (opciones.comuna) { comuna = opciones.comuna; }
      if (opciones.rut) { rut = opciones.rut; }
      if (opciones.direccion) { direccion = opciones.direccion; }
    }

    var usuarios = this.obtenerUsuarios();
    if (usuarios.length > 0) { return; }

    usuarios.push({
      email: email,
      password: password,
      rol: 'admin',
      nombres: nombres,
      apellidos: apellidos,
      region: region,
      comuna: comuna,
      rut: rut,
      direccion: direccion
    });
    this.guardarUsuarios(usuarios);
  }
}
