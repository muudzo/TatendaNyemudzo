export type ResourceKind = 'document' | 'style' | 'font' | 'script' | 'image' | 'other';

export interface ResourceSample {
  readonly name: string;
  readonly initiatorType: string;
  readonly encodedBodySize: number;
  readonly transferSize: number;
}

export interface WeightSummary {
  readonly total: number;
  /** Bytes needed to read the page: the HTML and its stylesheets. */
  readonly essential: number;
  readonly byKind: Readonly<Record<ResourceKind, number>>;
}

const KB = 1024;
const MB = KB * KB;

const EXTENSION_KIND: ReadonlyArray<[RegExp, ResourceKind]> = [
  [/\.(woff2?|ttf|otf)$/, 'font'],
  [/\.css$/, 'style'],
  [/\.m?js$/, 'script'],
  [/\.(avif|webp|png|jpe?g|gif|svg)$/, 'image'],
];

export function classifyResource(name: string, initiatorType: string): ResourceKind {
  const path = name.split(/[?#]/)[0].toLowerCase();
  const match = EXTENSION_KIND.find(([pattern]) => pattern.test(path));
  if (match) return match[1];
  if (initiatorType === 'img') return 'image';
  if (initiatorType === 'script') return 'script';
  return 'other';
}

export function summariseWeight(
  documentBytes: number,
  resources: readonly ResourceSample[],
): WeightSummary {
  const byKind: Record<ResourceKind, number> = {
    document: documentBytes,
    style: 0,
    font: 0,
    script: 0,
    image: 0,
    other: 0,
  };

  for (const resource of resources) {
    const kind = classifyResource(resource.name, resource.initiatorType);
    byKind[kind] += resource.encodedBodySize || resource.transferSize;
  }

  const total = Object.values(byKind).reduce((sum, bytes) => sum + bytes, 0);
  return { total, essential: byKind.document + byKind.style, byKind };
}

export function formatKB(bytes: number): string {
  if (bytes < KB) return '<1 KB';
  if (bytes >= MB) return `${Math.round((bytes / MB) * 10) / 10} MB`;
  return `${Math.round(bytes / KB)} KB`;
}
