const txt = { "nombreEquipo": "Super Equipo", "ciudad": "Ismael cortinas", "formed": 2016, "baseSecreta": "Super secreto", "activo": true, "miembros": [ { "nombre": " Wanda Maximoff ", "edad": 29, "identidadSecreta": "Bruja Escarlata", "superPoderes": [ "Magia del caos", "Hechizos", "Re escribir realidad" ] }, { "nombre": " Carol Susan Jane Danvers ", "edad": 33, "identidadSecreta": "Capitana Marvel", "superPoderes": [ "Volar", "Canalizar energía", "Fuerza superhumana" ] }, { "nombre": "Matthew Murdock", "edad": 37, "identidadSecreta": "Daredevil", "superPoderes": [ "Sentidos intesificados", "Sentido de radar", "Experto en artes marciales" ] } ] }



function mostrar() {
  
let text = "";
for (let i = 0; i < txt.miembros.length; i++) {
  text += "Nombre:" + txt.miembros[i].nombre + "Super poderes: " + txt.miembros[i].superPoderes + "<br>";
  
  document.getElementById("pepe").innerHTML = text;
}

}