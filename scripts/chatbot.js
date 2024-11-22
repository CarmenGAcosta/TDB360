document.addEventListener("DOMContentLoaded", function () {
    const chatMessages = document.getElementById("chat-messages");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");

    const faq = [
        { keywords: ["servicio", "servicios"], response: "Ofrecemos servicios de marketing 360, diseño gráfico, y consultoría." },
        { keywords: ["costos", "precios"], response: "Nuestros costos varían según el servicio. Contáctanos para más detalles." },
        { keywords: ["facebook", "redes"], response: "Gestionamos cuentas de Facebook, Instagram y otras plataformas." },
        { keywords: ["diseño"], response: "Brindamos servicios de diseño gráfico para marcas y proyectos." },
        { keywords: ["consultoría"], response: "Nuestra consultoría en marketing 360 optimiza tus resultados." },
        { keywords: ["youtube"], response: "Podemos ayudarte a crecer tu canal de YouTube y monetizar contenido." },
        { keywords: ["engagement", "alcance"], response: "Aumentamos el engagement y el alcance con estrategias personalizadas." },
        { keywords: ["resultados", "impacto"], response: "Te ayudamos a medir y mejorar tus resultados de marketing." },
        { keywords: ["seo", "posicionamiento"], response: "Optimizamos tu sitio para mejorar su posicionamiento en buscadores." },
        { keywords: ["publicidad", "ads"], response: "Creamos campañas efectivas en Google Ads y redes sociales." },
        { keywords: ["creatividad", "ideas"], response: "Generamos contenido creativo que conecta con tu audiencia." },
        { keywords: ["estrategia", "plan"], response: "Diseñamos estrategias personalizadas para tus objetivos." },
        { keywords: ["equipo", "profesionales"], response: "Contamos con un equipo experto en diversas áreas de marketing." },
        { keywords: ["tiempo", "duración"], response: "El tiempo de ejecución depende del proyecto, adaptándonos a tus necesidades." },
        { keywords: ["clientes", "experiencia"], response: "Hemos trabajado con clientes en múltiples industrias con éxito comprobado." },
        { keywords: ["contacto", "información"], response: "Puedes contactarnos a través del formulario en esta página." },
        { keywords: ["problemas", "dudas"], response: "Estamos aquí para resolver cualquier problema o duda que tengas." },
        { keywords: ["video", "multimedia"], response: "Ofrecemos servicios de edición y producción de contenido multimedia." },
        { keywords: ["higiene", "seguridad"], response: "Aplicamos altos estándares de calidad e higiene en todos nuestros servicios." },
        { keywords: ["ubicación"], response: "Nuestra sede está en una ubicación céntrica, pero trabajamos de manera remota." },
        { keywords: ["monetización"], response: "Te ayudamos a maximizar tus ingresos a través de redes y contenido." },
        { keywords: ["rapidez", "eficiencia"], response: "Nos especializamos en ofrecer resultados rápidos y de alta calidad." },
        { keywords: ["portafolio"], response: "Revisa nuestros casos de éxito en esta página para más información." },
        { keywords: ["crecimiento", "negocio"], response: "Nos enfocamos en estrategias para hacer crecer tu negocio de manera sostenible." },
        { keywords: ["personalizado"], response: "Adaptamos nuestros servicios para cumplir tus necesidades específicas." }
    ];

    function appendMessage(sender, message) {
        const p = document.createElement("p");
        p.textContent = message;
        p.className = sender === "user" ? "user-message" : "bot-message";
        chatMessages.appendChild(p);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll automático al final
    }

    function handleUserInput() {
        const userMessage = userInput.value.trim();
        if (userMessage === "") return;

        appendMessage("user", userMessage);
        userInput.value = "";

        // Buscar palabras clave
        let foundResponse = null;
        for (const entry of faq) {
            if (entry.keywords.some(keyword => userMessage.toLowerCase().includes(keyword))) {
                foundResponse = entry.response;
                break;
            }
        }

        // Respuesta predeterminada si no hay coincidencia
        const botResponse = foundResponse || "No entendí tu pregunta. ¿Podrías reformularla?";
        appendMessage("bot", botResponse);
    }

    sendButton.addEventListener("click", handleUserInput);
    userInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") handleUserInput();
    });

    // Mensaje de inicio
    appendMessage("bot", "Hola, ¿Cómo podemos ayudarte?");
});
