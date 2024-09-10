function hacerLogin(frm){  //frm son los datos, el formulario

    let url = 'api/usuarios/login',  //url de la pagina de la  que quiere coger los datos api --> post --> login.php
        fdata = new FormData(frm), //donde metes la info del login (usuario y contraseña)
        xhr = new XMLHttpRequest();  //para pedir permiso a api post login

        xhr.open('POST',url,true);  //indicamos qe uqueremos carpeta post
        console.log("hh");
        xhr.onload=function(){
            let user = JSON.parse(xhr.responseText);  //dentro de respondequest tienes lo que devuelve el php (lo qeu sea qeu devuleva el php lo combierte en json para usar sus datos)
            console.log(user);

            if(user.RESULTADO === 'OK'){  //si todo el logeamiento ha ido bien

                sessionStorage['pcw'] = xhr.responseText;  //se guarda el usuario en el sesionStorage para qeu leugo sepa qeu esta logeado
                mostrarMensajeLogin(user.ultimo_acceso);  // llama a metodo y user es el json

            }else{

                mostrarMensajeLogin("ERROR");

            }

        };

        xhr.send(fdata); //porqeu lo dice el profe



    return false;  //para qe uno se refresqeu la pagina

}

function hacerLogout(){

    console.log('logout');

    let url = 'api/usuarios/logout',
        xhr = new XMLHttpRequest(),
        user,clave;

        if(sessionStorage['pcw']==null)
            return;

        user = JSON.parse(sessionStorage['pcw']);
        clave = user.login+':'+user.token;

        xhr.open('POST', url, true);

        xhr.onload = function(){

            console.log(xhr.responseText);
            let r = JSON.parse(xhr.responseText);

            if(r.RESULTADO == 'OK'){

                sessionStorage.removeItem('pcw');

            }

        };

        xhr.setRequestHeader('Authorization',clave);
        xhr.send();

}

function hacerRegistro(frm){  //al fian ldel metodo se pone un return false para no recargar la pagina

    let url = 'api/usuarios/registro',
        xhr = new XMLHttpRequest(),
        fdata = new FormData(frm),
        registro = document.getElementById('form_registro'),
        imagen_id = document.getElementById('imagen_defecto');

        xhr.open('POST', url, true);

        xhr.onload = function () {

            let user = JSON.parse(xhr.responseText);
            console.log(user);

            if(user.RESULTADO == "OK"){

                imagen_id.src = "imagenes/registro.jpg";  //una vez se registre sale el modal y se el formulario registro lo haces reset para vaciarlo todo
                registro.reset();  //seria lo mismo poner  document.getElementById('form_registro').reset();
                mostrarMensajeRegistro();

            }else if(user.DESCRIPCION === "Login no válido, ya está en uso." && user.CODIGO === 409) {

                document.getElementById('login').focus();  //hacer focus e nun campo

            }else if(user.DESCRIPCION === "Contraseñas distintas" && user.CODIGO === 422) {

                document.getElementById('pwd2').focus();

            }

        };

    xhr.send(fdata); //siempre se hace


    return false;

}

function mostrarMensajeLogin(status){ //fecha o texto error qe uenviamos

    if(status === "ERROR"){  //si no hubo logeamiento

        let div = document.createElement("div");
        var html;

        div.id = 'msj-modal';

        console.log(div);

        //aquí el boton te devuelve a login para hacerlo bien
        html = `<article>
            <h2>Login incorrecto</h2>
            <p>Revise los datos</p>
            <button onclick="document.getElementById('login').focus();document.querySelector('#msj-modal').remove();">Aceptar</button>
            <br><br>
        </article>`;

        div.innerHTML = html;

        document.body.appendChild(div);

    }else{

        let div = document.createElement("div");
        var html;

        div.id = 'msj-modal';

        console.log(div);

        //si te logeaste te lleva la metodo logeado()
        html = `<article>
            <h2>Sesión iniciada</h2>
            <p>Último acceso: `+status+`</p>
            <button onclick="logueado();">Aceptar</button>
            <br><br>
        </article>`;

        div.innerHTML = html;

        document.body.appendChild(div);

    }

}

function mostrarMensajeRegistro(){

    let div = document.createElement("div");
    var html;

    div.id = 'msj-modal';

    console.log(div);

    html = `<article>
            <h2>Registro completado</h2>
            <p>Ya puedes iniciar sesión</p>
            <button onclick="redirigirLogin();">Aceptar</button>
            <br><br>
        </article>`;

    div.innerHTML = html;

    document.body.appendChild(div);

}

function redirigirLogin(){

    document.querySelector('#msj-modal').remove(); //elimina el mensaje modal - cerrrarlo

    window.location.replace('login.html'); //redirigir a login para hacer bie nel login

}

function logueado(){

    document.querySelector('#msj-modal').remove(); //elimina el mensaje modal -cerrrarlo

    window.location.replace('index.html');  //redirige al inicio, index.html

}

window.onload = function () {  //cada vez que se carge una pagina

    if (window.location.href === "http://localhost/pcw/practicas/practica2/") {   // "http://localhost/pcw/alumno/practica2/"

        window.location.replace("index.html");

    }

    if (window.location.href === "http://localhost/pcw/practicas/practica2/index.html") {

        pedirRutas('api/lugares?pag=0&lpag=6');

    }

    if (sessionStorage['pcw'] != null) {  //si el usuario esta logeado nunca va salir en la navegacion el login
                                         // todos tendrán la opcion de hacer logout, que al darle te lleva al metodo logout

        var menu = document.getElementById("barramenu"); //para enviarlo al html

        var html = '';

        let usuario = JSON.parse(sessionStorage['pcw']); //pasar el usuario a tipo json

        if (window.location.href === "http://localhost/pcw/practicas/practica2/buscar.html") {  //si me encuentro en buscar una lista no ordenada (sin numerito antes de la palabra)

            //li cada elemento de la lista
            var html = '<li> <a href="index.html"><span class="fas fa-home"></span><p> Inicio</p></a> </li>' +
                '<li> <a href="nueva.html"><span class="fas fa-plus"></span><p> Nuevo lugar </p></a></li>' +
                '<li> <a href="index.html" onclick="hacerLogout()"><span class="fas fa-sign-out-alt"></span><p>Logout(<img id="foto_perfil" src="fotos/usuarios/' + usuario.foto + '"> ' + usuario.nombre + ')</p></a></li>';

        }

        if (window.location.href === "http://localhost/pcw/practicas/practica2/nuevo.html") {

            var html = '<li> <a href="index.html"><span class="fas fa-home"></span><p> Inicio</p></a> </li>' +
                '<li> <a href="buscar.html"><span class="fas fa-search"></span><p> Buscar</p></a></li>' +
                '<li> <a href="index.html" onclick="hacerLogout()"><span class="fas fa-sign-out-alt"></span><p>Logout(<img id="foto_perfil" src="fotos/usuarios/' + usuario.foto + '"> ' + usuario.nombre + ')</p></a></li>';

        }

        if (window.location.href === "http://localhost/pcw/practicas/practica2/index.html") {

            var html = '<li> <a href="buscar.html"><span class="fas fa-search"></span><p> Buscar</p></a></li>' +
                '<li> <a href="nueva.html"><span class="fas fa-plus"></span><p> Nuevo lugar </p></a></li>' +
                '<li> <a href="index.html" onclick="hacerLogout()"><span class="fas fa-sign-out-alt"></span><p>Logout(<img id="foto_perfil" src="fotos/usuarios/' + usuario.foto + '"> ' + usuario.nombre + ')</p></a></li>';

        }
        if (window.location.href === "http://localhost/pcw/practicas/practica2/lugar.html") {

            var html = '<li> <a href="index.html"><span class="fas fa-home"></span><p> Inicio</p></a> </li>' +
                '<li> <a href="nueva.html"><span class="fas fa-plus"></span><p> Nuevo lugar </p></a></li>' +
                '<li> <a href="buscar.html"><span class="fas fa-search"></span><p> Buscar</p></a></li>'+
                '<li> <a href="index.html" onclick="hacerLogout()"><span class="fas fa-sign-out-alt"></span><p>Logout(<img id="foto_perfil" src="fotos/usuarios/' + usuario.foto + '"> ' + usuario.nombre + ')</p></a></li>';

        }



        menu.innerHTML = html;  //metes todo lo amarillo (codigo html) a la variable que enviarás al html


        //si estando logeado intentas forzar entrar a login te lleva a index
        if (window.location.href === "http://localhost/pcw/practicas/practica2/login.html") {

            window.location.replace("index.html");

        }

        //si estando logeado intentas forzar entrar a registro te lleva a index
        if (window.location.href === "http://localhost/pcw/practicas/practica2/registro.html") {

            window.location.replace("index.html");

        }


    } else {  //si no estas logeado e ncada pagina te saldra la opcion de logearte y registrarte

        var menu = document.getElementById("barramenu");

        var html = '';

        if (window.location.href === "http://localhost/pcw/practicas/practica2/index.html") {

            var html = '<li> <a href="login.html"><span class="fas fa-sign-in-alt"></span><p> Login </p></a></li>' +
                '<li> <a href="registro.html"><span class="fas fa-user-plus"></span><p> Registro</p></a> </li>' +
                '<li> <a href="buscar.html"><span class="fas fa-search"></span><p> Buscar</p></a></li>'

        }

        if (window.location.href === "http://localhost/pcw/practicas/practica2/login.html") {

            var html = '<li> <a href="index.html"><span class="fas fa-home"></span><p> Inicio</p></a> </li>' +
                '<li> <a href="registro.html"><span class="fas fa-user-plus"></span><p> Registro</p></a> </li>' +
                '<li> <a href="buscar.html"><span class="fas fa-search"></span><p> Buscar</p></a></li>'

        }

        if (window.location.href === "http://localhost/pcw/practicas/practica2/registro.html") {

            var html = '<li> <a href="index.html"><span class="fas fa-home"></span><p> Inicio</p></a> </li>' +
                '<li> <a href="login.html"><span class="fas fa-sign-in-alt"></span><p> Login </p></a></li>' +
                '<li> <a href="buscar.html"><span class="fas fa-search"></span><p> Buscar</p></a></li>'

        }

        if (window.location.href === "http://localhost/pcw/practicas/practica2/buscar.html") {

            var html = '<li> <a href="index.html"><span class="fas fa-home"></span><p> Inicio</p></a> </li>' +
                '<li> <a href="login.html"><span class="fas fa-sign-in-alt"></span><p> Login </p></a></li>' +
                '<li> <a href="registro.html"><span class="fas fa-user-plus"></span><p> Registro</p></a> </li>';

        }
        if (window.location.href === "http://localhost/pcw/practicas/practica2/lugar.html") {

            var html = '<li> <a href="index.html"><span class="fas fa-home"></span><p> Inicio</p></a> </li>' +
                '<li> <a href="login.html"><span class="fas fa-sign-in-alt"></span><p> Login </p></a></li>' +
                '<li> <a href="registro.html"><span class="fas fa-user-plus"></span><p> Registro</p></a> </li>'+
                '<li> <a href="buscar.html"><span class="fas fa-search"></span><p> Buscar</p></a></li>';

        }
        // if (window.location.href === "http://localhost/pcw/practica2/comentario.html") {

        //     var html = '<li> <a href="index.html"><span class="fas fa-home"></span><p> Inicio</p></a> </li>' +
        //         '<li> <a href="login.html"><span class="fas fa-sign-in-alt"></span><p> Login </p></a></li>' +
        //         '<li> <a href="registro.html"><span class="fas fa-user-plus"></span><p> Registro</p></a> </li>' +
        //         '<li> <a href="buscar.html"><span class="fas fa-search"></span><p> Buscar</p></a></li>';

        // }

        menu.innerHTML = html;

        //si intentar forzar ir a nueva sin estar logeado reridige a index

        if (window.location.href === "http://localhost/pcw/practicas/practica2/nuevo.html") {

            window.location.replace("index.html");

        }

    }

    //si intento acceder a ruta y tenemos guardada en seion una ruta
    if (window.location.href === "http://localhost/pcw/practicas/practica2/lugar.html" && sessionStorage['ruta_id'] != null) {

        let id = sessionStorage['ruta_id']
        imagenesRuta(id);
        mostrarRuta(id);

    } else {
        //si no lohaces justo como qeuremos te borra la ruta por si acaso y así no puede acceder a ruta.html
        sessionStorage.removeItem('ruta_id');

    }

    if (window.location.href === "http://localhost/pcw/practicas/practica2/lugar.html" && sessionStorage['ruta_id'] == null) {

        window.location.replace("index.html");

    }

}

function pedirRutas(url) {

    fetch(url).then(function (response) {
        if (response.ok) {

            response.json().then(function (datos) {
                console.log(datos);

                //paginación
                cantidadpaginas = Math.ceil(datos.TOTAL_COINCIDENCIAS / parseInt(datos.REGISTROS_POR_PAGINA));
                numeroPagina = parseInt(datos.PAGINA);


                console.log(cantidadpaginas);
                console.log(numeroPagina);


                document.querySelector('#cajas').innerHTML = '';

                datos.FILAS.forEach(function (e, idx, v) {


                    let ruta = document.createElement('div');

                    let articulo = document.createElement('article');

                    let a = document.createElement('a');

                    a.onclick = function(){idRuta(e.id)};


                    let nombre = document.createElement('h3');
                    nombre.innerHTML = e.nombre;



                    a.appendChild(nombre);

                    a.title = nombre.innerHTML;
                    // a.href = "ruta.html";
                    // a.setAttribute('onclick', idRuta(e.id));
                    // nombre.setAttribute('onclick', idRuta(e.id));

                    let dificultad = document.createElement('span');
                    dificultad.innerHTML = e.dificultad + "&nbsp;";



                    let imagen = document.createElement('img');
                    imagen.setAttribute('src', "fotos/lugares/" + e.imagen);
                    imagen.onclick = function () { idRuta(e.id) };
                    imagen.setAttribute('alt', e.imagen);

                    let footer = document.createElement('footer');
                    let p = document.createElement('p');
                    let spancalendario = document.createElement('span');
                    spancalendario.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;";
                    let spanestrella = document.createElement('span');
                    spanestrella.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;";
                    let spanestrella2 = document.createElement('span');
                    let spanestrella3 = document.createElement('span');
                    let spanestrella4 = document.createElement('span');
                    let spanestrella5 = document.createElement('span');

                    let br = document.createElement('br');
                    let br2 = document.createElement('br');


                    let usuario = document.createElement('img');

                    let login = document.createElement('span');
                    login.innerHTML = e.login;

                    p.innerHTML = e.fecha_hora + "&nbsp;";

                    spancalendario.className = "far fa-calendar-alt";
                    spanestrella.className = "fas fa-star";
                    spanestrella2.className = "fas fa-star";
                    spanestrella3.className = "fas fa-star";
                    spanestrella4.className = "fas fa-star";
                    spanestrella5.className = "fas fa-star";

                    usuario.setAttribute('src', "fotos/usuarios/" + e.foto_autor);
                    usuario.setAttribute('alt', e.foto_autor);


                    footer.appendChild(p);
                    p.appendChild(spancalendario);

                    p.appendChild(dificultad);

                    if (e.dificultad === 1) {
                        p.appendChild(spanestrella);

                    }
                    else if (e.dificultad === 2) {

                        p.appendChild(spanestrella2);
                        p.appendChild(spanestrella);
                    }
                    else if (e.dificultad === 3) {
                        p.appendChild(spanestrella2);
                        p.appendChild(spanestrella3);
                        p.appendChild(spanestrella);

                    }
                    else if (e.dificultad === 4) {
                        p.appendChild(spanestrella2);
                        p.appendChild(spanestrella3);
                        p.appendChild(spanestrella4);
                        p.appendChild(spanestrella);

                    }
                    else if (e.dificultad === 5) {
                        p.appendChild(spanestrella2);
                        p.appendChild(spanestrella3);
                        p.appendChild(spanestrella4);
                        p.appendChild(spanestrella5);
                        p.appendChild(spanestrella);

                    }


                    p.appendChild.innerHTML = ''; (br);
                    p.appendChild(login);
                    p.appendChild(usuario);





                    imagen.className = "imgindex";
                    usuario.className = "imgusuario";

                    nombre.className = "ellipsis";



                    ruta.appendChild(a);
                    ruta.appendChild(imagen);

                    ruta.appendChild(footer);

                    articulo.appendChild(ruta);



                    document.querySelector('#ruta').appendChild(articulo);


                });




                document.querySelector('.paginacion>label>span:nth-child(1)').innerHTML = (numeroPagina + 1).toString();
                document.querySelector('.paginacion>label>span:nth-child(2)').innerHTML = cantidadpaginas.toString();

            });

        }

        else {
            console.log('Error ' + response.status + ': ' + response.statusText);
        }


    }).catch(function (error) {
        console.log('Fetch Error: ', err);
    });


    return false;
}