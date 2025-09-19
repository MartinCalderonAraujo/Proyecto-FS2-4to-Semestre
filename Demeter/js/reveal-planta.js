function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 100;

      if (elementTop < windowHeight - elementVisible && elementTop > 0) {
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