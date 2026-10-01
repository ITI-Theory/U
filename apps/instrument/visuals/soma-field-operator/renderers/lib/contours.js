// Iso-lines (contour lines) over a height field, by marching squares.
// Any renderer with a grid of heights can add a layer: contours are the
// level sets of the field, the way physicists draw equipotentials.

const DEFAULT_COLORS = ['#14e5ff', '#56f0a2', '#f6c75a', '#ff3bce'];

export function createContourLayer(THREE, { levels, colors = DEFAULT_COLORS, opacity = 0.85 } = {}) {
  const palette = colors.map(color => new THREE.Color(color));
  const levelColors = levels.map((_, index) => {
    const t = levels.length > 1 ? index / (levels.length - 1) : 0;
    const scaled = t * (palette.length - 1);
    const lower = Math.floor(scaled);
    return palette[lower].clone().lerp(palette[Math.min(palette.length - 1, lower + 1)], scaled - lower);
  });
  const geometry = new THREE.BufferGeometry();
  const material = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity, depthWrite: false });
  const lines = new THREE.LineSegments(geometry, material);
  lines.frustumCulled = false;
  const positions = [];
  const vertexColors = [];

  // Grid of (columns x rows) samples; height(col, row), x(col), y(row) give local coordinates.
  function update({ columns, rows, height, x, y, lift = 0.01, visible = true }) {
    lines.visible = visible;
    if (!visible) return;
    positions.length = 0;
    vertexColors.length = 0;
    const crossing = (x0, y0, h0, x1, y1, h1, level) => {
      const t = (level - h0) / (h1 - h0);
      return [x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, level + lift];
    };
    for (let row = 0; row < rows - 1; row += 1) {
      for (let col = 0; col < columns - 1; col += 1) {
        const corners = [
          [x(col), y(row), height(col, row)],
          [x(col + 1), y(row), height(col + 1, row)],
          [x(col + 1), y(row + 1), height(col + 1, row + 1)],
          [x(col), y(row + 1), height(col, row + 1)],
        ];
        for (const [levelIndex, level] of levels.entries()) {
          const points = [];
          for (let edge = 0; edge < 4; edge += 1) {
            const [ax, ay, ah] = corners[edge];
            const [bx, by, bh] = corners[(edge + 1) % 4];
            if ((ah < level) !== (bh < level)) points.push(crossing(ax, ay, ah, bx, by, bh, level));
          }
          // Two crossings make one segment; four (a saddle) make two.
          for (let index = 0; index + 1 < points.length; index += 2) {
            positions.push(...points[index], ...points[index + 1]);
            const color = levelColors[levelIndex];
            vertexColors.push(color.r, color.g, color.b, color.r, color.g, color.b);
          }
        }
      }
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(vertexColors, 3));
  }

  return {
    object: lines,
    update,
    setOpacity(value) { material.opacity = value; },
    dispose() { geometry.dispose(); material.dispose(); },
  };
}
