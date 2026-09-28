interface MatrixPrimitive {
  readonly id: string;
  readonly name: string;
  readonly note: string;
}

interface MatrixProject {
  readonly slug: string;
  readonly title: string;
  readonly primitives: readonly string[];
}

export interface MatrixRow<P extends MatrixPrimitive> {
  readonly primitive: P;
  readonly cells: readonly boolean[];
  readonly count: number;
}

/**
 * Cross-reference primitives against projects. Rows with no users are dropped and the rest are
 * ordered by how widely they are shared, so the most recurring habit reads first.
 */
export function buildMatrix<P extends MatrixPrimitive, W extends MatrixProject>(
  primitives: readonly P[],
  projects: readonly W[],
): { rows: MatrixRow<P>[]; columns: readonly W[] } {
  const rows = primitives
    .map((primitive, index) => {
      const cells = projects.map((project) => project.primitives.includes(primitive.id));
      return { primitive, cells, count: cells.filter(Boolean).length, index };
    })
    .filter((row) => row.count > 0)
    .sort((a, b) => b.count - a.count || a.index - b.index)
    .map(({ primitive, cells, count }) => ({ primitive, cells, count }));

  return { rows, columns: projects };
}
