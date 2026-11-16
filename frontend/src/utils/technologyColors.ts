const TECHNOLOGY_CLASSES: Record<string, string> = {
  javascript: 'tech-brand-javascript',
  js: 'tech-brand-javascript',
  html: 'tech-brand-html',
  html5: 'tech-brand-html',
  css: 'tech-brand-css',
  css3: 'tech-brand-css',
  react: 'tech-brand-react',
  'react.js': 'tech-brand-react',
  typescript: 'tech-brand-typescript',
  ts: 'tech-brand-typescript',
  'node.js': 'tech-brand-node',
  node: 'tech-brand-node',
  'next.js': 'tech-brand-next',
  nextjs: 'tech-brand-next',
  tailwind: 'tech-brand-tailwind',
  'tailwind css': 'tech-brand-tailwind',
  postgresql: 'tech-brand-postgresql',
  postgres: 'tech-brand-postgresql',
  'framer motion': 'tech-brand-motion',
  motion: 'tech-brand-motion',
  'rest api': 'tech-brand-api',
  'restful apis': 'tech-brand-api',
  'jwt auth': 'tech-brand-jwt',
  jwt: 'tech-brand-jwt',
  figma: 'tech-brand-figma',
};

export function getTechnologyClass(technology: string): string {
  return TECHNOLOGY_CLASSES[technology.trim().toLowerCase()] ?? 'tech-brand-default';
}
