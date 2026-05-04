// ===================================
// Menú Hamburguesa
// ===================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer click en un link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===================================
// Validación y Envío del Formulario
// ===================================

const agendarForm = document.getElementById('agendarForm');
const formMessage = document.getElementById('formMessage');

agendarForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Limpiar mensaje anterior
    formMessage.className = 'form-message';
    formMessage.textContent = '';
    
    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const especialidad = document.getElementById('especialidad').value;
    const fecha = document.getElementById('fecha').value;
    const razon = document.getElementById('razon').value.trim();
    const terminos = document.getElementById('terminos').checked;
    
    // Validaciones
    const errores = [];
    
    // Validar nombre
    if (nombre.length < 3) {
        errores.push('El nombre debe tener al menos 3 caracteres');
    }
    
    // Validar email
    if (!validarEmail(email)) {
        errores.push('Por favor ingresa un correo electrónico válido');
    }
    
    // Validar teléfono (formato chileno)
    if (!validarTelefonoChileno(telefono)) {
        errores.push('El teléfono debe estar en formato: +56 9 XXXX XXXX o 9 XXXX XXXX');
    }
    
    // Validar especialidad
    if (!especialidad) {
        errores.push('Debes seleccionar una especialidad');
    }
    
    // Validar fecha
    if (!fecha) {
        errores.push('Debes seleccionar una fecha');
    } else {
        const fechaSeleccionada = new Date(fecha);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        
        if (fechaSeleccionada < hoy) {
            errores.push('La fecha no puede ser anterior a hoy');
        }
    }
    
    // Validar motivo
    if (razon.length < 10) {
        errores.push('El motivo debe tener al menos 10 caracteres');
    }
    
    // Validar términos
    if (!terminos) {
        errores.push('Debes aceptar los términos y condiciones');
    }
    
    // Mostrar errores o éxito
    if (errores.length > 0) {
        formMessage.className = 'form-message error';
        formMessage.textContent = '❌ ' + errores[0];
    } else {
        // Simular envío exitoso
        formMessage.className = 'form-message success';
        formMessage.textContent = '✅ ¡Consulta agendada exitosamente! Te contactaremos pronto.';
        
        // Limpiar formulario
        agendarForm.reset();
        
        // Limpiar mensaje después de 5 segundos
        setTimeout(() => {
            formMessage.className = 'form-message';
            formMessage.textContent = '';
        }, 5000);
    }
});

// ===================================
// Funciones de Validación
// ===================================

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarTelefonoChileno(telefono) {
    // Acepta formatos: +56 9 XXXX XXXX, +569XXXXXXXX, 9 XXXX XXXX, 9XXXXXXXX
    const regex = /^(\+?56\s?9\s?\d{4}\s?\d{4}|\+?569\d{8}|9\s?\d{4}\s?\d{4}|9\d{8})$/;
    return regex.test(telefono);
}

// ===================================
// Formateo de Teléfono en Tiempo Real
// ===================================

const inputTelefono = document.getElementById('telefono');

inputTelefono.addEventListener('input', (e) => {
    let valor = e.target.value.replace(/\D/g, ''); // Remover caracteres no numéricos
    
    // Si comienza con 56, quitar los primeros 2 dígitos
    if (valor.startsWith('56')) {
        valor = valor.substring(2);
    }
    
    // Limitar a 9 dígitos
    if (valor.length > 9) {
        valor = valor.substring(0, 9);
    }
    
    // Formatear: 9 XXXX XXXX
    if (valor.length >= 1) {
        if (valor.length <= 1) {
            e.target.value = valor;
        } else if (valor.length <= 5) {
            e.target.value = valor.substring(0, 1) + ' ' + valor.substring(1);
        } else {
            e.target.value = valor.substring(0, 1) + ' ' + valor.substring(1, 5) + ' ' + valor.substring(5);
        }
    }
});

// ===================================
// Validación en Tiempo Real del Email
// ===================================

const inputEmail = document.getElementById('email');

inputEmail.addEventListener('blur', () => {
    const email = inputEmail.value.trim();
    if (email && !validarEmail(email)) {
        inputEmail.style.borderColor = '#dc3545';
    } else {
        inputEmail.style.borderColor = '';
    }
});

inputEmail.addEventListener('focus', () => {
    inputEmail.style.borderColor = '';
});

// ===================================
// Validación de Nombre en Tiempo Real
// ===================================

const inputNombre = document.getElementById('nombre');

inputNombre.addEventListener('blur', () => {
    const nombre = inputNombre.value.trim();
    if (nombre && nombre.length < 3) {
        inputNombre.style.borderColor = '#dc3545';
    } else {
        inputNombre.style.borderColor = '';
    }
});

inputNombre.addEventListener('focus', () => {
    inputNombre.style.borderColor = '';
});

// ===================================
// Validación de Motivo en Tiempo Real
// ===================================

const inputRazon = document.getElementById('razon');

inputRazon.addEventListener('blur', () => {
    const razon = inputRazon.value.trim();
    if (razon && razon.length < 10) {
        inputRazon.style.borderColor = '#dc3545';
    } else {
        inputRazon.style.borderColor = '';
    }
});

inputRazon.addEventListener('focus', () => {
    inputRazon.style.borderColor = '';
});

// ===================================
// Animación de Números (Contador)
// ===================================

function animarNumeros() {
    const statsBoxes = document.querySelectorAll('.stat-number');
    
    statsBoxes.forEach(box => {
        const numeroFinal = parseInt(box.textContent);
        
        // Si no es un número, no animar
        if (isNaN(numeroFinal)) return;
        
        let numeroActual = 0;
        const incremento = Math.ceil(numeroFinal / 50); // Dividir en 50 pasos
        
        const intervalo = setInterval(() => {
            numeroActual += incremento;
            
            if (numeroActual >= numeroFinal) {
                box.textContent = numeroFinal + '+';
                clearInterval(intervalo);
            } else {
                box.textContent = numeroActual + '+';
            }
        }, 30);
    });
}

// Ejecutar animación cuando se hace scroll a la sección
let animacionEjecutada = false;

window.addEventListener('scroll', () => {
    const seccionNosotros = document.getElementById('nosotros');
    const rect = seccionNosotros.getBoundingClientRect();
    
    // Si la sección está visible y no se ha ejecutado la animación
    if (rect.top < window.innerHeight && !animacionEjecutada) {
        animarNumeros();
        animacionEjecutada = true;
    }
});

// ===================================
// Validación de Fecha (No puede ser anterior a hoy)
// ===================================

const inputFecha = document.getElementById('fecha');

// Establecer fecha mínima a hoy
const hoy = new Date().toISOString().split('T')[0];
inputFecha.setAttribute('min', hoy);

inputFecha.addEventListener('change', () => {
    const fechaSeleccionada = new Date(inputFecha.value);
    const fechaHoy = new Date(hoy);
    
    if (fechaSeleccionada < fechaHoy) {
        inputFecha.style.borderColor = '#dc3545';
    } else {
        inputFecha.style.borderColor = '';
    }
});

inputFecha.addEventListener('focus', () => {
    inputFecha.style.borderColor = '';
});

// ===================================
// Scroll Suave
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Los enlaces ya tienen scroll suave gracias a: html { scroll-behavior: smooth; }
    // Pero agregamos funcionalidad adicional si es necesario
    
    // Si el navegador no soporta scroll smooth, implementar fallback
    if (!('scrollBehavior' in document.documentElement.style)) {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
});

// ===================================
// Cerrar menú al hacer click fuera
// ===================================

document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navMenu.classList.remove('active');
    }
});

// ===================================
// Agregar evento a checkbox de términos
// ===================================

const checkboxTerminos = document.getElementById('terminos');

checkboxTerminos.addEventListener('change', () => {
    if (checkboxTerminos.checked) {
        checkboxTerminos.parentElement.style.color = 'var(--dark-gray)';
    } else {
        checkboxTerminos.parentElement.style.color = 'var(--text-gray)';
    }
});

// ===================================
// Información en Consola
// ===================================

console.log('%c🏥 HF Avanzamed', 'color: #0066cc; font-size: 20px; font-weight: bold;');
console.log('%cSitio web profesional para centro médico online chileno', 'color: #4ecdc4; font-size: 14px;');
console.log('%cDesarrollado por: Julio Hernández', 'color: #666; font-size: 12px;');
