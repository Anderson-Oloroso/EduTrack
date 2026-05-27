// ============================================
// script.js - EduTrack Landing Page
// Pure JavaScript - No external dependencies
// Interactive features: Mobile menu, counter animation, form validation, smooth scroll
// ============================================

// ============================================
// DOM CONTENT LOADED
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // ============================================
    // 1. MOBILE MENU TOGGLE
    // ============================================
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    let isMenuOpen = false;
    
    if (mobileToggle && navMenu) {
        // Crear el menú móvil si no existe en el DOM
        if (!document.querySelector('.mobile-nav')) {
            const mobileNav = document.createElement('div');
            mobileNav.className = 'mobile-nav';
            mobileNav.innerHTML = `
                <div class="mobile-nav-header">
                    <span class="mobile-nav-logo">EduTrack</span>
                    <button class="mobile-nav-close">&times;</button>
                </div>
                <ul class="mobile-nav-menu">
                    <li><a href="#inicio" class="mobile-nav-link">Inicio</a></li>
                    <li><a href="#cursos" class="mobile-nav-link">Cursos</a></li>
                    <li><a href="#testimonios" class="mobile-nav-link">Testimonios</a></li>
                    <li><a href="#registro" class="mobile-nav-link">Registro</a></li>
                    <li><a href="#contacto" class="mobile-nav-link">Contacto</a></li>
                </ul>
                <div class="mobile-nav-cta">
                    <a href="#registro" class="btn-primary btn-full">Regístrate ahora</a>
                </div>
            `;
            document.body.appendChild(mobileNav);
            
            // Estilos dinámicos para el menú móvil
            const style = document.createElement('style');
            style.textContent = `
                .mobile-nav {
                    position: fixed;
                    top: 0;
                    right: -100%;
                    width: 85%;
                    max-width: 400px;
                    height: 100vh;
                    background: var(--color-bg-glass);
                    backdrop-filter: blur(20px);
                    z-index: 2000;
                    transition: var(--transition-base);
                    padding: var(--space-xl);
                    box-shadow: var(--shadow-xl);
                    border-left: 1px solid var(--color-border);
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-xl);
                    overflow-y: auto;
                }
                
                .mobile-nav.active {
                    right: 0;
                }
                
                .mobile-nav-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-bottom: var(--space-md);
                    border-bottom: 1px solid var(--color-border);
                }
                
                .mobile-nav-logo {
                    font-size: var(--text-xl);
                    font-weight: 800;
                    background: var(--gradient-glow);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    font-family: var(--font-secondary);
                }
                
                .mobile-nav-close {
                    background: none;
                    border: 1px solid var(--color-border);
                    color: var(--color-text-primary);
                    font-size: var(--text-2xl);
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    border-radius: var(--radius-sm);
                    transition: var(--transition-fast);
                }
                
                .mobile-nav-close:hover {
                    border-color: var(--color-primary);
                    color: var(--color-primary);
                }
                
                .mobile-nav-menu {
                    list-style: none;
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-md);
                }
                
                .mobile-nav-link {
                    color: var(--color-text-primary);
                    text-decoration: none;
                    font-size: var(--text-lg);
                    font-weight: 500;
                    padding: var(--space-sm) 0;
                    display: block;
                    transition: var(--transition-fast);
                }
                
                .mobile-nav-link:hover {
                    color: var(--color-primary);
                    padding-left: var(--space-sm);
                }
                
                .mobile-nav-cta {
                    margin-top: auto;
                    padding-top: var(--space-xl);
                }
                
                .nav-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    z-index: 1999;
                    opacity: 0;
                    visibility: hidden;
                    transition: var(--transition-base);
                }
                
                .nav-overlay.active {
                    opacity: 1;
                    visibility: visible;
                }
                
                @media (min-width: 768px) {
                    .mobile-nav, .nav-overlay {
                        display: none;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        const mobileNav = document.querySelector('.mobile-nav');
        const navOverlay = document.createElement('div');
        navOverlay.className = 'nav-overlay';
        document.body.appendChild(navOverlay);
        const closeBtn = document.querySelector('.mobile-nav-close');
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        
        function openMobileMenu() {
            mobileNav.classList.add('active');
            navOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function closeMobileMenu() {
            mobileNav.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        mobileToggle.addEventListener('click', openMobileMenu);
        
        if (closeBtn) {
            closeBtn.addEventListener('click', closeMobileMenu);
        }
        
        navOverlay.addEventListener('click', closeMobileMenu);
        
        mobileLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                closeMobileMenu();
                const targetId = link.getAttribute('href');
                if (targetId && targetId !== '#') {
                    e.preventDefault();
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        setTimeout(() => {
                            targetElement.scrollIntoView({ behavior: 'smooth' });
                        }, 300);
                    }
                }
            });
        });
    }
    
    // ============================================
    // 2. COUNTER ANIMATION (Estadísticas)
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        if (isNaN(target)) return;
        
        let current = 0;
        const increment = target / 50; // 50 frames
        const duration = 2000; // 2 segundos
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, stepTime);
    }
    
    function checkStatsVisibility() {
        if (animated) return;
        
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            const rect = statsSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top <= windowHeight - 100) {
                animated = true;
                statNumbers.forEach(stat => {
                    animateCounter(stat);
                });
            }
        }
    }
    
    // Ejecutar al cargar y al hacer scroll
    checkStatsVisibility();
    window.addEventListener('scroll', checkStatsVisibility);
    
    // ============================================
    // 3. FORM VALIDATION
    // ============================================
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener campos
            const nombre = document.getElementById('nombre');
            const email = document.getElementById('email');
            const telefono = document.getElementById('telefono');
            const interes = document.getElementById('interes');
            
            let isValid = true;
            let errorMessage = '';
            
            // Validar nombre
            if (!nombre.value.trim()) {
                isValid = false;
                errorMessage += '• Por favor ingresa tu nombre completo\n';
                showFieldError(nombre, 'El nombre es obligatorio');
            } else if (nombre.value.trim().length < 3) {
                isValid = false;
                errorMessage += '• El nombre debe tener al menos 3 caracteres\n';
                showFieldError(nombre, 'Mínimo 3 caracteres');
            } else {
                clearFieldError(nombre);
            }
            
            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim()) {
                isValid = false;
                errorMessage += '• Por favor ingresa tu correo electrónico\n';
                showFieldError(email, 'El correo es obligatorio');
            } else if (!emailRegex.test(email.value)) {
                isValid = false;
                errorMessage += '• Ingresa un correo electrónico válido (ej: nombre@dominio.com)\n';
                showFieldError(email, 'Correo inválido');
            } else {
                clearFieldError(email);
            }
            
            // Validar teléfono (opcional pero si tiene contenido, validar formato)
            if (telefono.value.trim()) {
                const phoneRegex = /^[\d\s\+\-\(\)]{7,15}$/;
                if (!phoneRegex.test(telefono.value.trim())) {
                    isValid = false;
                    errorMessage += '• El teléfono debe tener entre 7 y 15 dígitos\n';
                    showFieldError(telefono, 'Teléfono inválido');
                } else {
                    clearFieldError(telefono);
                }
            }
            
            // Validar interés
            if (!interes.value) {
                isValid = false;
                errorMessage += '• Por favor selecciona un área de interés\n';
                showFieldError(interes, 'Selecciona una opción');
            } else {
                clearFieldError(interes);
            }
            
            if (isValid) {
                // Mostrar mensaje de éxito
                showNotification('¡Registro exitoso! 🎉 Pronto un asesor se comunicará contigo.', 'success');
                registerForm.reset();
                
                // Aquí normalmente enviarías los datos a un servidor
                console.log('Formulario enviado:', {
                    nombre: nombre.value,
                    email: email.value,
                    telefono: telefono.value,
                    interes: interes.value
                });
            } else {
                // Mostrar mensaje de error
                showNotification('Por favor corrige los siguientes errores:\n' + errorMessage, 'error');
            }
        });
    }
    
    function showFieldError(field, message) {
        field.style.borderColor = '#FF2A7A';
        field.style.boxShadow = '0 0 0 3px rgba(255, 42, 122, 0.2)';
        
        // Eliminar mensaje de error existente
        const existingError = field.parentElement.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Crear nuevo mensaje de error
        const errorSpan = document.createElement('span');
        errorSpan.className = 'field-error';
        errorSpan.textContent = message;
        errorSpan.style.cssText = `
            display: block;
            color: #FF2A7A;
            font-size: 0.75rem;
            margin-top: 0.25rem;
        `;
        field.parentElement.appendChild(errorSpan);
    }
    
    function clearFieldError(field) {
        field.style.borderColor = '';
        field.style.boxShadow = '';
        const existingError = field.parentElement.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }
    
    function showNotification(message, type) {
        // Crear notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            max-width: 350px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#00E5A0' : '#FF2A7A'};
            color: ${type === 'success' ? '#0A0C10' : '#FFFFFF'};
            border-radius: 0.75rem;
            font-weight: 500;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        `;
        
        // Agregar animación
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // Eliminar después de 4 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }
    
    // ============================================
    // 4. SMOOTH SCROLL MEJORADO
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Ignorar si es solo "#" o está vacío
            if (targetId === '#' || !targetId) return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('.site-header')?.offsetHeight || 70;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Actualizar URL sin saltar
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // ============================================
    // 5. HEADER SCROLL EFFECT (cambiar fondo)
    // ============================================
    const header = document.querySelector('.site-header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.style.background = 'rgba(10, 12, 16, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(10, 12, 16, 0.85)';
            header.style.backdropFilter = 'blur(20px)';
        }
        
        lastScroll = currentScroll;
    });
    
    // ============================================
    // 6. ACTIVE NAV LINK ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNavLink() {
        let current = '';
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 70;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === current) {
                link.classList.add('active');
                link.style.color = 'var(--color-primary)';
            } else {
                link.style.color = '';
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();
    
    // ============================================
    // 7. TYPEWRITER EFFECT FOR HERO (opcional)
    // ============================================
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && !heroTitle.hasAttribute('data-typed')) {
        const originalText = heroTitle.innerHTML;
        const gradientText = heroTitle.querySelector('.gradient-text');
        
        if (gradientText) {
            heroTitle.setAttribute('data-typed', 'true');
            // Pequeño efecto de brillo en el título
            setInterval(() => {
                gradientText.style.opacity = '0.9';
                setTimeout(() => {
                    gradientText.style.opacity = '1';
                }, 300);
            }, 3000);
        }
    }
    
    // ============================================
    // 8. WHATSAPP BUTTON FUNCTIONALITY
    // ============================================
    const whatsappButton = document.querySelector('.whatsapp-float');
    if (whatsappButton) {
        whatsappButton.addEventListener('click', function(e) {
            e.preventDefault();
            const phoneNumber = '573001234567'; // Número de ejemplo
            const message = encodeURIComponent('Hola, me interesa saber más sobre los cursos de EduTrack');
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        });
    }
    
    // También agregar funcionalidad a los botones de WhatsApp en redes sociales
    const whatsappCards = document.querySelectorAll('.social-card .fa-whatsapp');
    whatsappCards.forEach(card => {
        card.closest('.social-card')?.addEventListener('click', function(e) {
            if (this.querySelector('.fa-whatsapp')) {
                e.preventDefault();
                const phoneNumber = '573001234567';
                const message = encodeURIComponent('Hola, vengo desde la página web de EduTrack');
                window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
            }
        });
    });
    
    // ============================================
    // 9. NEWSLETTER FORM (Footer)
    // ============================================
    const newsletterForm = document.querySelector('.footer-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(emailInput.value)) {
                    showNotification('¡Gracias por suscribirte! 📧 Recibirás nuestras novedades.', 'success');
                    emailInput.value = '';
                } else {
                    showNotification('Por favor ingresa un correo válido', 'error');
                }
            }
        });
    }
    
    // ============================================
    // 10. SCROLL REVEAL ANIMATION (mejorada)
    // ============================================
    const revealElements = document.querySelectorAll('.course-card, .testimonial-card, .value-item, .stat-card');
    
    function checkReveal() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 50) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Inicializar elementos ocultos
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', checkReveal);
    checkReveal();
    
    // ============================================
    // 11. PREVENT DOUBLE SUBMISSION
    // ============================================
    const allForms = document.querySelectorAll('form');
    allForms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                setTimeout(() => {
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    });
    
    // ============================================
    // 12. CONSOLE LOG DE INICIALIZACIÓN
    // ============================================
    console.log('✅ EduTrack - Landing Page inicializada correctamente');
    console.log('📱 Modo responsive activo');
    console.log('🎨 Animaciones y contadores funcionando');
});