const menuButton = document.querySelector('.menu-button');
const navMenu = document.querySelector('.nav-menu');

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

const details = [...document.querySelectorAll('.accordion details')];
details.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    details.forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

const form = document.querySelector('#contact-form');
const message = document.querySelector('#form-message');
const phone = document.querySelector('#telefono');
const reason = document.querySelector('#motivo');
const charCount = document.querySelector('#char-count');

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

  const invalid = fields.find((field) => !field.checkValidity());
  if (invalid) {
    invalid.setAttribute('aria-invalid', 'true');
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

  message.className = 'form-message info';
  message.textContent = 'La solicitud está lista. Para enviarla, primero debemos configurar el correo o WhatsApp oficial de HF Avanzamed.';
});

document.querySelector('#year').textContent = new Date().getFullYear();
