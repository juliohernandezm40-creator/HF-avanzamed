# 🏥 HF Avanzamed - Centro Médico Online Chileno

## 📋 Descripción

**HF Avanzamed** es un sitio web profesional y moderno para un centro médico online chileno. Proporciona una plataforma completa para que los pacientes accedan a consultas médicas virtuales, agendar citas y obtener información sobre servicios de salud especializados.

## ✨ Características Principales

### 🎯 Secciones Implementadas

1. **Inicio (Hero)** - Bienvenida atractiva con call-to-action
2. **Servicios** - 6 especialidades médicas con descripción
3. **Quiénes Somos** - Información, misión, valores y estadísticas
4. **Agendar Hora** - Formulario completo con validación
5. **Contacto** - Información de contacto, horarios y redes sociales
6. **Footer** - Enlaces rápidos y información legal

### 🎨 Diseño Responsivo

- ✅ Adaptable a **móviles**, **tablets** y **desktop**
- ✅ Interfaz limpia y profesional
- ✅ Colores médicos confiables: Azul, Verde Suave, Blanco
- ✅ Tipografía moderna y legible

### 🔧 Funcionalidades JavaScript

- ✅ Menú hamburguesa inteligente
- ✅ Validación completa del formulario en tiempo real
- ✅ Validación específica para teléfono chileno
- ✅ Animación de números (contador de estadísticas)
- ✅ Scroll suave entre secciones
- ✅ Efectos hover y transiciones
- ✅ Formateo automático de teléfono

## 🗂️ Estructura de Archivos

```
HF-avanzamed/
├── index.html          # Estructura HTML principal
├── styles.css          # Estilos CSS responsivos
├── script.js           # Funcionalidades JavaScript
└── README.md           # Este archivo
```

## 🚀 Cómo Usar

### 1. **Descarga o clona el repositorio**

```bash
git clone https://github.com/juliohernandezm40-creator/HF-avanzamed.git
cd HF-avanzamed
```

### 2. **Abre el archivo index.html**

Simplemente haz doble clic en `index.html` o abre el archivo con tu navegador favorito.

```
Abre: /ruta/a/tu/carpeta/index.html
```

### 3. **Sin dependencias externas**

El sitio funciona **100% en el navegador** sin necesidad de servidor, base de datos o dependencias npm.

## 🎯 Validaciones del Formulario

El formulario valida:

- **Nombre**: Mínimo 3 caracteres
- **Email**: Formato válido (ejemplo@dominio.com)
- **Teléfono**: Formato chileno (+56 9 XXXX XXXX)
- **Especialidad**: Debe seleccionar una opción
- **Fecha**: No puede ser anterior a hoy
- **Motivo**: Mínimo 10 caracteres descriptivos
- **Términos**: Debe aceptar para proceder

## 🎨 Paleta de Colores

```css
--primary-blue: #0066cc       /* Azul profesional */
--dark-blue: #004499          /* Azul oscuro */
--soft-green: #4ecdc4         /* Verde suave */
--light-blue: #e6f0ff         /* Azul claro */
--white: #ffffff              /* Blanco */
--light-gray: #f5f7fa         /* Gris claro */
--dark-gray: #333333          /* Gris oscuro */
```

## 📱 Puntos de Quiebre (Breakpoints)

- **Desktop**: Más de 1024px
- **Tablet**: 768px - 1024px
- **Móvil**: Menos de 768px
- **Móvil pequeño**: Menos de 480px

## 🔐 Privacidad y Seguridad

- ✅ No recopila datos personales en servidor
- ✅ Formulario con validación local
- ✅ Pronto: Integración con backend seguro
- ✅ Cumple normativas de privacidad chilena

## 🛠️ Personalización

### Cambiar datos de contacto

Edita en `index.html`:

```html
<a href="tel:+56912345678">+56 9 1234 5678</a>
<a href="mailto:info@hfavanzamed.cl">info@hfavanzamed.cl</a>
```

### Cambiar colores

Edita en `styles.css`:

```css
:root {
    --primary-blue: #0066cc;
    --soft-green: #4ecdc4;
    /* ... más variables */
}
```

### Agregar nuevas especialidades

Edita en `index.html` (sección servicios y formulario):

```html
<div class="servicio-card">
    <span class="servicio-icon">🔬</span>
    <h3>Nueva Especialidad</h3>
    <p>Descripción de la especialidad...</p>
</div>
```

## 📊 Navegadores Soportados

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

## 🔗 Próximos Pasos

### Para Implementación en Producción

1. **Backend API** - Conectar formulario con base de datos
2. **Autenticación** - Sistema de login de pacientes
3. **Pagos** - Integración con pasarelas de pago chilenas
4. **Email** - Sistema de confirmación de citas por correo
5. **SMS** - Notificaciones por mensaje de texto
6. **Video llamada** - Integración de videoconsultas
7. **CMS** - Sistema para gestionar especialistas y disponibilidad

## 📄 Estructura del Formulario

```
Nombre Completo
├── Email
├── Teléfono
├── Especialidad (Select)
├── Fecha Preferida (Date)
├── Motivo de Consulta (Textarea)
└── Aceptar Términos (Checkbox)
```

## 🎬 Animaciones Incluidas

- ✅ Float infinito del icono médico en hero
- ✅ Animación de números en estadísticas
- ✅ Efectos hover en tarjetas
- ✅ Transiciones suaves en botones
- ✅ Transformaciones en scroll
- ✅ Hamburguesa animada (X)

## 📞 Datos de Ejemplo

- **Teléfono**: +56 9 1234 5678
- **Email**: info@hfavanzamed.cl
- **Ubicación**: Santiago, Chile
- **Horarios**: Lunes-Viernes 08:00-20:00, Sábado 09:00-18:00, Domingo 10:00-16:00

## 📖 Documentación de Código

Cada sección del CSS y JavaScript incluye comentarios descriptivos:

```javascript
// ===================================
// Descripción de la sección
// ===================================
```

## ⚖️ Licencia

Este proyecto es de uso libre para propósitos educativos y comerciales.

## 👨‍💻 Desarrollado por

**Julio Hernández** - @juliohernandezm40-creator

---

## 📋 Checklist de Funciones

- [x] Estructura HTML semántica
- [x] Estilos CSS responsivos
- [x] Menú hamburguesa
- [x] Validación de formulario
- [x] Animaciones suaves
- [x] Mobile first
- [x] Accesibilidad básica
- [x] Comentarios en código
- [x] SEO básico (meta tags)
- [x] Footer profesional

---

**¡Gracias por usar HF Avanzamed! 🏥💚**

Para soporte o consultas, contacta a través de los canales disponibles en el sitio.
