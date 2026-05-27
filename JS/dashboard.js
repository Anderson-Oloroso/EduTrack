// ============================================
// dashboard.js - EduTrack Dashboard
// Mobile menu toggle, interactions, filters
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // ============================================
    // MOBILE SIDEBAR TOGGLE
    // ============================================
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarClose = document.getElementById('sidebarClose');
    
    function openSidebar() {
        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeSidebar() {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (menuToggle) {
        menuToggle.addEventListener('click', openSidebar);
    }
    
    if (sidebarClose) {
        sidebarClose.addEventListener('click', closeSidebar);
    }
    
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }
    
    // Cerrar sidebar al hacer clic en enlace (móvil)
    const mobileNavLinks = document.querySelectorAll('.sidebar .nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                closeSidebar();
            }
        });
    });
    
    // ============================================
    // ACTIVE NAV LINK ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.sidebar .nav-link');
    
    function updateActiveNavLink() {
        let current = '';
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.parentElement.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.substring(1) === current) {
                link.parentElement.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // ============================================
    // FILTER BUTTONS (Tabla de cursos)
    // ============================================
    const filterBtns = document.querySelectorAll('.btn-filter');
    const tableRows = document.querySelectorAll('.courses-table tbody tr');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Actualizar active state
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.textContent.trim().toLowerCase();
            
            tableRows.forEach(row => {
                const statusCell = row.querySelector('.status-badge');
                if (!statusCell) return;
                
                const status = statusCell.textContent.trim().toLowerCase();
                
                if (filter === 'todos') {
                    row.style.display = '';
                } else if (filter === 'en progreso' && status === 'en progreso') {
                    row.style.display = '';
                } else if (filter === 'completados' && status === 'completado') {
                    row.style.display = '';
                } else if (filter === 'pausados' && status === 'pausado') {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });
    
    // ============================================
    // PAGINATION (Simulada)
    // ============================================
    const pageBtns = document.querySelectorAll('.page-btn');
    pageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('active')) {
                pageBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Simular cambio de página
                const tableInfo = document.querySelector('.table-info');
                if (tableInfo) {
                    tableInfo.innerHTML = 'Mostrando <strong>5</strong> de <strong>12</strong> cursos totales';
                }
            }
        });
    });
    
    // ============================================
    // NOTIFICATION BUTTON
    // ============================================
    const notificationsBtn = document.getElementById('notificationsBtn');
    if (notificationsBtn) {
        notificationsBtn.addEventListener('click', function() {
            alert('📢 Tienes 3 notificaciones:\n\n• Nuevo material disponible en Backend con Node.js\n• Tu certificado de Inglés Técnico está listo\n• Recordatorio: Pago programado en 3 días');
        });
    }
    
    // ============================================
    // LOGOUT BUTTON
    // ============================================
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
                window.location.href = 'index.html';
            }
        });
    }
    
    // ============================================
    // CONTINUE BUTTON
    // ============================================
    const continueBtn = document.querySelector('.btn-continue');
    if (continueBtn) {
        continueBtn.addEventListener('click', function() {
            alert('🎬 Reproduciendo: Módulo 5 - Autenticación JWT');
        });
    }
    
    // ============================================
    // USER MENU CLICK
    // ============================================
    const userMenu = document.querySelector('.user-menu');
    if (userMenu) {
        userMenu.addEventListener('click', function() {
            alert('👤 Perfil de usuario\n\nMaría Camila R.\nmaria@edutrack.co\n\nPróximo pago: $89.900 COP');
        });
    }
    
    // ============================================
    // SCROLL REVEAL ANIMATION
    // ============================================
    const revealElements = document.querySelectorAll('.kpi-card, .course-card');
    
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
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', checkReveal);
    checkReveal();
    
    // ============================================
    // CONSOLE LOG
    // ============================================
    console.log('✅ EduTrack Dashboard - Inicializado correctamente');
    console.log('📱 Modo responsive: ' + (window.innerWidth <= 768 ? 'Móvil' : 'Desktop'));
});

const listaEstudiantes = [
    {
    id: 1,
    nombre: 'Ana Martínez',
    email: 'ana.martinez@gmail.com',
    ciudad: 'Bogotá',
    curso: 'JavaScript Avanzado',
    progreso: 78,
    fechaInscripcion: '2024-02-10',
    plan: 'premium',
    montoUSD: 99,
    activo: true
    },
    {
    id: 2,
    nombre: 'Carlos Vega',
    email: 'carlos.vega@outlook.com',
    ciudad: 'Medellín',
    curso: 'React desde cero',
    progreso: 45,
    fechaInscripcion: '2024-05-22',
    plan: 'estándar',
    montoUSD: 59,
    activo: true
    },
    {
    id: 3,
    nombre: 'Luisa Herrera',
    email: 'luisa.h@gmail.com',
    ciudad: 'Cali',
    curso: 'Python para datos',
    progreso: 100,
    fechaInscripcion: '2023-11-03',
    plan: 'básico',
    montoUSD: 29,
    activo: false
    },
    {
    id: 4,
    nombre: 'Miguel Ángel Rueda',
    email: 'miguel.rueda@gmail.com',
    ciudad: 'Bogotá',
    curso: 'Node.js con Express',
    progreso: 62,
    fechaInscripcion: '2024-01-18',
    plan: 'estándar',
    montoUSD: 59,
    activo: true
    },
    {
    id: 5,
    nombre: 'Laura Fernanda Díaz',
    email: 'laura.diaz@outlook.com',
    ciudad: 'Medellín',
    curso: 'Git & GitHub',
    progreso: 100,
    fechaInscripcion: '2023-09-25',
    plan: 'premium',
    montoUSD: 99,
    activo: false
    },
    {
    id: 6,
    nombre: 'Sofia Ramirez',
    email: 'sofia.ramirez@gmail.com',
    ciudad: 'Bogotá',
    curso: 'Node.js con Express',
    progreso: 82,
    fechaInscripcion: '2024-03-15',
    plan: 'premium',
    montoUSD: 99,
    activo: true
    },
    {
    id: 7,
    nombre: 'Daniel Orozco',
    email: 'daniel.orozco@outlook.com',
    ciudad: 'Medellín',
    curso: 'TypeScript esencial',
    progreso: 34,
    fechaInscripcion: '2024-06-10',
    plan: 'estándar',
    montoUSD: 59,
    activo: true
    },
    {
    id: 8,
    nombre: 'Valentina Mejia',
    email: 'valentina.mejia@gmail.com',
    ciudad: 'Barranquilla',
    curso: 'CSS Moderno',
    progreso: 92,
    fechaInscripcion: '2024-01-20',
    plan: 'premium',
    montoUSD: 99,
    activo: true
    },
    {
    id: 9,
    nombre: 'Andres Herrera',
    email: 'andres.herrera@yahoo.com',
    ciudad: 'Cartagena',
    curso: 'SQL para devs',
    progreso: 100,
    fechaInscripcion: '2023-08-12',
    plan: 'estándar',
    montoUSD: 59,
    activo: false
    },
    {
    id: 10,
    nombre: 'Laura Jimenez',
    email: 'laura.jimenez@gmail.com',
    ciudad: 'Bogotá',
    curso: 'Git & GitHub',
    progreso: 67,
    fechaInscripcion: '2024-04-05',
    plan: 'básico',
    montoUSD: 29,
    activo: true
    },
    {
    id: 11,
    nombre: 'Javier Castro',
    email: 'javier.castro@outlook.com',
    ciudad: 'Medellín',
    curso: 'React desde cero',
    progreso: 45,
    fechaInscripcion: '2024-07-18',
    plan: 'estándar',
    montoUSD: 59,
    activo: true
    },
    {
    id: 12,
    nombre: 'Isabella Rojas',
    email: 'isabella.rojas@gmail.com',
    ciudad: 'Bogotá',
    curso: 'Python para datos',
    progreso: 100,
    fechaInscripcion: '2023-10-25',
    plan: 'premium',
    montoUSD: 99,
    activo: false
    },
    {
    id: 13,
    nombre: 'Mateo Salazar',
    email: 'mateo.salazar@yahoo.com',
    ciudad: 'Cali',
    curso: 'JavaScript Avanzado',
    progreso: 23,
    fechaInscripcion: '2024-09-01',
    plan: 'básico',
    montoUSD: 29,
    activo: true
    },
    {
    id: 14,
    nombre: 'Camila Suarez',
    email: 'camila.suarez@gmail.com',
    ciudad: 'Bogotá',
    curso: 'Docker básico',
    progreso: 56,
    fechaInscripcion: '2024-02-28',
    plan: 'estándar',
    montoUSD: 59,
    activo: true
    },
    {
    id: 15,
    nombre: 'Sebastian Peña',
    email: 'sebastian.pena@outlook.com',
    ciudad: 'Medellín',
    curso: 'Figma para devs',
    progreso: 88,
    fechaInscripcion: '2024-03-10',
    plan: 'premium',
    montoUSD: 99,
    activo: true
    },
    {
    id: 16,
    nombre: 'Natalia Duque',
    email: 'natalia.duque@gmail.com',
    ciudad: 'Barranquilla',
    curso: 'Node.js con Express',
    progreso: 41,
    fechaInscripcion: '2024-08-14',
    plan: 'básico',
    montoUSD: 29,
    activo: true
    },
    {
    id: 17,
    nombre: 'Felipe Lozano',
    email: 'felipe.lozano@yahoo.com',
    ciudad: 'Cartagena',
    curso: 'SQL para devs',
    progreso: 100,
    fechaInscripcion: '2023-12-01',
    plan: 'estándar',
    montoUSD: 59,
    activo: false
    },
    {
    id: 18,
    nombre: 'Daniela Paez',
    email: 'daniela.paez@gmail.com',
    ciudad: 'Bogotá',
    curso: 'TypeScript esencial',
    progreso: 72,
    fechaInscripcion: '2024-05-20',
    plan: 'premium',
    montoUSD: 99,
    activo: true
    },
    {
    id: 19,
    nombre: 'Juan David Moreno',
    email: 'juandavid.moreno@outlook.com',
    ciudad: 'Medellín',
    curso: 'CSS Moderno',
    progreso: 39,
    fechaInscripcion: '2024-10-02',
    plan: 'básico',
    montoUSD: 29,
    activo: true
    },
    {
    id: 20,
    nombre: 'Paula Beltran',
    email: 'paula.beltran@gmail.com',
    ciudad: 'Bogotá',
    curso: 'Python para datos',
    progreso: 100,
    fechaInscripcion: '2024-01-15',
    plan: 'premium',
    montoUSD: 99,
    activo: false
    },
    {
    id: 21,
    nombre: 'Ricardo Gil',
    email: 'ricardo.gil@yahoo.com',
    ciudad: 'Cali',
    curso: 'JavaScript Avanzado',
    progreso: 63,
    fechaInscripcion: '2024-04-22',
    plan: 'estándar',
    montoUSD: 59,
    activo: true
    },
    {
    id: 22,
    nombre: 'Andrea Parra',
    email: 'andrea.parra@gmail.com',
    ciudad: 'Bogotá',
    curso: 'React desde cero',
    progreso: 91,
    fechaInscripcion: '2024-02-05',
    plan: 'premium',
    montoUSD: 99,
    activo: true
    },
    {
    id: 23,
    nombre: 'Luis Fernando Reyes',
    email: 'luis.reyes@outlook.com',
    ciudad: 'Medellín',
    curso: 'Git & GitHub',
    progreso: 52,
    fechaInscripcion: '2024-07-30',
    plan: 'básico',
    montoUSD: 29,
    activo: true
    },
    {
    id: 24,
    nombre: 'Maria Jose Tovar',
    email: 'maria.tovar@gmail.com',
    ciudad: 'Barranquilla',
    curso: 'Node.js con Express',
    progreso: 100,
    fechaInscripcion: '2023-09-18',
    plan: 'estándar',
    montoUSD: 59,
    activo: false
    },
    {
    id: 25,
    nombre: 'Esteban Marin',
    email: 'esteban.marin@yahoo.com',
    ciudad: 'Bogotá',
    curso: 'Docker básico',
    progreso: 28,
    fechaInscripcion: '2024-11-10',
    plan: 'básico',
    montoUSD: 29,
    activo: true
    },
    {
    id: 26,
    nombre: 'Carolina Franco',
    email: 'carolina.franco@gmail.com',
    ciudad: 'Medellín',
    curso: 'Figma para devs',
    progreso: 79,
    fechaInscripcion: '2024-03-25',
    plan: 'premium',
    montoUSD: 99,
    activo: true
    },
    {
    id: 27,
    nombre: 'Hernando Quintero',
    email: 'hernando.quintero@outlook.com',
    ciudad: 'Cartagena',
    curso: 'TypeScript esencial',
    progreso: 100,
    fechaInscripcion: '2023-11-12',
    plan: 'básico',
    montoUSD: 29,
    activo: false
    },
    {
    id: 28,
    nombre: 'Tatiana Mesa',
    email: 'tatiana.mesa@gmail.com',
    ciudad: 'Bogotá',
    curso: 'React desde cero',
    progreso: 47,
    fechaInscripcion: '2024-06-05',
    plan: 'estándar',
    montoUSD: 59,
    activo: true
    },
    {
    id: 29,
    nombre: 'Camilo Uribe',
    email: 'camilo.uribe@yahoo.com',
    ciudad: 'Medellín',
    curso: 'SQL para devs',
    progreso: 84,
    fechaInscripcion: '2024-01-30',
    plan: 'premium',
    montoUSD: 99,
    activo: true
    },
    {
    id: 30,
    nombre: 'Diana Milena Rios',
    email: 'diana.rios@gmail.com',
    ciudad: 'Bogotá',
    curso: 'JavaScript Avanzado',
    progreso: 36,
    fechaInscripcion: '2024-09-15',
    plan: 'básico',
    montoUSD: 29,
    activo: true
    },
    {
    id: 31,
    nombre: 'Santiago Londoño',
    email: 'santiago.londono@outlook.com',
    ciudad: 'Cali',
    curso: 'Python para datos',
    progreso: 100,
    fechaInscripcion: '2024-02-20',
    plan: 'estándar',
    montoUSD: 59,
    activo: false
    },
    {
    id: 32,
    nombre: 'Juliana Acosta',
    email: 'juliana.acosta@gmail.com',
    ciudad: 'Barranquilla',
    curso: 'CSS Moderno',
    progreso: 95,
    fechaInscripcion: '2024-04-12',
    plan: 'premium',
    montoUSD: 99,
    activo: true
    },
    {
    id: 33,
    nombre: 'Edwin Vargas',
    email: 'edwin.vargas@yahoo.com',
    ciudad: 'Bogotá',
    curso: 'Git & GitHub',
    progreso: 61,
    fechaInscripcion: '2024-08-08',
    plan: 'básico',
    montoUSD: 29,
    activo: true
    },
    {
    id: 34,
    nombre: 'Monica Arias',
    email: 'monica.arias@gmail.com',
    ciudad: 'Medellín',
    curso: 'Node.js con Express',
    progreso: 73,
    fechaInscripcion: '2024-05-28',
    plan: 'estándar',
    montoUSD: 59,
    activo: true
    },
    {
    id: 35,
    nombre: 'Gustavo Patiño',
    email: 'gustavo.patino@outlook.com',
    ciudad: 'Bogotá',
    curso: 'TypeScript esencial',
    progreso: 100,
    fechaInscripcion: '2023-12-15',
    plan: 'premium',
    montoUSD: 99,
    activo: false
    },
    {
    id: 36,
    nombre: 'Lina Zuluaga',
    email: 'lina.zuluaga@gmail.com',
    ciudad: 'Cartagena',
    curso: 'Figma para devs',
    progreso: 42,
    fechaInscripcion: '2024-10-20',
    plan: 'básico',
    montoUSD: 29,
    activo: true
    },
    {
    id: 37,
    nombre: 'Oscar Mejia',
    email: 'oscar.mejia@yahoo.com',
    ciudad: 'Medellín',
    curso: 'React desde cero',
    progreso: 89,
    fechaInscripcion: '2024-03-03',
    plan: 'premium',
    montoUSD: 99,
    activo: true
    },
    {
    id: 38,
    nombre: 'Natalia Gomez',
    email: 'natalia.gomez@gmail.com',
    ciudad: 'Bogotá',
    curso: 'Docker básico',
    progreso: 100,
    fechaInscripcion: '2024-01-08',
    plan: 'estándar',
    montoUSD: 59,
    activo: false
    },
    {
    id: 39,
    nombre: 'Christian Pineda',
    email: 'christian.pineda@outlook.com',
    ciudad: 'Barranquilla',
    curso: 'JavaScript Avanzado',
    progreso: 54,
    fechaInscripcion: '2024-07-07',
    plan: 'básico',
    montoUSD: 29,
    activo: true
    },
    {
    id: 40,
    nombre: 'Viviana Ortega',
    email: 'viviana.ortega@gmail.com',
    ciudad: 'Bogotá',
    curso: 'SQL para devs',
    progreso: 77,
    fechaInscripcion: '2024-06-17',
    plan: 'premium',
    montoUSD: 99,
    activo: true
    }
    ];