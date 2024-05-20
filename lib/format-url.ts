export function formatImageUrl(url: string) {
    // Definir la parte que quieres quitar de la URL
    var parteAQuitar = "https://utfs.io/f/";
  
    // Utilizar una expresión regular para eliminar la parte de la URL
    var newURL = url.replace(new RegExp(parteAQuitar, "i"), "");
  
    // Eliminar el carácter "/" al principio del resultado, si existe
    newURL = newURL.replace(/^\//, "");
  
    return newURL;
  }