export const languages = {
  en: "English",
  es: "Español",
} as const;

export const defaultLang = "en" as const;

export type Lang = keyof typeof languages;

/**
 * UI string dictionary. Keys are flat dot-notation; values may contain
 * `{placeholder}` tokens interpolated by `useTranslations()`.
 *
 * English is the fallback: any key missing from `es` resolves to `en`.
 */
export const ui = {
  en: {
    // Layout / meta
    "meta.description":
      "Sebastián Idrobo Avirama - Software Engineer portfolio showcasing projects, experience, and blog posts.",

    // Navbar
    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.blog": "Blog",
    "nav.experience": "Experience",
    "nav.contact": "Contact",
    "nav.ariaLabel": "Main navigation",

    // Language switcher
    "langSwitcher.ariaLabel": "Language",
    "langSwitcher.footerLabel": "Change language:",

    // Home page
    "home.greeting": "Hi! I'm Sebastián Idrobo",
    "home.intro":
      "I'm a passionate Software Engineer who enjoys solving problems and taking on challenges that push me to learn more, allowing me to build applications with a real impact. I naturally look for ways to refine the workflows and code I work with, as I'm always aiming to deliver the most efficient and high-quality results possible. I'm currently interested in:",
    "home.interest.devops": "DevOps engineer",
    "home.interest.fullstack": "Full stack development",
    "home.interest.datascience": "Data Science",
    "home.aboutTitle": "About me",
    "home.about.p1":
      "I started my career at Universidad del Valle in 2021, where I built a strong foundation in Software Engineering across multiple fields such as Software Development, Data Science, and Computer Engineering. I have worked in research settings alongside researchers to build applications and maintain data pipelines, as well as in fast-paced environments like startups, providing technical support and collaborating across multiple teams for clients' implementations.",
    "home.about.p2":
      "During this time, I held several part-time roles that helped me gain hard skills like programming languages, frameworks, and technical troubleshooting. These experiences also allowed me to build important soft skills such as communication, time management, adaptability, and curiosity.",
    "home.about.p3":
      "Throughout my career, I've had the opportunity to learn and adapt in diverse environments. I have worked in research settings alongside researchers to build applications and maintain data pipelines, as well as in fast-paced environments like startups, providing technical support and collaborating across multiple teams for clients' implementations.",
    "home.carousel.photosAria": "Photos of Sebastián",
    "home.carousel.careerAria": "Sebastián's career",
    "home.slide.portraitAlt": "Sebastián Idrobo portrait",
    "home.slide.meAlt": "Sebastián Idrobo",
    "home.slide.ciatAlt": "CIAT workplace",
    "home.slide.githubAlt": "GitHub workplace",
    "home.slide.truoraAlt": "Truora workplace",

    // Projects page
    "projects.title": "My work",
    "project.visit": "Visit {title}",

    // Experience page
    "experience.title": "Experience",

    // Contact page
    "contact.title": "More about me?",
    "contact.intro":
      "You can find more about me on the following sites! I will be happy to connect with you:",
    "contact.githubAria": "GitHub profile",
    "contact.linkedinAria": "LinkedIn profile",
    "contact.formIntro": "Or feel free to reach out to me. No compromise",
    "contact.nameLabel": "Name:",
    "contact.emailLabel": "Email:",
    "contact.messageLabel": "Message:",
    "contact.sendButton": "Send",

    // Blog page
    "blog.wip": "Work in Progress!",

    // 404 page
    "notFound.title": "Not Found",
    "notFound.message":
      "Ops! You have reached a page that doesn't exist. Please check the URL or return to the homepage.",
    "notFound.bongoAria": "ASCII art of bongo cat waving one of its paws",
    "notFound.kaomojiAria": "Happy kaomoji waving",

    // Carousel a11y (template tokens: {current}, {total}, {alt}, {n})
    "carousel.announce": "Photo {current} of {total}: {alt}",
    "carousel.goToSlide": "Go to slide {n}",
  },
  es: {
    // Layout / meta
    "meta.description":
      "Sebastián Idrobo Avirama - Portafolio de Ingeniero de Software con proyectos, experiencia y publicaciones de blog.",

    // Navbar
    "nav.home": "Inicio",
    "nav.projects": "Proyectos",
    "nav.blog": "Blog",
    "nav.experience": "Experiencia",
    "nav.contact": "Contacto",
    "nav.ariaLabel": "Navegación principal",

    // Language switcher
    "langSwitcher.ariaLabel": "Idioma",
    "langSwitcher.footerLabel": "Cambiar idioma:",

    // Home page
    "home.greeting": "¡Hola! Soy Sebastián Idrobo",
    "home.intro":
      "Soy un Ingeniero de Software apasionado que disfruta resolver problemas y asumir retos que me impulsan a aprender más, lo que me permite construir aplicaciones con un impacto real. Busco de forma natural maneras de refinar los flujos de trabajo y el código con los que trabajo, ya que siempre aspiro a entregar los resultados más eficientes y de la mayor calidad posible. Actualmente me interesa:",
    "home.interest.devops": "Ingeniería DevOps",
    "home.interest.fullstack": "Desarrollo full stack",
    "home.interest.datascience": "Ciencia de datos",
    "home.aboutTitle": "Sobre mí",
    "home.about.p1":
      "Comencé mi carrera en la Universidad del Valle en 2021, donde construí una base sólida en Ingeniería de Software a través de múltiples campos como Desarrollo de Software, Ciencia de Datos e Ingeniería de Computadores. He trabajado en entornos de investigación junto a investigadores para construir aplicaciones y mantener pipelines de datos, así como en entornos dinámicos como startups, brindando soporte técnico y colaborando con múltiples equipos en las implementaciones de los clientes.",
    "home.about.p2":
      "Durante este tiempo, desempeñé varios roles de medio tiempo que me ayudaron a ganar habilidades técnicas como lenguajes de programación, frameworks y resolución de problemas técnicos. Estas experiencias también me permitieron desarrollar habilidades blandas importantes como la comunicación, la gestión del tiempo, la adaptabilidad y la curiosidad.",
    "home.about.p3":
      "A lo largo de mi carrera, he tenido la oportunidad de aprender y adaptarme en entornos diversos. He trabajado en entornos de investigación junto a investigadores para construir aplicaciones y mantener pipelines de datos, así como en entornos dinámicos como startups, brindando soporte técnico y colaborando con múltiples equipos en las implementaciones de los clientes.",
    "home.carousel.photosAria": "Fotos de Sebastián",
    "home.carousel.careerAria": "La carrera de Sebastián",
    "home.slide.portraitAlt": "Retrato de Sebastián Idrobo",
    "home.slide.meAlt": "Sebastián Idrobo",
    "home.slide.ciatAlt": "Lugar de trabajo en CIAT",
    "home.slide.githubAlt": "Lugar de trabajo en GitHub",
    "home.slide.truoraAlt": "Lugar de trabajo en Truora",

    // Projects page
    "projects.title": "Mi trabajo",
    "project.visit": "Visitar {title}",

    // Experience page
    "experience.title": "Experiencia",

    // Contact page
    "contact.title": "¿Más sobre mí?",
    "contact.intro":
      "¡Puedes encontrar más sobre mí en los siguientes sitios! Estaré encantado de conectar contigo:",
    "contact.githubAria": "Perfil de GitHub",
    "contact.linkedinAria": "Perfil de LinkedIn",
    "contact.formIntro":
      "O si lo prefieres, no dudes en escribirme. Sin compromiso.",
    "contact.nameLabel": "Nombre:",
    "contact.emailLabel": "Correo electrónico:",
    "contact.messageLabel": "Mensaje:",
    "contact.sendButton": "Enviar",

    // Blog page
    "blog.wip": "Esta sección se encuentra en construcción",

    // 404 page
    "notFound.title": "No encontrado",
    "notFound.message":
      "¡Ups! Has llegado a una página que no existe. Por favor, verifica la URL o regresa a la página de inicio.",
    "notFound.bongoAria":
      "Arte ASCII de un gato bongo saludando con una de sus patas",
    "notFound.kaomojiAria": "Kaomoji feliz saludando",

    // Carousel a11y (template tokens: {current}, {total}, {alt}, {n})
    "carousel.announce": "Foto {current} de {total}: {alt}",
    "carousel.goToSlide": "Ir a la diapositiva {n}",
  },
} as const;

export type UiKey = keyof (typeof ui)[typeof defaultLang];
