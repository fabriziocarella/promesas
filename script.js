//***PROMESAS***//
/* Ejercicio 1 */
/*Quiero un perrito, pero no se qué raza escoger, ¿me ayudas?
En este ejercicio utilizaremos la API de https://dog.ceo/dog-api/.
Leyendo su documentación, deberás hacer lo siguiente:*/
//! Imprimir por consola la lista de razas de todos los perros.
fetch('https://dog.ceo/api/breeds/list/all')
    .then(res => res.json())
    .then(json => console.log(json))

//! Imprimir por consola una imagen random de una raza.
fetch('https://dog.ceo/api/breeds/image/random')
    .then(res => res.json())
    .then(json => console.log(json))
//! Imprimir por consola todas las imágenes de una raza concreta.
fetch('https://dog.ceo/api/breed/hound/images')
    .then(res => res.json())
    .then(json => console.log(json))
//! ¿Y si ahora te pidieramos que podamos poner otra raza en la url para que nos busque otras imágenes? Adapta las urls que ya tenías para que puedas pasarle argumentos.
function getBreedImg(breed) {
    let raza = `https://dog.ceo/api/breed/${breed}/images/random/3`
    return fetch(raza)
        .then(res => res.json())
        .then(json => {
            console.log(json.message)
            json.message.map(data => {
                let container = document.createElement("div")
                let imagen = document.createElement("img")
                imagen.src = data
                container.classList.add("container")
                document.getElementById("perro").appendChild(container)
                document.getElementById("perro").appendChild(imagen)
                container.appendChild(imagen)
            })
        })
}
getBreedImg("doberman")//el argumento lo tienes que pasar tal y como lo quieras escribir en la url (tipo string)
//! Recuerda que para estos ejercicios deberás utilizar fetch. Al haber conseguido que se imprima por consola, el siguiente paso será que se muestren en pantalla con las herramientas que nos ofrece el arbol DOM.*/
/* Ejercicio 2*/
/*¿Quieres saber mi información? Aquí la tienes.
Para este ejercicio vamos a utilizar la API de usuarios de GitHub, la cual tiene esta URL: https://api.github.com/users/{username}. {username} es el nombre del usuario en GitHub, por lo que si quieres buscar a cualquier usuario, solo tienes que ponerlo en la url. Por ejemplo, https://api.github.com/users/silvialcastilla. Si ponéis esta URL en una nueva pestaña del navegador podréis observar qué datos nos devuelve el API.*/
//! Lo primero que haremos será crear un input de tipo texto y un botón para buscar. El usuario escribirá en el input el nombre de usuario de GitHub que quiera buscar. Después crearemos una función que se ejecute cuando se pulse el botón buscar y que contenga una petición a la API para obtener información de ese usuario y así mostrarla en nuestra página:
document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    let username = document.querySelector("input[name='user']").value
    return fetch(`https://api.github.com/users/${username}`)
        .then(res => res.json())
        .then(json => {
            console.log(`${json.name}, ${json.public_repos}, ${json.avatar_url}`)
            let fullName = json.name// guardamos el dato json en una variable, para que sea mas facil
            console.log(fullName);//Mostramos en consola para asegurarnos de que recoge el dato
            let repos = json.public_repos
            //console.log(repos);
            let userImg = json.avatar_url
            //console.log(userImg);

            let fullNameBox = document.createElement("p")//guardo en la variable la creacion de la etiqueta p
            let reposBox = document.createElement("p")
            let userImgBox = document.createElement("img")

            fullNameBox.classList.add("fullNameBox")//añadimos las clases a las etiquetas desde Js
            reposBox.classList.add("fullNameBox")

            document.getElementById("imgEx2").appendChild(fullNameBox)// establece el orden en el html
            document.getElementById("imgEx2").appendChild(userImgBox)// Metemos en el div=imgEx2 el contenido que queramos
            document.getElementById("imgEx2").appendChild(reposBox)// en este caso fulName. userImgBox y reposBox

            userImgBox.src = userImg
            fullNameBox.textContent = fullName
            reposBox.innerText = repos
        })
})
/*Lo que queremos que se imprima por consola será:
    nombre
    número de repositorios
    avatar (imagen)
Si ya has obtenido toda la información, utiliza las herramientas del arbol DOM para que esta información aparezca en la pantalla.*/

/* Ejercicio 3*/
/* Promesas, promesas y más promesas. Dada una lista de usuarios de github guardada en una array, utiliza 'https://api.github.com/users/${name}' para obtener el nombre de cada usuario.*/
let arr = ["silvialcastilla", "manuelmoranrod", "migueltafmart", "l0g0l"]
let gitUsers = arr.map(item =>
    fetch(`https://api.github.com/users/${item}`)
        .then(res => res.json())
        //.then(json => (console.log(json))) PORQUE NO funciona si esto esta activado
)
console.log(gitUsers);
Promise.all(gitUsers)
    .then(data => {
        data.map(item => {
            console.log(item.html_url);
            console.log(item.name);
        })
    })

/* Objetivo: Usar Promise.all()
Recordatorio: Una llamada a fetch() devuelve un objeto promesa.
Pregunta. ¿cuántas promesas tendremos?
Hasta que no se resuelvan todas las promesas desencadenadas por cada fetch(), no se cargarán los datos.*/
//Pasos:
//! Mapear el array y hacer un fetch() para cada usuario. Esto nos de vuelve un array lleno de promesas.
//! Con Promise.all() harás que se tenga que resolver todo el proceso de peticiones a GitHub a la vez.
//! Cuando Promise.all() haya terminado:
//! Consigue que se imprima por consola la url del repositorio de cada usuario.
//! Consigue que se imprima por consola el nombre de cada usuario