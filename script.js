const menuButton = document.querySelector('.menu-button');
const navMenu = document.querySelector('.nav-menu');
const form = document.querySelector('#contact-form');
const message = document.querySelector('#form-message');
const phone = document.querySelector('#telefono');
const reason = document.querySelector('#motivo');
const charCount = document.querySelector('#char-count');
const dateInput = document.querySelector('#fecha');
const schedule = document.querySelector('#horario');
const service = document.querySelector('#servicio');
const selectedService = document.querySelector('#selected-service');
const requestSummary = document.querySelector('#request-summary');
const formSteps = [...document.querySelectorAll('.form-step')];
const progressSteps = [...document.querySelectorAll('[data-progress]')];
const backToTop = document.querySelector('.back-to-top');
const scrollProgress = document.querySelector('.scroll-progress span');
let currentStep = 0;

const pad = (number) => String(number).padStart(2, '0');
const localISODate = (date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

function closeMenu() {
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Abrir menú');
  navMenu?.classList.remove('active');
  document.body.classList.remove('menu-open');
}

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Abrir menú' : 'Cerrar menú');
  navMenu.classList.toggle('active', !open);
  document.body.classList.toggle('menu-open', !open);
});

navMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

// Entrada inicial y revelado progresivo
requestAnimationFrame(() => document.body.classList.add('site-ready'));

const revealGroups = [
  ['.section-heading, .process-copy, .about-copy, .booking-copy', ''],
  ['.service-card, .confidence-grid article, .values article, .accordion details, .steps li', ''],
  ['.about-visual', 'reveal-left'],
  ['.form-card', 'reveal-right'],
  ['.scope-note, .urgent-note .container', '']
];

revealGroups.forEach(([selector, direction]) => {
  document.querySelectorAll(selector).forEach((element, index) => {
    element.classList.add('reveal');
    if (direction) element.classList.add(direction);
    element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 90}ms`);
  });
});

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll('.reveal, .steps').forEach((element) => revealObserver.observe(element));
} else {
  document.querySelectorAll('.reveal, .steps').forEach((element) => element.classList.add('is-visible'));
}

// Barra de progreso y botón para volver arriba
let scrollTicking = false;
function updateScrollUI() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
  if (scrollProgress) scrollProgress.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
  backToTop?.classList.toggle('visible', window.scrollY > 700);
  scrollTicking = false;
}

window.addEventListener('scroll', () => {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(updateScrollUI);
}, { passive: true });
updateScrollUI();
backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Destaca la sección actual en el menú
const trackedSections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav-menu a[href^="#"]')];
if ('IntersectionObserver' in window) {
  const navObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach((link) => {
      const active = link.getAttribute('href') === `#${visible.target.id}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.2, 0.5] });
  trackedSections.forEach((section) => navObserver.observe(section));
}

// Preguntas frecuentes
const details = [...document.querySelectorAll('.accordion details')];
details.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    details.forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

// Agenda por pasos
if (dateInput) dateInput.min = localISODate(new Date());

function updateSchedules() {
  if (!schedule) return;
  const selected = service?.selectedOptions[0];
  const duration = Number(selected?.dataset.duration || 0);
  schedule.innerHTML = '<option value="">Selecciona un bloque</option>';
  if (!duration) return;

  const opening = 10 * 60;
  const closing = 18 * 60;
  for (let start = opening; start + duration <= closing; start += 15) {
    const hour = Math.floor(start / 60);
    const minutes = start % 60;
    const option = document.createElement('option');
    option.value = `${pad(hour)}:${pad(minutes)}`;
    option.textContent = `${pad(hour)}:${pad(minutes)} hrs · ${duration} min`;
    schedule.append(option);
  }
}

function updateServiceDisplay() {
  const option = service?.selectedOptions[0];
  if (!selectedService || !option?.value) {
    if (selectedService) selectedService.innerHTML = '';
    return;
  }
  selectedService.innerHTML = `<strong>${option.dataset.name}</strong>${option.dataset.duration} minutos · ${option.dataset.price}`;
  document.querySelectorAll('.service-card').forEach((card) => {
    card.classList.toggle('selected', card.querySelector('[data-service]')?.dataset.service === option.value);
  });
}

function validateDate() {
  if (!dateInput?.value) return;
  const selectedDate = new Date(`${dateInput.value}T12:00:00`);
  const day = selectedDate.getDay();
  dateInput.setCustomValidity(day === 0 || day === 1 ? 'La atención se realiza de martes a sábado.' : '');
}

function updateSummary() {
  if (!requestSummary) return;
  const option = service?.selectedOptions[0];
  if (!option?.value || !dateInput?.value || !schedule?.value) {
    requestSummary.innerHTML = '<strong>Resumen de la solicitud</strong>Completa el servicio, la fecha y el horario.';
    return;
  }
  const formattedDate = new Intl.DateTimeFormat('es-CL', { dateStyle: 'long' }).format(new Date(`${dateInput.value}T12:00:00`));
  requestSummary.innerHTML = `<strong>${option.dataset.name}</strong>${formattedDate}, ${schedule.value} hrs · ${option.dataset.duration} min · ${option.dataset.price}`;
}

function validateStep(index) {
  const fields = [...(formSteps[index]?.querySelectorAll('input, select, textarea') || [])];
  fields.forEach((field) => field.removeAttribute('aria-invalid'));
  validateDate();
  const invalid = fields.find((field) => !field.checkValidity());
  if (!invalid) return true;
  invalid.setAttribute('aria-invalid', 'true');
  invalid.reportValidity();
  invalid.focus();
  return false;
}

function goToStep(index, shouldFocus = true) {
  currentStep = Math.max(0, Math.min(index, formSteps.length - 1));
  formSteps.forEach((step, stepIndex) => step.classList.toggle('active', stepIndex === currentStep));
  progressSteps.forEach((step, stepIndex) => {
    step.classList.toggle('active', stepIndex === currentStep);
    step.classList.toggle('done', stepIndex < currentStep);
  });
  message.className = 'form-message';
  message.textContent = '';
  if (currentStep === 2) updateSummary();
  if (shouldFocus) formSteps[currentStep]?.querySelector('legend')?.focus?.();
}

form?.querySelectorAll('[data-next]').forEach((button) => {
  button.addEventListener('click', () => {
    if (validateStep(currentStep)) goToStep(currentStep + 1, false);
  });
});
form?.querySelectorAll('[data-back]').forEach((button) => button.addEventListener('click', () => goToStep(currentStep - 1, false)));

service?.addEventListener('change', () => {
  updateSchedules();
  updateServiceDisplay();
});
dateInput?.addEventListener('change', () => {
  validateDate();
  if (!dateInput.checkValidity()) dateInput.reportValidity();
});

document.querySelectorAll('[data-service]').forEach((link) => {
  link.addEventListener('click', () => {
    service.value = link.dataset.service;
    updateSchedules();
    updateServiceDisplay();
    goToStep(1, false);
  });
});

phone?.addEventListener('input', () => {
  const digits = phone.value.replace(/\D/g, '').replace(/^56/, '').slice(0, 9);
  if (digits.length <= 1) phone.value = digits;
  else if (digits.length <= 5) phone.value = `${digits.slice(0, 1)} ${digits.slice(1)}`;
  else phone.value = `${digits.slice(0, 1)} ${digits.slice(1, 5)} ${digits.slice(5)}`;
});

reason?.addEventListener('input', () => {
  charCount.textContent = reason.value.length;
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const fields = [...form.querySelectorAll('input, select, textarea')];
  fields.forEach((field) => field.removeAttribute('aria-invalid'));
  validateDate();

  const invalid = fields.find((field) => !field.checkValidity());
  if (invalid) {
    const invalidStep = formSteps.findIndex((step) => step.contains(invalid));
    if (invalidStep >= 0) goToStep(invalidStep, false);
    invalid.setAttribute('aria-invalid', 'true');
    invalid.reportValidity();
    invalid.focus();
    message.className = 'form-message error';
    message.textContent = 'Revisa los campos obligatorios antes de continuar.';
    return;
  }

  const digits = phone.value.replace(/\D/g, '');
  if (digits.length !== 9 || !digits.startsWith('9')) {
    phone.setAttribute('aria-invalid', 'true');
    phone.focus();
    message.className = 'form-message error';
    message.textContent = 'Ingresa un número móvil chileno de 9 dígitos.';
    return;
  }

  const option = service.selectedOptions[0];
  const formattedDate = new Intl.DateTimeFormat('es-CL', { dateStyle: 'long' }).format(new Date(`${dateInput.value}T12:00:00`));
  const request = [
    'Hola, quisiera solicitar una hora en HF Avanzamed.', '',
    `Nombre: ${document.querySelector('#nombre').value.trim()}`,
    `Teléfono: +56 ${phone.value.trim()}`,
    `Correo: ${document.querySelector('#email').value.trim()}`,
    `Atención: ${option.dataset.name}`,
    `Duración: ${option.dataset.duration} minutos`,
    `Valor: ${option.dataset.price}`,
    `Fecha solicitada: ${formattedDate}`,
    `Horario solicitado: ${schedule.value} hrs`,
    `Motivo general: ${reason.value.trim()}`, '',
    'Entiendo que la hora queda pendiente de confirmación.'
  ].join('\n');

  message.className = 'form-message info';
  message.textContent = 'Abriendo WhatsApp. La hora quedará pendiente de confirmación.';
  window.open(`https://wa.me/56956049401?text=${encodeURIComponent(request)}`, '_blank', 'noopener');
});

goToStep(0, false);
updateServiceDisplay();
updateSummary();
document.querySelector('#year').textContent = new Date().getFullYear();
