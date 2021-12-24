
import { obtenerIngresosEgresos, createIngresosEgresos, deleteIngresosEgresos, getTime } from './http-provider';
import 'regenerator-runtime/runtime'

const body       = document.body;
var ingresoTotal= 0;
var egresoTotal = 0;
let tbody;

const crearHtml = () => {
    
    const div = document.createElement('div');
    body.appendChild( div );
    tbody = document.querySelector('tbody');
    

}

const crearFilaIngresoEgreso = (ingresoEgreso) => {

    const html = `
    <td scope="col" class="rowIngresoE"> ${ingresoEgreso._id}    </td>
    <td scope="col" class="rowIngresoE"> ${ingresoEgreso.title} </td>
    <td scope="col" class="rowIngresoE"> ${ingresoEgreso.price} </td>
    <td scope="col" class="rowIngresoE" class="text-success"> ${ingresoEgreso.date}  </td>
    <td scope="col" id="deleteItem" style="text-align: center; color:#e15151;"><i class="fas fa-trash"></i></td>
    `;
    
    const tr = document.createElement('tr');
    const td = document.getElementsByClassName('rowIngresoE');
    tr.innerHTML = html;

    console.log(td);
    
    if(ingresoEgreso.role == 'INGRESO'){
        td.className = 'green';

        var tds = tr.getElementsByTagName("td");

        for(var i = 0; i < tds.length; i++) {
            tds[i].style.color="green";
        }

        ingresoTotal = parseInt(ingresoEgreso.price) + ingresoTotal;
    }
    if(ingresoEgreso.role == 'EGRESO'){

        var tds = tr.getElementsByTagName("td");

        for(var i = 0; i < tds.length; i++) {
            tds[i].style.color="red";
        }
        egresoTotal = parseInt(ingresoEgreso.price) + egresoTotal;
    }
    console.log(ingresoTotal);
    console.log(egresoTotal);
    tbody.appendChild(tr);

}

export const totalEgresoIngreso = () =>  {

    const h3 = document.createElement('h3');

    // ingresoTotal = 10;
    // egresoTotal = 10;
    console.log(ingresoTotal);
    console.log(egresoTotal);
    const h3Ingreso = `
    <h3 class='font-weight-medium text-right mb-0' id='ingresoTotal'>$${ingresoTotal}</h3>`;

    const h3E = document.createElement('h3');

    const h3Egreso = `
    <h3 class='font-weight-medium text-right mb-0' id='egresoTotal'>$${egresoTotal}</h3>`;

    h3.innerHTML = h3Ingreso; 
    divTotal.appendChild(h3);

    h3E.innerHTML = h3Egreso;
    divEgresos.appendChild(h3E);
  
} 


export const init = async() => {

    crearHtml();

    const ingresoEgresoList = await obtenerIngresosEgresos().then((response) => {
        const { ingresosEgresos } = response;
        return ingresosEgresos;
    });
    ingresoEgresoList.forEach(crearFilaIngresoEgreso);

    addRowHandlers();

    const divTotal = document.querySelector('div');
    body.appendChild( divTotal );
    var tbodyingresoTotal = document.createElement('h3');

    const divEgresos = document.querySelector('div');
    body.appendChild( divEgresos );
    var tbodyEgresoTotal = document.querySelector('h3');

    totalEgresoIngreso();

}

export const saveIngresoEgreso = (title, description, price, date, ingresoEgreso) => {
    const userId = sessionStorage.getItem('userId');
    createIngresosEgresos({
        title,
        price, 
        description,
        date,
        role: ingresoEgreso,
        usuario: userId
    })

}

export const addRowHandlers = () => {
    var rows = document.getElementById("tableIngresoEgreso").rows;
    var id = '';
    for (var i = 0; i < rows.length; i++) {
        rows[i].onclick = function(){ return function(){
               id = this.cells[0].innerHTML;
                deleteIngresosEgresos(id);
        };}(rows[i]);
    }

   
}