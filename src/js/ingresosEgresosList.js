
import { obtenerIngresosEgresos, createIngresosEgresos, deleteIngresosEgresos, getTime } from './http-provider';
// import {cargarLocalStorage, guardarLocalStorage, IngresoEgresoList} from './IngresoEgresoList';
import 'regenerator-runtime/runtime'

const body       = document.body;
var ingresoTotal= 0;
var egresoTotal = 0;
let tbody;

const crearHtml = () => {
    
    tbody = document.querySelector('tbody');

}
export const borrarHtml = () => {
    
    $("#ingresoTotal").remove();
    $("#egresoTotal").remove();
    ingresoTotal = 0;
    egresoTotal = 0;
    

} 


const crearFilaIngresoEgreso = (ingresoEgreso) => {

    const html = `
    <td scope="col" class="rowIngresoE"> ${ingresoEgreso._id}    </td>
    <td scope="col" class="rowIngresoE"> ${ingresoEgreso.title} </td>
    <td scope="col" class="rowIngresoE"> ${ingresoEgreso.price} </td>
    <td scope="col" class="rowIngresoE" class="text-success"> ${ingresoEgreso.date}  </td>
    <td scope="col" class="trashClass" id="deleteItem" style="text-align: center; color:#e15151;"><i class="fas fa-trash"></i></td>
    `;
    
    const tr = document.createElement('tr');
    tr.id = 'someId';
    const td = document.getElementsByClassName('rowIngresoE');
    tr.innerHTML = html;
    
    if(ingresoEgreso.role == 'INGRESO'){
        td.className = 'green';

        var tds = tr.getElementsByTagName("td");

        for(var i = 0; i < tds.length; i++) {
            tds[i].style.color="green";
        }
        console.log(ingresoEgreso.price);
        ingresoTotal = parseInt(ingresoEgreso.price) + ingresoTotal;
        console.log(ingresoTotal);
    }
    if(ingresoEgreso.role == 'EGRESO'){

        var tds = tr.getElementsByTagName("td");

        for(var i = 0; i < tds.length; i++) {
            tds[i].style.color="red";
        }
        egresoTotal = parseInt(ingresoEgreso.price) + egresoTotal;
    }

    google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawChart);

    tbody.appendChild(tr);

}
function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Task', 'Ingresos / Egresos'],
      ['Egresos',     egresoTotal],
      ['Ingresos',      ingresoTotal],
    ]);

    var options = {
      title: 'My Daily Activities',
      is3D: true,
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
    chart.draw(data, options);
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
  
} 


export const init = async() => {

    crearHtml();

    const divTotal = document.querySelector('div');
    body.appendChild( divTotal );

    const divEgresos = document.querySelector('div');
    body.appendChild( divEgresos );
}

export const test = async() => {
    const ingresoEgresoList = await obtenerIngresosEgresos().then((response) => {
        const { ingresosEgresos } = response;
        return ingresosEgresos;
    });

    localStorage.setItem('ingresosEgresos', JSON.stringify(ingresoEgresoList));
    var listIngresoEgreso = localStorage.getItem('ingresosEgresos');

    ingresoEgresoList.forEach(crearFilaIngresoEgreso);
    addRowHandlers();
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
               const idToRemove = sessionStorage.setItem('idToRemove', id);
               console.log(id);

               localStorage.removeItem('_id', id);
               deleteIngresosEgresos(id);
                $(".tt").empty();
                $("#ingresoTotal").remove();
                $("#egresoTotal").remove();
                ingresoTotal = 0;
                egresoTotal = 0;
                init();
                test();

        };}(rows[i]);
    }

   
}
