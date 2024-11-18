// Variable para evitar múltiples ejecuciones
let scrollTimeout;

// Función para manejar el scroll
window.onscroll = function() {
    // Limitar la frecuencia de ejecución
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function() {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            if (!navbar.classList.contains('shrink-navbar')) {
                navbar.classList.add('shrink-navbar'); // Aplica el navbar reducido
                title.classList.add('hidden-title'); // Oculta el título
            }
        } else {
            if (navbar.classList.contains('shrink-navbar')) {
                navbar.classList.remove('shrink-navbar'); // Restaura el navbar original
                title.classList.remove('hidden-title'); // Muestra el título
            }
        }
    }, 100); // Retraso de 100ms antes de aplicar la clase
};


// Carousel functionality
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentIndex = 0;

    const showSlide = (index) => {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    };

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    });

    // Inicializa el primer slide como activo
    showSlide(currentIndex);
});

// Modal logic
const modal = document.getElementById("modal");
const modalDetails = document.getElementById("modal-details");
const closeModalButton = modal.querySelector(".modal-close");

// Información sobre los servicios
const serviceDetails = {
    "consultoria-estrategica": {
        title: "Consultoría Estratégica",
        description: "Ofrecemos estrategias personalizadas para hacer crecer tu negocio."
    },
    "desarrollo-web": {
        title: "Desarrollo Web",
        description: "Creamos páginas web modernas, responsivas y optimizadas para SEO."
    },
    "marketing-digital": {
        title: "Marketing Digital",
        description: "Estrategias digitales que conectan con tu audiencia y aumentan tus ventas."
    }
};

// Mostrar modal con contenido dinámico
document.querySelectorAll(".servicio-item").forEach(item => {
    item.addEventListener("click", () => {
        const serviceKey = item.dataset.service;
        if (serviceDetails[serviceKey]) {
            const { title, description } = serviceDetails[serviceKey];
            modalDetails.innerHTML = `
                <h3>${title}</h3>
                <p>${description}</p>
            `;
            modal.classList.add("active");
        }
    });
});

// Cerrar modal
closeModalButton.addEventListener("click", () => {
    modal.classList.remove("active");
});

// Cerrar modal al hacer clic fuera del contenido
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("active");
    }
});
