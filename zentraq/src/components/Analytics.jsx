import React, { useMemo } from "react";
import BarChart from "./Charts/BarChart";
import DonutChart from "./Charts/DonutChart";
import { CAT_COLORS } from "../lib/constants";

const fmt = a => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(a);

export default function Analytics({ txns }) {
    const totalInc = txns.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const totalExp = txns.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    const balance = totalInc - totalExp;
    const savingsRate = totalInc > 0 ? ((balance / totalInc) * 100).toFixed(1) : 0;
    const avgTxn = txns.length > 0 ? (txns.reduce((s, t) => s + t.amount, 0) / txns.length) : 0;

    // Bar chart data — group by week
    const barData = useMemo(() => {
        const weeks = {};
        txns.forEach(t => {
            const d = new Date(t.date);
            const wk = `W${Math.ceil(d.getDate() / 7)} ${d.toLocaleString("en-US", { month: "short" })}`;
            if (!weeks[wk]) weeks[wk] = { income: 0, expense: 0, label: wk };
            weeks[wk][t.type] += t.amount;
        });
        return Object.values(weeks).slice(-6);
    }, [txns]);

    // Donut — expense by category
    const donutSlices = useMemo(() => {
        const cats = {};
        txns.filter(t => t.type === "expense").forEach(t => { cats[t.category] = (cats[t.category] || 0) + t.amount; });
        return Object.entries(cats).map(([k, v]) => ({ label: k, value: v, color: CAT_COLORS[k] || "#94A3B8" })).sort((a, b) => b.value - a.value);
    }, [txns]);

    // Top categories bar
    const topCats = useMemo(() => {
        const cats = {};
        txns.filter(t => t.type === "expense").forEach(t => { cats[t.category] = (cats[t.category] || 0) + t.amount; });
        const max = Math.max(...Object.values(cats), 1);
        return Object.entries(cats).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([k, v]) => ({ label: k, value: v, pct: (v / max) * 100, color: CAT_COLORS[k] }));
    }, [txns]);

    return (
        <>
            <div className="sec-label">Analytics Overview</div>
            <div className="summary-stats">
                <div className="mini-stat">
                    <div className="mini-stat-label">Net Savings</div>
                    <div className="mini-stat-val" style={{ color: balance >= 0 ? "var(--green)" : "var(--red)" }}>{fmt(balance)}</div>
                </div>
                <div className="mini-stat">
                    <div className="mini-stat-label">Savings Rate</div>
                    <div className="mini-stat-val" style={{ color: "var(--accent)" }}>{savingsRate}%</div>
                </div>
                <div className="mini-stat">
                    <div className="mini-stat-label">Avg Transaction</div>
                    <div className="mini-stat-val">{fmt(avgTxn)}</div>
                </div>
            </div>

            <div className="analytics-grid full" style={{ marginBottom: 20 }}>
                <div className="an-card">
                    <div className="an-card-title">Income vs Expenses — by Week</div>
                    <div className="chart-area">
                        <BarChart data={barData} />
                    </div>
                </div>
            </div>

            <div className="analytics-grid">
                <div className="an-card">
                    <div className="an-card-title">Spending by Category</div>
                    {donutSlices.length > 0 ? (
                        <div className="donut-wrap">
                            <DonutChart slices={donutSlices} total={totalExp} />
                            <div className="legend-list" style={{ flex: 1 }}>
                                {donutSlices.map(s => (
                                    <div key={s.label} className="legend-row">
                                        <div className="legend-left">
                                            <span className="legend-dot" style={{ background: s.color }} />
                                            <span className="legend-name">{s.label}</span>
                                        </div>
                                        <div>
                                            <span className="legend-val">{fmt(s.value)}</span>
                                            <span className="legend-pct">{((s.value / totalExp) * 100).toFixed(1)}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : <p style={{ color: "var(--t3)", fontSize: 13 }}>No expense data yet.</p>}
                </div>

                <div className="an-card">
                    <div className="an-card-title">Top Expense Categories</div>
                    {topCats.length > 0 ? (
                        <div className="top-cats">
                            {topCats.map(c => (
                                <div key={c.label} className="top-cat-row">
                                    <span className="top-cat-label">{c.label}</span>
                                    <div className="top-cat-bar-wrap"><div className="top-cat-bar" style={{ width: `${c.pct}%`, background: c.color }} /></div>
                                    <span className="top-cat-val">{fmt(c.value)}</span>
                                </div>
                            ))}
                        </div>
                    ) : <p style={{ color: "var(--t3)", fontSize: 13 }}>No expense data yet.</p>}
                </div>
            </div>
        </>
    );
}
