function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementoTop = reveals[i].getBoundingClientRect().top;
      var elementoVisible = 100;

      if (elementoTop < windowHeight - elementoVisible && elementoTop > 0) {
        // Aparece cuando entra en pantalla
        reveals[i].classList.add("active");
      } else {
        // Desaparece cuando sale de pantalla
        reveals[i].classList.remove("active");
      }
    }
  }

  // Escuchar el scroll
  window.addEventListener("scroll", reveal);

  // Llamada inicial (por si ya hay algo en pantalla al cargar)
  reveal();