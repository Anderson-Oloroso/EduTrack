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