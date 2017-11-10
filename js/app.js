//declarar un array que representará los asientos de nuestro avión con false indicando que estos estan vacios
//ocupado = true

var airlineSeats = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false
];

//contador que nos ayudara a rastrear el numero de asientos acoupados
var busySeats = 0;

//declarar una funcion que pinte nuestros asientos
var paintSeats = function(array) {
  var containerSeats = document.getElementById('seats');

  for (var i = 0; i < array.length; i++) {
    var seat = document.createElement('div');
    seat.className = 'seats';

    //del primer elemento al cuarto, en nuestro arreglo va a ser primera clase, que seria del indice 0 al indice 3
    if (i < 4) {
      seat.style.background = 'purple';
    }else {
      seat.style.background = 'yellow';
    }
    containerSeats.appendChild(seat);
  }
};

//funcion para reservar los asientos
var reserve = function() {
  var btn = document.getElementById('btn');
  btn.addEventListener('click', chooseZone);
};

var chooseZone = function() {
  var choice = prompt(
    'En que zona prefieres reservar \n 1. Primera Clase \n 2. Economica \n \n Por favor ingresa el numero de tu preferencia'
  );

  if (choice == 1) {
    checkFirstClassZone();
  } else if (choice == 2) {
    checkEconomicZone();
  } else {
    alert('Por favor ingresa un numero valido');
  }
};

var checkFirstClassZone = function() {
  //crear variable que nos indique que estamos en primera clase
  var zone = 'Primera Clase';
  //rrecorre del elemento 0 al elemento 3 y verifica cuales estan disponibles
  for (var index = 0; index < 4; index++) {
    if (airlineSeats[index] == false) {
      airlineSeats[index] = true;
      reserveSeat(index);
      paintTicket(index,zone);
      busySeats++;
      //al reservar un asiento no necesitamos seguir recorriendo nuestro arreglo
      //rompemos el for con break
      break;
    } else if (index == 3 && airlineSeats[index] == true) {
      reasignEconomicZone(zone);
    }
  }
};

var checkEconomicZone = function() {
  var zone = 'Economica';
  //rrecorre del elemento 4 al elemento 9 y verifica cuales estan disponibles
  for (var index = 4; index < 10; index++) {
    if (airlineSeats[index] == false) {
      airlineSeats[index] = true;
      reserveSeat(index);
      paintTicket(index,zone);
      busySeats++;
      break;
    } else if (index == 9 && airlineSeats[index] == true) {
      reasignFirstClassZone(zone);
    }
  }
};

var reserveSeat = function(indexToPaint) {
  var seat = document.getElementsByClassName('seats');
  seat[indexToPaint].textContent = 'Ocupado';
}

var reasignEconomicZone = function(zone) {
  if (busySeats == 10) {
    noSeats();
    nextFlight();
  } else {
    //¿Porque utilizo un metodo?
    var reasign = confirm(
      'Ya no quedan asientos disponibles en ' + zone + ' :( \n Quieres reservar en zona Economica? '
    );

    if (reasign == true) {
      checkEconomicZone();
    } else {
      nextFlight();
    }
  }
};

var reasignFirstClassZone = function(zone) {
  if (busySeats == 10) {
    noSeats();
    nextFlight();
  } else {
    var reasign = confirm(
      'Ya no quedan asientos disponibles en ' + zone + ' :( \n Quieres reservar en Primera Clase? '
    );

    if (reasign == true) {
      checkFirstClassZone();
    } else {
      nextFlight();
    }
  }
};

var paintTicket = function(index, zone) {
  //llamamos por id del html
  var containerTickets = document.getElementById('tickets');
  //creamos los datos del ticket
  var ticket = document.createElement('div');
  ticket.className = 'seats';
  var title = document.createElement('p');
  var reservedSeating = document.createElement('p');
  var zoneClass = document.createElement('p');
  //creamos el contenido de los datos del ticket
  title.textContent = 'PASE DE ABORDAR';
  reservedSeating.textContent = 'No. de asiento; ' + (index + 1);
  zoneClass.textContent = zone;
  //agregamos como hijos al padre que es el ticket
  ticket.appendChild(title);
  ticket.appendChild(reservedSeating);
  ticket.appendChild(zoneClass);
  //agregamos a nuestro contenedor que tenemos fisicamente en nuestro dom
  containerTickets.appendChild(ticket);
};

var nextFlight = function() {
  alert('Nuestro proximo vuelo sale en 3 horas')
};

var noSeats = function() {
  alert('Lo sentimos :( \n Ya no quedan asientos disponibles en este avión.');
}
paintSeats(airlineSeats);
reserve();
