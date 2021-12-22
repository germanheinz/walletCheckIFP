import './styles.css';
import './css/style.css';

import { login, register } from './js/http-provider';
import { init, saveIngresoEgreso } from './js/ingresosEgresosList';
import 'regenerator-runtime/runtime'

require("babel-core/register");
require("babel-polyfill");


document.getElementById('container-scroller').style.display = 'none';
document.getElementById('registerStyle').style.display = 'none';
document.getElementById('details').style.display = 'none';


document.getElementById('cerrarSesion').addEventListener("click", function(event){
    document.getElementById('details').style.display = 'none';
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('container-scroller').style.display = 'none';
    document.getElementById('loginStyle').style.display = '';

    sessionStorage.removeItem('nombre');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('userId');
});

document.getElementById('home').addEventListener("click", function(event){
    document.getElementById('details').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
});

document.getElementById('createEdit').addEventListener("click", function(event){
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('details').style.display = 'block';
});

document.getElementById("login").addEventListener("click", function(event){
    event.preventDefault()

    let email    = document.getElementById("loginForm").elements[0].value;
    let password = document.getElementById("loginForm").elements[1].value;
    
    console.log(email);
    console.log(password);

   login(
        email,
        password
    )
    init();

    var nombreSession = sessionStorage.getItem('nombre');
    var emailSession = sessionStorage.getItem('email');

    const nombreSide = document.getElementById("nombreSideBar");
    nombreSide.innerHTML = nombreSession;

    
    const emailSide = document.getElementById("emailSideBar");
    emailSide.innerHTML = emailSession;

    document.getElementById('registerStyle').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';

});

document.getElementById("registerId").addEventListener("click", function(event){
    event.preventDefault()

    let email    = document.getElementById("registerForm").elements[0].value;
    let nombre   = document.getElementById("registerForm").elements[1].value;
    let password = document.getElementById("registerForm").elements[2].value;
    
    console.log(email);
    console.log(nombre);
    console.log(password);

   register(
        email,
        nombre,
        password
    )
});


document.getElementById("submit").addEventListener("click", function(event){
    event.preventDefault()
    let title       = document.getElementById("myForm").elements[0].value;
    let price       = document.getElementById("myForm").elements[1].value;
    let description = document.getElementById("myForm").elements[2].value;
    let ingresoEgreso  = document.getElementById("myForm").elements[3].value;
    console.log(title);
    console.log(price);
    console.log(description);
    console.log(ingresoEgreso);
    
    
    saveIngresoEgreso(title, description, price, '22/12/2021', ingresoEgreso);

});


document.getElementById('registerBtn').addEventListener("click", function(event){
    document.getElementById('loginStyle').style.display = 'none';
    document.getElementById('registerStyle').style.display = '';
});
document.getElementById('loginBtn').addEventListener("click", function(event){
    document.getElementById('loginStyle').style.display = '';
    document.getElementById('registerStyle').style.display = 'none';
});

