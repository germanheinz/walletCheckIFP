
import { obtenerIngresosEgresos, createIngresosEgresos, getTime } from './http-provider';
import 'regenerator-runtime/runtime'

const body       = document.body;
let ingresoTotal = 0;
let egresoTotal  = 0;
let tbody;

const crearHtml = () => {
    
    const div = document.createElement('div');
    body.appendChild( div );
    tbody = document.querySelector('tbody');
    

}

const crearFilaIngresoEgreso = (ingresoEgreso) => {

    const html = `
    <td scope="col">1</td>
    <td scope="col"> ${ingresoEgreso.title} </td>
    <td scope="col"> ${ingresoEgreso.price} </td>
    <td scope="col"> ${ingresoEgreso.date} </td>
    `;
    
    const tr = document.createElement('tr');
    tr.innerHTML = html;
    
    if(ingresoEgreso.role == 'INGRESO'){
        tr.className = 'table-success';
        ingresoTotal = parseInt(ingresoEgreso.price) + ingresoTotal;
    }
    if(ingresoEgreso.role == 'EGRESO'){
        tr.className = 'table-danger';
        egresoTotal = parseInt(ingresoEgreso.price) + egresoTotal;
    }
    
    tbody.appendChild(tr);

}

export const totalEgresoIngreso = () =>  {

    const h3 = document.createElement('h3');

    const h3Ingreso = `
    <h3 class='font-weight-medium text-right mb-0' id='ingresoTotal'>$${ingresoTotal}</h3>`;

    const h3E = document.createElement('h3');

    const h3Egreso = `
    <h3 class='font-weight-medium text-right mb-0' id='egresoTotal'>$${egresoTotal}</h3>`;

    h3.innerHTML = h3Ingreso; 
    divTotal.appendChild(h3);

    h3E.innerHTML = h3Egreso;
    divEgresos.appendChild(h3E);

       
    console.log("ingresoTotal");
    console.log(ingresoTotal);
} 


export const init = async() => {

    crearHtml();

      totalEgresoIngreso();

    const ingresoEgresoList = await obtenerIngresosEgresos().then((response) => {
        const { ingresosEgresos } = response;
        return ingresosEgresos;
    });
    ingresoEgresoList.forEach(crearFilaIngresoEgreso);

    const divTotal = document.querySelector('div');
    body.appendChild( divTotal );
    tbodyingresoTotal = document.querySelector('h3');

    const divEgresos = document.querySelector('div');
    body.appendChild( divEgresos );
    tbodyEgresoTotal = document.querySelector('h3');


    
  
 


}

export const saveIngresoEgreso = (title, description, price, date, ingresoEgreso) => {

    createIngresosEgresos({
        title,
        price, 
        description,
        date,
        role: ingresoEgreso
    })

}

