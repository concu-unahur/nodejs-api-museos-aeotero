const superagent = require('superagent');
const fs = require ('fs');


superagent
  .get('https://www.cultura.gob.ar/api/v2.0/museos')
  .query({ format: 'json' })
  .end(imprimirMuseos)

function imprimirMuseos(error, respuesta) {
  if (error) {
    throw new Error('no se pudo extraer informacion de museos', error);
  }
  var dato = ("")
  const museos = respuesta.body.results;
  
  museos.forEach(
    u => dato = dato + nombreDireccion(u) + "\n"
  ) 

  fs.writeFile("museos.txt", dato , terminar(error, "museos.txt"));

}

function terminar(error, archivo) {
  if (error) {
    throw new Error("no se pudo escribir", error) ;
  }
  console.log(`ya se escribio el archivo ${archivo}`)
}

function nombreDireccion(dato) { // museo = respuesta.body.results[i]
  const nombre = dato.nombre;
  const direccion = dato.direccion;
  const telefono = dato.telefono;

  return `${nombre} (${direccion}). Por cualquier consulta comunicarse al ${telefono} .` ;
}

// // EJEMPLO PARA ESCRIBIR

// function despuesDeEscribir(error) {
//   if (error) {
//     throw new Error("no se pudo escribir", error) ;
//   }
//   console.log("anda a leer tu archivo")
// }

// const cancion = `hola\nchau`

// fs.writeFile("saludos.txt", cancion , despuesDeEscribir);
// // EJEMPLO PARA ESCRIBIR 


superagent
  .get('https://www.cultura.gob.ar/api/v2.0/organismos')
  .query({ format: 'json' })
  .end(imprimirOrganismos)

function imprimirOrganismos(error, respuesta) {
  if (error) {
    throw new Error('no se pudo extraer informacion de organismos', error);
  }
  var dato = ("")
  const organismos = respuesta.body.results;
  
  organismos.forEach(
    u => dato = dato +"organismo: " + nombreDireccion(u) + "\n"
  ) 

  fs.writeFile("organismos.txt", dato , terminar(error, "organismos.txt"));

}