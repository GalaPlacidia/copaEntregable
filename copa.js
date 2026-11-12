const datosIniciales = {
  nombre: 'Copa Pixel 2026',
  duracionSegundos: 10,
  participantes: [
    { nombre: 'Ryu Master', puntos: 2400, pais: 'JP' },
    { nombre: 'LuciaFire', puntos: 3100, pais: 'ES' },
    { nombre: 'DragonKick99', puntos: 1850, pais: 'MX' },
    { nombre: 'ZeroCool', puntos: 2950, pais: 'US' },
  ],
};

let conteoFinal = 0;
let conteoInicial = 0;
const texto = JSON.stringify(datosIniciales);

let tarjetas = document.getElementById('carteles');
let cronometro = document.getElementById('contador');
let cronometro2 = document.getElementById('contador2');
let botonInicio = document.createElement('button');
let botonResetear = document.createElement('button');
botonInicio.textContent = 'Iniciar';
botonResetear.textContent = 'Resetear';
cronometro2.appendChild(botonInicio);
cronometro2.appendChild(botonResetear);
let tiempo = Number(datosIniciales.duracionSegundos);

let id;
//console.log(datosIniciales.participantes.nombre[0]);

botonInicio.addEventListener('click', () => {
  conteoInicial++;
  if (conteoInicial == 1) {
    id = setInterval(() => {
      tiempo--;
      cronometro.textContent = tiempo;
      if (tiempo == 0) {
        clearInterval(id);
        conteoFinal++;
        cronometro.textContent = 'Votación cerrada';
      }
    }, 1000);
  }
});
cargarDatos();
function pintar() {
  tarjetas.textContent = '';
  for (let i = 0; i < datosIniciales.participantes.length; i++) {
    let pes = document.createElement('p');
    let boton = document.createElement('button');
    pes.textContent += datosIniciales.participantes[i].nombre + ' \n';
    pes.textContent += ' \n' + datosIniciales.participantes[i].puntos + ' \n';
    pes.textContent += ' \n' + datosIniciales.participantes[i].pais + ' \n';
    boton.textContent = 'suma 50';
    tarjetas.appendChild(pes);
    tarjetas.appendChild(boton);

    boton.addEventListener('click', () => {
      if (conteoFinal == 0 && conteoInicial == 1) {
        datosIniciales.participantes[i].puntos += 50;
        pintar();
        guardaDatos();
      }
    });
  }
}

pintar();

function guardaDatos() {
  for (let i = 0; i < datosIniciales.participantes.length; i++) {
    let nombre = datosIniciales.participantes[i].nombre;
    let puntos = datosIniciales.participantes[i].puntos;
    localStorage.setItem(nombre, puntos);
  }
}

function cargarDatos() {
  //let texto2 = JSON.parse(texto);
  for (let i = 0; i < datosIniciales.participantes.length; i++) {
    let nombre = datosIniciales.participantes[i].nombre;
    let puntos = localStorage.getItem(nombre);
    if (puntos != null) {
      datosIniciales.participantes[i].nombre = nombre;
      datosIniciales.participantes[i].puntos = Number(puntos);
    }
  }
}

botonResetear.addEventListener('click', () => {
  let texto2 = JSON.parse(texto);
  for (let i = 0; i < texto2.participantes.length; i++) {
    let nombre = texto2.participantes[i].nombre;
    let puntos = texto2.participantes[i].puntos;

    datosIniciales.participantes[i].nombre = nombre;
    datosIniciales.participantes[i].puntos = puntos;
  }
  pintar();
});
