export const SITE = {
  name: 'Tatenda Nyemudzo',
  role: 'Designer & engineer',
  statement: 'I design systems for the moment things go wrong, and then I build them.',
  description:
    'Tatenda Nyemudzo designs and builds payment, public-service and agricultural systems that keep working when networks drop, power cuts out and trust runs thin.',
  location: 'Leeuwarden, the Netherlands',
  email: 'tatendawalter62@gmail.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/muudzo' },
    { label: 'GitHub (work)', href: 'https://github.com/tatenda-source' },
  ],
} as const;

export const NAV = [
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/about/' },
  { label: 'This site', href: '/this-site/' },
] as const;
