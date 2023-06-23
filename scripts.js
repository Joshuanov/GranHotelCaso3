//VALIDACIONES

// Obtener elementos del formulario
const reservaForm = document.getElementById('reserva-form');
const nombreInput = document.getElementById('nombre');
const apellidoInput = document.getElementById('apellido');
const fechaInicioInput = document.getElementById('fecha-inicio');
const fechaFinInput = document.getElementById('fecha-fin');
const tipoHabitacionSelect = document.getElementById('tipo-habitacion');
const serviciosCheckbox = document.getElementsByName('servicios');
const btnEnviar = document.querySelector('.btn-submit');

// Validar el campo nombre
nombreInput.addEventListener('input', () => {
  const nombreValue = nombreInput.value.trim();
  nombreInput.value = nombreValue.replace(/\s+/g, ' ');
  nombreInput.value = nombreValue.replace(/^(.)(.*)$/, (_, first, rest) => first.toUpperCase() + rest.toLowerCase());
});

// Validar el campo apellido
apellidoInput.addEventListener('input', () => {
  const apellidoValue = apellidoInput.value.trim();
  apellidoInput.value = apellidoValue.replace(/\s+/g, ' ');
  apellidoInput.value = apellidoValue.replace(/^(.)(.*)$/, (_, first, rest) => first.toUpperCase() + rest.toLowerCase());
});

// Calcular precio por noche
function calcularPrecioPorNoche(tipoHabitacion) {
  let precioPorNoche = 0;
  switch (tipoHabitacion) {
    case 'simple':
      precioPorNoche = 30000;
      break;
    case 'doble':
      precioPorNoche = 60000;
      break;
    case 'triple':
      precioPorNoche = 90000;
      break;
    case 'deluxe':
      precioPorNoche = 120000;
      break;
  }
  return precioPorNoche;
}

// Calcular cantidad de noches
function calcularCantidadNoches() {
  const fechaInicio = new Date(fechaInicioInput.value);
  const fechaFin = new Date(fechaFinInput.value);
  const diffTime = Math.abs(fechaFin - fechaInicio);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// Calcular precio total
function calcularPrecioTotal() {
  const tipoHabitacion = tipoHabitacionSelect.value;
  const precioPorNoche = calcularPrecioPorNoche(tipoHabitacion);
  const cantidadNoches = calcularCantidadNoches();
  const precioTotal = precioPorNoche * cantidadNoches;
  return precioTotal;
}

// Mostrar modal con los datos de reserva
function mostrarModal() {
  const nombre = nombreInput.value;
  const apellido = apellidoInput.value;
  const fechaInicio = fechaInicioInput.value;
  const fechaFin = fechaFinInput.value;
  const tipoHabitacion = tipoHabitacionSelect.value;
  const servicios = [...serviciosCheckbox].filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
  const precioTotal = calcularPrecioTotal();

  const modalContent = `
    <div class="modal-content">
      <h2>Confirmar reserva</h2>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Apellido:</strong> ${apellido}</p>
      <p><strong>Fecha de inicio:</strong> ${fechaInicio}</p>
      <p><strong>Fecha de fin:</strong> ${fechaFin}</p>
      <p><strong>Tipo de habitación:</strong> ${tipoHabitacion}</p>
      <p><strong>Servicios adicionales:</strong> ${servicios.join(', ')}</p>
      <p><strong>Cantidad de noches:</strong> ${calcularCantidadNoches()}</p>
      <p><strong>Precio por noche:</strong> $${calcularPrecioPorNoche(tipoHabitacion)}</p>
      <p><strong>Precio total:</strong> $${precioTotal}</p>
      <button class="btn-reservar">Reservar</button>
    </div>
  `;

  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = modalContent;
  document.body.appendChild(modal);

  const btnReservar = document.querySelector('.btn-reservar');
  btnReservar.addEventListener('click', () => {
    // Aquí puedes agregar la lógica para enviar los datos de la reserva al servidor
    modal.remove();
    reservaForm.reset();
    alert('¡Reserva realizada con éxito!');
  });
}

// Validar el formulario al enviar
reservaForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombreValue = nombreInput.value.trim();
  const apellidoValue = apellidoInput.value.trim();
  const fechaInicioValue = fechaInicioInput.value;
  const fechaFinValue = fechaFinInput.value;
  const tipoHabitacionValue = tipoHabitacionSelect.value;
  const serviciosValue = [...serviciosCheckbox].some(checkbox => checkbox.checked);

  if (nombreValue === '') {
    alert('Por favor, ingresa tu nombre.');
    nombreInput.focus();
    return;
  }

  if (apellidoValue === '') {
    alert('Por favor, ingresa tu apellido.');
    apellidoInput.focus();
    return;
  }

  if (fechaInicioValue === '') {
    alert('Por favor, selecciona la fecha de inicio.');
    fechaInicioInput.focus();
    return;
  }

  if (fechaFinValue === '') {
    alert('Por favor, selecciona la fecha de fin.');
    fechaFinInput.focus();
    return;
  }

  const fechaInicio = new Date(fechaInicioValue);
  const fechaFin = new Date(fechaFinValue);

  if (fechaInicio.getTime() > fechaFin.getTime()) {
    alert('La fecha de fin debe ser posterior a la fecha de inicio.');
    fechaFinInput.focus();
    return;
  }

  if (tipoHabitacionValue === '') {
    alert('Por favor, selecciona el tipo de habitación.');
    tipoHabitacionSelect.focus();
    return;
  }

  if (!serviciosValue) {
    alert('Por favor, selecciona al menos un servicio adicional.');
    return;
  }

  mostrarModal();
});


//MOVIMIENTO

/*===== Mostrar menú =====*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle', 'nav-menu')

/*===== Activar y quitar menú =====*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {

    navLink.forEach(n => n.classList.remove('active'));
    this.classList.add('active');

    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*===== Animación scroll =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: true
});

/*Scroll hogar*/
sr.reveal('.hogar__titulo', {});
sr.reveal('.hogar__img', { delay: 400 });

/*Scroll que es*/
sr.reveal('.quees__img', {});
sr.reveal('.quees__subtitulo', { delay: 400 });
sr.reveal('.quees__texto', { delay: 400 });

/*Scroll características*/
sr.reveal('.caracteristicas__subtitulo', {});
sr.reveal('.caracteristicas__texto', {});
sr.reveal('.caracteristicas__data', { interval: 200 });
sr.reveal('.caracteristicas__img', { delay: 400 });

/* Slider hogar */
const slides = document.querySelector(".slider").children;
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const indicator = document.querySelector(".indicator");
let index = 0;


prev.addEventListener("click", function () {
    prevSlide();
    updateCircleIndicator();
    resetTimer();
})

next.addEventListener("click", function () {
    nextSlide();
    updateCircleIndicator();
    resetTimer();

})

function circleIndicator() {
    for (let i = 0; i < slides.length; i++) {
        const div = document.createElement("div");
        div.innerHTML = i + 1;
        div.setAttribute("onclick", "indicateSlide(this)")
        div.id = i;
        if (i == 0) {
            div.className = "active";
        }
        indicator.appendChild(div);
    }
}
circleIndicator();

function indicateSlide(element) {
    index = element.id;
    changeSlide();
    updateCircleIndicator();
    resetTimer();
}

function updateCircleIndicator() {
    for (let i = 0; i < indicator.children.length; i++) {
        indicator.children[i].classList.remove("active");
    }
    indicator.children[index].classList.add("active");
}

function prevSlide() {
    if (index == 0) {
        index = slides.length - 1;
    }
    else {
        index--;
    }
    changeSlide();
}

function nextSlide() {
    if (index == slides.length - 1) {
        index = 0;
    }
    else {
        index++;
    }
    changeSlide();
}

function changeSlide() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }

    slides[index].classList.add("active");
}

function resetTimer() {
    clearInterval(timer);
    timer = setInterval(autoPlay, 8000);
}


function autoPlay() {
    nextSlide();
    updateCircleIndicator();
}

let timer = setInterval(autoPlay, 8000);

