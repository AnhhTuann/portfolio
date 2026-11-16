export type PortfolioLanguage = 'vi' | 'en';

export const englishPortfolio = {
  languageLabel: 'Select language',
  navigation: {
    label: 'Main navigation',
    about: 'About',
    projects: 'Projects',
    gallery: 'Art',
    contact: 'Contact',
  },
  hero: {
    specialty: 'Designing & building digital experiences',
    greeting: "Hello, I'm",
    description:
      'An IT graduate from SGU, I combine systematic thinking with React, Node.js, and PostgreSQL, inspired by art and the living world.',
    projectsButton: 'View projects',
    contactButton: 'Get in touch',
    scroll: 'Scroll to explore',
    avatarAlt: "Open Anh Tuan's profile admin",
  },
  about: {
    title: 'Logic × Inspiration',
    subtitle: 'Freelance Frontend Engineer · 2021 — present',
    status: 'FREELANCE FRONTEND ENGINEER',
    content: {
      p1: 'I am a freelance <strong class="text-primary font-semibold">Frontend Engineer</strong>, active since 2021, with experience designing, developing, and launching a wide range of websites—from landing pages and corporate sites to e-commerce and custom-built web platforms.',
      p2: 'I use <strong class="text-primary font-semibold">ReactJS, Vite, WordPress, HTML, CSS, JavaScript, TypeScript, Node.js, and SASS/SCSS</strong> to build modern, responsive websites with strong performance and smooth user experiences.<br /><br />Beyond engineering, I bring <strong class="text-primary font-semibold">UI/UX thinking and creative sensibility</strong> to create distinctive interfaces tailored to each brand. I also apply <strong class="text-primary font-semibold">AI in my development workflow</strong> to troubleshoot, refine code, and work more efficiently.',
      quote: '"Where logic meets creativity."',
    },
    cards: [
      {
        category: '01 / BUILD',
        title: 'From idea to launch',
        description: 'End-to-end web development, from the first interface draft to production.',
      },
      {
        category: '02 / COMMERCE',
        title: 'E-commerce & landing pages',
        description: 'Focused shopping journeys and clear, effective landing pages.',
      },
      {
        category: '03 / VISUAL',
        title: 'Interfaces with identity',
        description: 'A visual-art foundation and SASS/SCSS help each brand stand apart.',
      },
      {
        category: '04 / WORKFLOW',
        title: 'A smarter workflow',
        description: 'Using AI to debug, refine code, and shorten development cycles.',
      },
    ],
  },
  skills: {
    title: 'My toolkit',
    subtitle: 'Design · Develop · Deliver',
  },
  projects: {
    title: 'Selected work',
    subtitle: 'A few milestones',
    loading: 'Loading projects...',
    empty: 'New projects will be featured here soon.',
    view: 'View project',
    source: 'Source code',
    selected: 'Selected project',
  },
  gallery: {
    title: 'Beyond the code',
    subtitle: 'Painting & aquascaping',
    loading: 'Loading the collection...',
    empty: 'New works will appear here soon.',
    artwork: 'ARTWORK',
  },
  contact: {
    label: "LET'S CREATE",
    title: 'Have an idea?',
    titleLine2: "Let's build it.",
    description:
      'From a digital product to a painting or an aquascape, I would love to hear about your next project.',
    availability: 'Open to interesting ideas',
    githubAria: "View Anh Tuan's GitHub profile",
    name: 'Your name',
    email: 'Email',
    message: 'Tell me about your project...',
    messageAria: 'Message',
    sending: 'SENDING...',
    sent: 'MESSAGE SENT',
    error: 'SOMETHING WENT WRONG. TRY AGAIN.',
    submit: 'SEND A MESSAGE',
  },
  footer: 'Designed & developed by',
};
