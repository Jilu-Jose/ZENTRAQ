import React from "react";

const fmt = a => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(a);

export default function DonutChart({ slices, total }) {
    const R = 72, r = 44, cx = 90, cy = 90;
    let angle = -Math.PI / 2;
    const paths = slices.map(s => {
        const sweep = (s.value / total) * 2 * Math.PI;
        const x1 = cx + R * Math.cos(angle), y1 = cy + R * Math.sin(angle);
        angle += sweep;
        const x2 = cx + R * Math.cos(angle), y2 = cy + R * Math.sin(angle);
        const ix1 = cx + r * Math.cos(angle - sweep), iy1 = cy + r * Math.sin(angle - sweep);
        const ix2 = cx + r * Math.cos(angle), iy2 = cy + r * Math.sin(angle);
        const large = sweep > Math.PI ? 1 : 0;
        return { path: `M${x1},${y1} A${R},${R} 0 ${large} 1 ${x2},${y2} L${ix2},${iy2} A${r},${r} 0 ${large} 0 ${ix1},${iy1} Z`, color: s.color, label: s.label, pct: ((s.value / total) * 100).toFixed(1) };
    });
    return (
        <svg viewBox="0 0 180 180" style={{ width: 160, height: 160, flexShrink: 0 }}>
            {paths.map((p, i) => <path key={i} d={p.path} fill={p.color} opacity="0.9" />)}
            <text x={cx} y={cy - 6} textAnchor="middle" fontSize="11" fill="var(--t3)" fontFamily="Sora,sans-serif">Total</text>
            <text x={cx} y={cy + 10} textAnchor="middle" fontSize="13" fill="var(--text)" fontWeight="600" fontFamily="JetBrains Mono,monospace">{fmt(total)}</text>
        </svg>
    );
}
