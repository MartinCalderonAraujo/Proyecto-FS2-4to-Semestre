 // aca se pueden agregar mas modales con 
 // nombre de placeholder (el espacio en tu html), archivo html y archivo js
const modales_lista = [
  {
    placeholderId: "modal_placeholder_login",
    htmlFile: "modal_login.html",
    jsFile: "js/modal_login.js"
  },
  {
    placeholderId: "modal_placeholder_register",
    htmlFile: "modal_register.html",
    jsFile: "js/modal_register.js"
  },
 
];

//codigo que carga cada modal que ENCUENTRA si es que existe en el html
document.addEventListener("DOMContentLoaded", () => { //primero asegura que cargue bien.

  modales_lista.forEach(({ placeholderId, htmlFile, jsFile }) => {//un forEach para cada modal
    const placeholder = document.getElementById(placeholderId); //busca el placeholder en el html
    if (!placeholder) return console.warn(`Placeholder ${placeholderId} no encontrado`);

    fetch(htmlFile) //carga el html del modal
      .then(response => response.text())
      .then(html => {                      
        placeholder.innerHTML = html;        //transforma el html en texto y luego lo inserta en el placeholder

        // Cargar JS del modal
        const script = document.createElement("script"); //define una variable script
        script.src = jsFile;                            //le asigna la ruta del js del modal
        document.body.appendChild(script);         //y lo agrega al body para que se ejecute
      })
      .catch(err => console.error(`Error cargando ${htmlFile}:`, err));
  });
});