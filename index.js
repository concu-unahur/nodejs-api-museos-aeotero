const superagent = require('superagent');

// NOMBRE (DIRECCION). Por cualquier consulta comunicarse al TELEFONO

function imprimirMuseos(error, respuesta) {
  if (error) {
    throw new Error('algo se rompió', error);
  }
  var dato = ("")
  const cantidad = respuesta.body.count;
  const museos = respuesta.body.results;
  // console.log(`Se encontraron ${cantidad} museos.`);
  // console.log(`El primer museo se llama ${museos[0].nombre}.`)
  
  for (i in range (0, cantidad)) {
      dato = dato + nombreDireccion(museos[i]) + "\n" // VER ACA EL TEMA DEL FOR LOOP Y YA ESTARIA
  }

  fs.writeFile("museos.txt", dato , terminar(error));

  // const prueba = nombreDireccion(respuesta.body.results[0]);
  // console.log(prueba); // prueba de la linea de texto 


}


superagent
  .get('https://www.cultura.gob.ar/api/v2.0/museos')
  .query({ format: 'json' })
  .end(imprimirMuseos)


// EJEMPLO PARA ESCRIBIR
const fs = require ('fs');

function despuesDeEscribir(error) {
  if (error) {
    throw new Error("no se pudo escribir", error) ;
  }
  console.log("anda a leer tu archivo")
}

const cancion = `hola\nchau`

fs.writeFile("saludos.txt", cancion , despuesDeEscribir);
// EJEMPLO PARA ESCRIBIR 

function nombreDireccion(museo) { // museo = respuesta.body.results[i]
  const nombre = museo.nombre;
  const direccion = museo.direccion;
  const telefono = museo.telefono;

  return `${nombre} (${direccion}). Por cualquier consulta comunicarse al ${telefono} .` ;
}

function terminar(error) {
  if (error) {
    throw new Error("no se pudo escribir", error) ;
  }
  console.log("ya se escribio el archivo")
}
