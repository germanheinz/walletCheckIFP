import '../css/componentes.css';
import '../css/style.css';
import 'regenerator-runtime/runtime';
const Swal = require('sweetalert2')

const url = 'https://walletcheckifp.herokuapp.com';

export const obtenerIngresosEgresos = async() => {

    const userId = sessionStorage.getItem('userId');

    console.log(userId);

    try {
        const resp = await fetch(url + `/ingresosEgresos/user/${userId}`)

        if(!resp.ok) throw 'no response'

        const ingresosEgresos = resp.json();

        console.log(ingresosEgresos);

        return ingresosEgresos;

    } catch (error) {
        console.log(error);
    }
}
export const createIngresosEgresos = async(ingresoEgreso) => {
    try {
        const resp = await fetch(url + '/ingresosEgresos', {
            method: 'POST',
            body: JSON.stringify(ingresoEgreso),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(await resp.json());

        if(resp.ok) {
            Swal.fire(
                'Good job!',
                'You clicked the button!',
                'success'
              )
        }

    } catch (error) {
        console.log(error);
    }
}

export async function deleteIngresosEgresos(id) {
    try {
        const resp = await fetch(url + `/ingresoEgreso/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    const { ok } = resp;
    if(ok){
        Swal.fire(
            'Good job!',
            'You clicked the button!',
            'success'
          )
    }
    } catch (error) {
     console.log(error);   
    }
}


const updateIngresosEgresos = async() => {
    try {
        const resp = await fetch(url + '/ingresosEgresos')

    } catch (error) {
        
    }
}

// export const getTime = moment().format("MMM Do YY");

export const login = async(email, password) => {
    try {
        const resp = await fetch(url + '/login', {
            method: 'POST',
            body: `{"email": "${email}", "password": "${password}"}`,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const {usuario} = await resp.json();

        if(!resp.ok) {
            Swal.fire({
                title: 'Error!',
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'Cool'
              })
            throw ' no response';
        }

        Swal.fire(
            'Bienvenido!',
            usuario.nombre,
            'success'
          )
   
        sessionStorage.setItem('userId', usuario._id);
        sessionStorage.setItem('email', usuario.email);
        sessionStorage.setItem('nombre', usuario.nombre);

        document.getElementById('container-scroller').style.display = 'block';
        document.getElementById('loginStyle').style.display = 'none';


        return usuario;
    
    } catch (error) {
        console.log("ERROR" + error);
    }
}


export const register = async(email, nombre, password) => {
    try {
        const resp = await fetch(url + '/usuario', {
            method: 'POST',
            body: `{"nombre": "${nombre}", "email": "${email}", "password": "${password}", "role": "ADMIN_ROLE"}`,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const usuario = await resp.json();

        console.log(usuario);
        // 61c0d6ff308d2c00163eca2a
        if(resp.ok) {
            Swal.fire(
                'Good job!',
                usuario.nombre,
                'success'
              )

              document.getElementById('registerStyle').style.display = 'none';
              document.getElementById('loginStyle').style.display = 'block';
        }

        return usuario;
    
    } catch (error) {
        console.log("ERROR" + error);
    }
}