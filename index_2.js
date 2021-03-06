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

  fs.writeFile("conjunto1.txt", dato , segundaParte);
  
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

function segundaParte(){
  superagent
    .get('https://www.cultura.gob.ar/api/v2.0/organismos')
    .query({ format: 'json' })
    .end(imprimirOrganismos)
}

function imprimirOrganismos(error, respuesta) {
  if (error) {
    throw new Error('no se pudo extraer informacion de organismos', error);
  }
  var dato = ("")
  const organismos = respuesta.body.results;
  
  organismos.forEach(
    u => dato = dato +"organismo: " + nombreDireccion(u) + "\n"
  ) 

  fs.appendFile("conjunto1.txt", dato , terminar(error, "conjunto1.txt"));

}