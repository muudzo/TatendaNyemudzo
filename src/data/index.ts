/**
 * Everything that isn't a case study: experiments worth a look, and an archive that shows the
 * path. Descriptions are taken from each repository's own README.
 */
export interface IndexItem {
  readonly title: string;
  readonly year: number;
  readonly note: string;
  readonly kind: string;
  readonly repo?: string;
  readonly live?: string;
}

const GH = 'https://github.com';

export const EXPERIMENTS: readonly IndexItem[] = [
  {
    title: 'ZimLingua',
    year: 2026,
    kind: 'Machine translation',
    note: 'Offline Shona/Ndebele/English translation on a CPU: NLLB-200 fine-tuned with LoRA, quantised to int8.',
    repo: `${GH}/muudzo/zimlingua`,
  },
  {
    title: 'AgentEval',
    year: 2026,
    kind: 'AI tooling',
    note: 'Evaluates AI agents on cost and accuracy together. A 95% agent at $2 a run often loses to a 90% one at $0.05.',
    repo: `${GH}/tatenda-source/agenteval`,
  },
  {
    title: 'AdReel',
    year: 2026,
    kind: 'Media pipeline',
    note: 'From product to vertical video ad on your own machine: local LLM script, voice, captions, ffmpeg. $0 per render.',
    repo: `${GH}/muudzo/money`,
  },
  {
    title: 'fxagent',
    year: 2026,
    kind: 'Multi-agent system',
    note: 'Research pipeline of cooperating agents (data, indicators, LSTM forecasts, regime detection, portfolio risk filter).',
    repo: `${GH}/tatenda-source/fxagent`,
  },
  {
    title: 'Node graph',
    year: 2025,
    kind: 'Visualisation',
    note: 'A real-time D3 force-directed graph, built to understand how relationships read when they move.',
    repo: `${GH}/muudzo/real-time-node-visualization`,
  },
];

export const ARCHIVE: readonly IndexItem[] = [
  {
    title: 'Portfolio v1: Nostalgia OS',
    year: 2026,
    kind: 'Retired portfolio',
    note: 'Pick Vista or Mac OS X, watch it boot, open windows. Retired for the reasons given on “This site”.',
    live: '/v1/',
    repo: `${GH}/muudzo/TatendaNyemudzo`,
  },
  {
    title: 'Tate Studies',
    year: 2026,
    kind: 'Web app prototype',
    note: 'A study-planning web app, designed in Figma and taken to a working prototype.',
    live: 'https://tate-studies-web-app.vercel.app',
    repo: `${GH}/muudzo/Tate-Studies-Web-App-Prototype2`,
  },
  {
    title: 'Closet Muse',
    year: 2026,
    kind: 'Mobile interface',
    note: 'Wardrobe and outfit-planning app interface: weather-aware suggestions, wear tracking, calendar.',
    repo: `${GH}/muudzo/Closet-Muse-Mobile-App-Interface`,
  },
  {
    title: 'Gig driver app',
    year: 2026,
    kind: 'Interface study',
    note: 'Driver-side interface for gig-economy delivery work.',
    repo: `${GH}/muudzo/Gig-Economy-Driver-App-UI`,
  },
  {
    title: 'Farm management',
    year: 2026,
    kind: 'Interface study',
    note: 'Dashboard for farm operations. An early step towards MooMetrics.',
    repo: `${GH}/muudzo/FMS`,
  },
  {
    title: 'Hippie fintech',
    year: 2026,
    kind: 'Full-stack prototype',
    note: 'Peer-to-peer payments in USD and ZWL with stock insights, on FastAPI and React.',
    repo: `${GH}/muudzo/Zippie-Payment-App-for-Zimbabwe`,
  },
  {
    title: 'School payments',
    year: 2025,
    kind: 'Interface study',
    note: 'Fee management for schools, designed in Figma and built out.',
    repo: `${GH}/muudzo/School-Payments-Management-System`,
  },
  {
    title: 'Pac-Man (retro)',
    year: 2025,
    kind: 'Game',
    note: 'Pac-Man in Python. A later version became playable inside Portfolio v1.',
    repo: `${GH}/muudzo/pacman-retro`,
  },
  {
    title: 'Farm Tracker',
    year: 2025,
    kind: 'Laravel app',
    note: 'Early farm record keeping in Laravel/Blade. Where the agriculture thread started.',
    repo: `${GH}/muudzo/farmtracker.com`,
  },
  {
    title: 'First websites',
    year: 2024,
    kind: 'Early web',
    note: 'The Odin Project recipes, a to-do list, a calculator, small business sites. Everyone starts somewhere.',
    repo: `${GH}/muudzo/ODIN-RECIPES-`,
  },
];
