import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import sharp from 'sharp';
import { SITE } from '../../data/site';

type Card = {
  kicker: string;
  title: string;
  line: string;
};

export const getStaticPaths = (async () => {
  const work = await getCollection('work');
  const home: Card = { kicker: SITE.role, title: SITE.name, line: SITE.statement };
  return [
    { params: { slug: 'home' }, props: home },
    ...work.map((entry) => ({
      params: { slug: entry.id },
      props: { kicker: `${SITE.name} · Case study`, title: entry.data.title, line: entry.data.claim },
    })),
  ];
}) satisfies GetStaticPaths;

const XML_ENTITIES: Record<string, string> = {
  '<': '&lt;',
  '>': '&gt;',
  '&': '&amp;',
  "'": '&apos;',
  '"': '&quot;',
};

const escapeXml = (text: string) => text.replace(/[<>&'"]/g, (char) => XML_ENTITIES[char] ?? char);

/** Greedy word wrap; SVG text has no layout engine. */
function wrap(text: string, maxChars: number, maxLines: number): string[] {
  const lines: string[] = [];
  let current = '';
  for (const word of text.split(' ')) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  if (lines.length <= maxLines) return lines;
  const kept = lines.slice(0, maxLines);
  kept[maxLines - 1] = `${kept[maxLines - 1].replace(/[,.;:]?$/, '')}…`;
  return kept;
}

function render({ kicker, title, line }: Card): string {
  const lineRows = wrap(line, 52, 3)
    .map((row, i) => `<tspan x="80" dy="${i === 0 ? 0 : 46}">${escapeXml(row)}</tspan>`)
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f7f3ea"/>
  <rect x="80" y="80" width="1040" height="2" fill="#1c2130"/>
  <text x="80" y="128" font-family="Helvetica, Arial, sans-serif" font-size="22" letter-spacing="3" fill="#4d5566">${escapeXml(kicker.toUpperCase())}</text>
  <text x="80" y="290" font-family="Georgia, 'Times New Roman', serif" font-size="112" fill="#1c2130" letter-spacing="-3">${escapeXml(title)}</text>
  <text x="80" y="390" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="36" fill="#1c2130">${lineRows}</text>
  <circle cx="1100" cy="550" r="14" fill="#c4452c"/>
</svg>`;
}

export const GET: APIRoute = async ({ props }) => {
  const png = await sharp(Buffer.from(render(props as Card))).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
