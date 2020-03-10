const superagent = require('superagent');

// NOMBRE (DIRECCION). Por cualquier consulta comunicarse al TELEFONO

function imprimirMuseos(error, respuesta) {
  if (error) {
    throw new Error('algo se rompió', error);
  }

  const cantidad = respuesta.body.count;
  const museos = respuesta.body.results;
  const prueba = nombreDireccion(respuesta.body.results[0]);
  console.log(prueba); // prueba de la linea de texto 

  console.log(`Se encontraron ${cantidad} museos.`);
  console.log(`El primer museo se llama ${museos[0].nombre}.`)
}


superagent
  .get('https://www.cultura.gob.ar/api/v2.0/museos')
  .query({ format: 'json' })
  .end(imprimirMuseos)


// EJEMPLO PARA ESCRIBIR
const fs = require ('fs');

function despuesDeEscribir(error) {
  if (error) {
    throw new Error("no se pudo escribir") ;
  }
  console.log("anda a leer tu archivo")
}

const cancion = `hola\nchau`

fs.writeFile("saludos.txt", cancion , despuesDeEscribir);
// EJEMPLO PARA ESCRIBIR 

function nombreDireccion(error,museo) { // museo = respuesta.body.results[i]
  if (error) {
    throw new Error("error al escribir linea de museo") ;
  }
  const nombre = museo.nombre;
  const direccion = museo.direccion;
  const telefono = museo.telefono;

  const frase = `${nombre} (${direccion}). Por cualquier consulta comunicarse al ${telefono} .` ;

  return frase
}