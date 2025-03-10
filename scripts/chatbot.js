document.addEventListener("DOMContentLoaded", function () {
    const chatbot = document.getElementById("chatbot");
    const chatWindow = chatbot.querySelector(".chat-window");
    const chatClose = document.getElementById("chat-close");
    const chatMessages = document.getElementById("chat-messages");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");
  
    // Toggle: Abrir chat al hacer clic en el contenedor cerrado
    chatbot.addEventListener("click", function (e) {
      if (chatbot.classList.contains("closed")) {
        chatbot.classList.remove("closed");
        chatbot.classList.add("open");
        // Impedir que el clic se propague para no cerrar inmediatamente
        e.stopPropagation();
      }
    });
  
    // Cerrar chat al hacer clic en el botón "x"
    chatClose.addEventListener("click", function (e) {
      e.stopPropagation();
      chatbot.classList.remove("open");
      chatbot.classList.add("closed");
    });
  
    // Prevenir que clics dentro de la ventana de chat cierren el chat
    chatWindow.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  
    // Funcionalidad del chatbot basada en palabras clave
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
      { keywords: ["personalizado"], response: "Adaptamos nuestros servicios para cumplir tus necesidades específicas." },
      { keywords: ["qué es te lo digo bonito", "te lo digo bonito", "quiénes son"], response: "Te lo Digo Bonito es una agencia de marketing digital enfocada en la comunicación efectiva y la creación de soluciones personalizadas para cada cliente." },
      { keywords: ["misión", "visión", "objetivo"], response: "Nuestra misión es fomentar conexiones auténticas a través del marketing. Nuestra visión es ser líderes en soluciones creativas y efectivas, y nuestro objetivo es ayudarte a crecer de manera orgánica y sostenible." },
      { keywords: ["valores", "personalidad", "principios"], response: "En Te lo Digo Bonito priorizamos la empatía, igualdad, respeto y comunicación efectiva. Nuestro enfoque se centra en relaciones laborales orgánicas y respetuosas." },
      { keywords: ["empatía"], response: "Creemos que la empatía es clave para entender las necesidades de nuestros clientes y su audiencia." },
      { keywords: ["igualdad"], response: "Fomentamos un entorno laboral inclusivo, asegurándonos de que cada voz sea escuchada y valorada." },
      { keywords: ["respeto"], response: "Valoramos a cada cliente y colaborador, promoviendo un ambiente de respeto mutuo." },
      { keywords: ["flujo orgánico", "relaciones laborales"], response: "Nos enfocamos en construir relaciones laborales fluidas, basadas en la confianza y la colaboración." },
      { keywords: ["comunicación efectiva"], response: "Creemos que una comunicación clara y directa es fundamental para el éxito de cualquier proyecto." },
      { keywords: ["experiencia del cliente", "cliente primero"], response: "Siempre ponemos a nuestros clientes en el centro, asegurándonos de que sus necesidades sean atendidas con excelencia." },
      { keywords: ["tecnología", "innovación"], response: "Estamos al día con las últimas tecnologías e innovaciones para ofrecerte lo mejor en marketing digital." },
      { keywords: ["colaboración", "trabajo en equipo"], response: "Fomentamos la colaboración y el trabajo en equipo, tanto dentro como fuera de nuestra agencia." }
    ];
  
    // Función para agregar mensajes al chat y hacer scroll automáticamente
    function appendMessage(sender, message) {
      const p = document.createElement("p");
      p.textContent = message;
      p.className = sender === "user" ? "user-message" : "bot-message";
      chatMessages.appendChild(p);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  
    // Manejo del envío de mensaje del usuario
    function handleUserInput() {
      const userMessage = userInput.value.trim();
      if (userMessage === "") return;
      appendMessage("user", userMessage);
      userInput.value = "";
  
      let foundResponse = null;
      for (const entry of faq) {
        if (entry.keywords.some(keyword => userMessage.toLowerCase().includes(keyword))) {
          foundResponse = entry.response;
          break;
        }
      }
      const botResponse = foundResponse || "No entendí tu pregunta. ¿Podrías reformularla?";
      appendMessage("bot", botResponse);
    }
  
    sendButton.addEventListener("click", handleUserInput);
    userInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") handleUserInput();
    });
  
    // Mensaje de bienvenida
    appendMessage("bot", "Hola, ¿Cómo podemos ayudarte?");
  });
  