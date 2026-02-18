import React from "react";

const fmt = a => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(a);

export default function BarChart({ data }) {
    const W = 600, H = 220, PAD = 48, BAR_GAP = 10;
    if (!data || !data.length) return null;
    const max = Math.max(...data.map(d => Math.max(d.income, d.expense)), 1);
    const slotW = (W - PAD * 2) / data.length;
    const barW = Math.max(8, slotW / 2 - BAR_GAP);
    const scaleY = v => H - PAD - (v / max) * (H - PAD * 1.4);

    return (
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "100%", overflow: "visible" }} preserveAspectRatio="xMidYMid meet">
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((f, i) => {
                const y = PAD + (1 - f) * (H - PAD * 1.4);
                return (
                    <g key={i}>
                        <line x1={PAD} y1={y} x2={W - PAD} y2={y} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
                        <text x={PAD - 8} y={y + 4} textAnchor="end" fontSize="10" fill="var(--t3)">{fmt(max * f).replace("$", "$").replace(/\.00$/, "")}</text>
                    </g>
                );
            })}
            {/* Bars */}
            {data.map((d, i) => {
                const cx = PAD + i * slotW + slotW / 2;
                const iy = scaleY(d.income), ey = scaleY(d.expense);
                return (
                    <g key={i}>
                        <rect x={cx - barW - 2} y={iy} width={barW} height={H - PAD - iy} fill="var(--green)" rx="3" opacity="0.85" />
                        <rect x={cx + 2} y={ey} width={barW} height={H - PAD - ey} fill="var(--red)" rx="3" opacity="0.85" />
                        <text x={cx} y={H - 8} textAnchor="middle" fontSize="10" fill="var(--t3)">{d.label}</text>
                    </g>
                );
            })}
            {/* Legend */}
            <rect x={W - PAD - 90} y={8} width={10} height={10} fill="var(--green)" rx="2" />
            <text x={W - PAD - 76} y={17} fontSize="11" fill="var(--t2)">Income</text>
            <rect x={W - PAD - 30} y={8} width={10} height={10} fill="var(--red)" rx="2" />
            <text x={W - PAD - 16} y={17} fontSize="11" fill="var(--t2)">Expense</text>
        </svg>
    );
}
