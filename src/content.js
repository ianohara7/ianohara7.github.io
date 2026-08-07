// =============================================================
//  All page content, in English and Spanish.
//  Edit the text in `translations.en` (English) and `translations.es`
//  (Spanish) to change what the page shows. Everything on the page
//  pulls its content from here through the language context.
//  `contact` is language-independent (phone/email/links are the same).
// =============================================================

export const contact = {
  email: 'ian.ohara@outlook.com',
  phone: '+51 944 859 456',
  github: 'https://github.com/ianohara7',
  website: 'https://ianohara7.github.io',
}

export const translations = {
  en: {
    profile: {
      name: "Ian O'Hara",
      fullName: "Ian Sebastian Alonso Yaranga O'Hara",
      tagline:
        'Videogame developer building XR worlds, game systems, and the next generation of developers.',
      location: 'Lima, Perú · UTC-5',
      roles: [
        'Videogame Developer',
        'Unity Developer',
        'XR / AR-VR Developer',
        '3D Generalist',
        'Game Dev Educator',
      ],
      summary: `I am a videogame developer and 3D generalist from Lima, Perú, focused on
        AR/VR and Unity. I have gone from modeling and texturing assets to shipping
        ARCore and WebXR builds, and I currently teach videogame development at
        ISIL and software development at Tecsup — mixing gameplay programming,
        tools, multiplayer, and a bit of 3D art along the way.`,
    },
    stats: [
      { value: '06+', label: 'Years in industry' },
      { value: '04', label: 'Years in AR/VR' },
      { value: '02', label: 'Teaching roles' },
      { value: '05', label: '3D & DCC tools' },
    ],
    skillGroups: [
      {
        title: 'Engines & Game Tech',
        skills: [
          { name: 'Unity', level: 95 },
          { name: 'Unreal Engine 5', level: 70 },
          { name: 'DOTS / ECS', level: 80 },
          { name: 'Phaser', level: 75 },
        ],
      },
      {
        title: 'Languages',
        skills: [
          { name: 'C#', level: 95 },
          { name: 'Haxe', level: 80 },
          { name: 'TypeScript', level: 75 },
          { name: 'C++', level: 65 },
        ],
      },
      {
        title: 'XR & Multiplayer',
        skills: [
          { name: 'ARCore', level: 85 },
          { name: 'WebXR', level: 80 },
          { name: 'Meta Quest SDK', level: 70 },
          { name: 'Unity Netcode', level: 75 },
        ],
      },
      {
        title: '3D & DCC Tools',
        skills: [
          { name: 'Blender', level: 90 },
          { name: 'Substance Painter', level: 85 },
          { name: 'Maya', level: 70 },
          { name: 'Zbrush', level: 65 },
        ],
      },
      {
        title: 'Web & Full-Stack',
        skills: [
          { name: 'Laravel / PHP', level: 85 },
          { name: 'Vue.js', level: 75 },
          { name: 'Tailwind CSS', level: 80 },
          { name: 'SQL', level: 70 },
        ],
      },
      {
        title: 'Tooling & Pipeline',
        skills: [
          { name: 'Git', level: 90 },
          { name: 'Docker', level: 65 },
          { name: 'Figma', level: 70 },
          { name: 'DaVinci Resolve', level: 60 },
        ],
      },
    ],
    experience: [
      {
        role: 'Software Development Teacher',
        company: 'Tecsup',
        period: '2026 — Present',
        points: [
          'Teaching software development courses, including an introductory Laravel / PHP course.',
          'Leading a database course on Oracle.',
        ],
      },
      {
        role: 'Videogame Development Teacher',
        company: 'ISIL',
        period: '2024 — Present',
        points: [
          'Teaching videogame development & design with Unity, Haxe and Phaser.',
          'Leading mixed reality workshops with the Meta Quest SDK.',
          'Courses: multiplatform game dev, 2D component design, game tools, AI for games, multiplayer with Unity Netcode, and 3D scenarios.',
        ],
      },
      {
        role: '3D Generalist & VR/AR Lead Developer',
        company: 'PastPresentFuture (USA)',
        period: '2021 — 2025',
        points: [
          'Unity (C#) developer for AR/VR experiences; AR with ARCore plus WebXR / ARWT builds for the web.',
          'Owned 3D asset creation — modeling, texturing, shading, animating — and implementation in Unity.',
          'Also delivered the IknowPolitics site as a Drupal web developer for the same studio.',
        ],
      },
      {
        role: 'Unity Developer & 3D Generalist',
        company: 'Factor',
        period: '2019',
        points: [
          '3D artist for AR/VR apps on iOS and Android in Unity.',
          'Blender as the main 3D tool and Substance Painter for texturing, plus VR development in Unity.',
        ],
      },
      {
        role: 'Web Developer (Laravel / Vue)',
        company: 'Freelance',
        period: '2019 — 2020',
        points: [
          'Built a web backend to create and export newspaper puzzle games (sudoku & crosswords).',
          'Delivered a WordPress site and a Laravel REST API with a Vue front end for Pavco.',
        ],
      },
    ],
    links: [
      { label: 'About', href: '#about' },
      { label: 'Skills', href: '#skills' },
      { label: 'Experience', href: '#experience' },
      { label: 'Museum', href: '#museum' },
      { label: 'Contact', href: '#contact' },
    ],
    ui: {
      titleSuffix: 'Game Programmer',
      langAria: 'Switch language',
      hero: {
        available: 'Available for work',
        viewWork: 'View My Work',
        getInTouch: 'Get In Touch',
      },
      about: {
        kicker: '01 · Who I am',
        title: 'About Me',
        portrait: 'Your portrait',
        portraitHint: 'drop an image in src/assets',
      },
      skills: {
        kicker: '02 · Arsenal',
        title: 'Skills',
      },
      experience: {
        kicker: '03 · Record',
        title: 'Experience',
      },
      museum: {
        kicker: '04 · Vault',
        title: '3D Museum',
        hint: 'drag to orbit · scroll to zoom',
      },
      contact: {
        kicker: '05 · Transmissions',
        title: 'Contact',
        heading: 'Open a channel',
        blurb:
          'Have a project, a role, or a prototype you want to talk about? My inbox is open.',
        github: 'GitHub',
        website: 'Website',
        copyPhone: 'Copy phone',
        whoamiOut: 'Videogame developer. XR, Unity & a bit of 3D.',
        emailLabel: 'email',
        phoneLabel: 'phone',
        githubLabel: 'github',
        statusLabel: 'status',
        accepting: 'accepting quests',
      },
      footer: {
        built: 'Built with React & Framer Motion',
        backToTop: 'Back to top',
      },
    },
  },

  es: {
    profile: {
      name: "Ian O'Hara",
      fullName: "Ian Sebastian Alonso Yaranga O'Hara",
      tagline:
        'Desarrollador de videojuegos construyendo mundos XR, sistemas de juego y a la próxima generación de desarrolladores.',
      location: 'Lima, Perú · UTC-5',
      roles: [
        'Desarrollador de Videojuegos',
        'Desarrollador Unity',
        'Desarrollador XR / AR-VR',
        'Artista 3D Generalista',
        'Educador de Videojuegos',
      ],
      summary: `Soy un desarrollador de videojuegos y artista 3D generalista de Lima, Perú,
        enfocado en AR/VR y Unity. He recorrido el camino desde el modelado y
        texturizado de assets hasta el lanzamiento de builds de ARCore y WebXR, y
        actualmente enseño desarrollo de videojuegos en ISIL y desarrollo de
        software en Tecsup — combinando programación de gameplay, herramientas,
        multijugador y un poco de arte 3D en el camino.`,
    },
    stats: [
      { value: '06+', label: 'Años en la industria' },
      { value: '04', label: 'Años en AR/VR' },
      { value: '02', label: 'Roles de docencia' },
      { value: '05', label: 'Herramientas 3D & DCC' },
    ],
    skillGroups: [
      {
        title: 'Motores y Tecnología de Juegos',
        skills: [
          { name: 'Unity', level: 95 },
          { name: 'Unreal Engine 5', level: 70 },
          { name: 'DOTS / ECS', level: 80 },
          { name: 'Phaser', level: 75 },
        ],
      },
      {
        title: 'Lenguajes',
        skills: [
          { name: 'C#', level: 95 },
          { name: 'Haxe', level: 80 },
          { name: 'TypeScript', level: 75 },
          { name: 'C++', level: 65 },
        ],
      },
      {
        title: 'XR y Multijugador',
        skills: [
          { name: 'ARCore', level: 85 },
          { name: 'WebXR', level: 80 },
          { name: 'Meta Quest SDK', level: 70 },
          { name: 'Unity Netcode', level: 75 },
        ],
      },
      {
        title: 'Herramientas 3D & DCC',
        skills: [
          { name: 'Blender', level: 90 },
          { name: 'Substance Painter', level: 85 },
          { name: 'Maya', level: 70 },
          { name: 'Zbrush', level: 65 },
        ],
      },
      {
        title: 'Web y Full-Stack',
        skills: [
          { name: 'Laravel / PHP', level: 85 },
          { name: 'Vue.js', level: 75 },
          { name: 'Tailwind CSS', level: 80 },
          { name: 'SQL', level: 70 },
        ],
      },
      {
        title: 'Herramientas y Pipeline',
        skills: [
          { name: 'Git', level: 90 },
          { name: 'Docker', level: 65 },
          { name: 'Figma', level: 70 },
          { name: 'DaVinci Resolve', level: 60 },
        ],
      },
    ],
    experience: [
      {
        role: 'Software Development Teacher',
        company: 'Tecsup',
        period: '2026 — Presente',
        points: [
          'Enseñando cursos de desarrollo de software, incluyendo un curso introductorio de Laravel / PHP.',
          'A cargo de un curso de bases de datos en Oracle.',
        ],
      },
      {
        role: 'Videogame Development Teacher',
        company: 'ISIL',
        period: '2024 — Presente',
        points: [
          'Enseñando desarrollo y diseño de videojuegos con Unity, Haxe y Phaser.',
          'Talleres de realidad mixta con el SDK de Meta Quest.',
          'Cursos: desarrollo de videojuegos multiplataforma, diseño de componentes 2D, herramientas de juego, IA para juegos, multijugador con Unity Netcode y escenarios 3D.',
        ],
      },
      {
        role: '3D Generalist & VR/AR Lead Developer',
        company: 'PastPresentFuture (USA)',
        period: '2021 — 2025',
        points: [
          'Desarrollador Unity (C#) para experiencias AR/VR; AR con ARCore y builds WebXR / ARWT para la web.',
          'A cargo de la creación de assets 3D — modelado, texturizado, shading y animación — e implementación en Unity.',
          'También desarrollé el sitio IknowPolitics como desarrollador web en Drupal para el mismo estudio.',
        ],
      },
      {
        role: 'Unity Developer & 3D Generalist',
        company: 'Factor',
        period: '2019',
        points: [
          'Artista 3D para apps de AR/VR en iOS y Android en Unity.',
          'Blender como herramienta 3D principal y Substance Painter para texturizado, además de desarrollo VR en Unity.',
        ],
      },
      {
        role: 'Web Developer (Laravel / Vue)',
        company: 'Freelance',
        period: '2019 — 2020',
        points: [
          'Desarrollé un backend web para crear y exportar juegos de rompecabezas para periódicos (sudoku y crucigramas).',
          'Entregué un sitio en WordPress y una API REST en Laravel con frontend en Vue para Pavco.',
        ],
      },
    ],
    links: [
      { label: 'Sobre mí', href: '#about' },
      { label: 'Habilidades', href: '#skills' },
      { label: 'Experiencia', href: '#experience' },
      { label: 'Museo', href: '#museum' },
      { label: 'Contacto', href: '#contact' },
    ],
    ui: {
      titleSuffix: 'Programador de Videojuegos',
      langAria: 'Cambiar idioma',
      hero: {
        available: 'Disponible para trabajar',
        viewWork: 'Ver mi trabajo',
        getInTouch: 'Contáctame',
      },
      about: {
        kicker: '01 · Quién soy',
        title: 'Sobre mí',
        portrait: 'Tu retrato',
        portraitHint: 'coloca una imagen en src/assets',
      },
      skills: {
        kicker: '02 · Arsenal',
        title: 'Habilidades',
      },
      experience: {
        kicker: '03 · Trayectoria',
        title: 'Experiencia',
      },
      museum: {
        kicker: '04 · Bóveda',
        title: 'Museo 3D',
        hint: 'arrastra para orbitar · rueda para hacer zoom',
      },
      contact: {
        kicker: '05 · Transmisiones',
        title: 'Contacto',
        heading: 'Abre un canal',
        blurb:
          '¿Tienes un proyecto, un rol o un prototipo del que quieras hablar? Mi bandeja de entrada está abierta.',
        github: 'GitHub',
        website: 'Sitio web',
        copyPhone: 'Copiar teléfono',
        whoamiOut: 'Desarrollador de videojuegos. XR, Unity y algo de 3D.',
        emailLabel: 'email',
        phoneLabel: 'teléfono',
        githubLabel: 'github',
        statusLabel: 'estado',
        accepting: 'aceptando misiones',
      },
      footer: {
        built: 'Hecho con React y Framer Motion',
        backToTop: 'Volver arriba',
      },
    },
  },
}
