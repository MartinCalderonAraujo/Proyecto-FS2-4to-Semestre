function montarBarra() {
    // Selecciona el contenedor de la barra de navegación
    var host = document.querySelector('#navbar');
    if (!host) { 
        return; 
    }

    // Carga el HTML de la barra de navegación
    fetch('/Demeter/barra_navegacion.html')
        .then(function(res) {
            if (!res.ok) { 
                return null; 
            }
            return res.text();
        })
        .then(function(html) {
            if (!html) { 
                return; 
            }
            // Inserta el HTML en el contenedor
            host.innerHTML = html;
            return import('/Demeter/js/auth_service.js');
        })
        .then(function(modulo) { // Importa el módulo de autenticación
            if (!modulo || !modulo.DemeterAuth) { 
                return; 
            }
            var auth = new modulo.DemeterAuth();
            
            var btnContainer = host.querySelector('.btn-container'); //verifica que btn-container exista antes de usarlo
            if (!btnContainer) { 
                return; 
            }

            var autenticado = auth.estaAutenticado();
            if (!autenticado) {// Si no está autenticado, muestra los botones de login y registro 
                btnContainer.innerHTML = `
                    <a class="btn" href="#"><button id="open-login-modal">Iniciar Sesion</button></a>
                    <a class="btn" href="#"><button id="open-register-modal">Registrarse</button></a>
                `;
                return;
            }

            var rol = auth.obtenerRol(); //Si no tiene rol, asigna user por defecto
            if (!rol) { 
                rol = 'user'; 
            }

            var botones = '';
            if (rol === 'admin') {
                botones += `<a class="btn" href="/Demeter/extras/admin.html"><button>Dashboard</button></a>`;
            } else {
                botones += `<a class="btn" href="/Demeter/extras/login.html"><button>Mi Perfil</button></a>`;
            }
            botones += `<a class="btn" href="#"><button id="btn-logout">Cerrar Sesion</button></a>`;
            btnContainer.innerHTML = botones;
            
            var logoutBtn = btnContainer.querySelector('#btn-logout');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', function(e) {
                    if (e && e.preventDefault) { e.preventDefault(); }
                    if (auth && auth.cerrarSesion) { 
                        auth.cerrarSesion(); 
                    }
                });
            }
        })
        .catch(function(err) {
            console.error(err);
        });
}

montarBarra();
