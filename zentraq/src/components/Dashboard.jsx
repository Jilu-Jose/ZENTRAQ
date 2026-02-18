import React from "react";
import { Icon } from "./UI/Icons";
import { CAT_COLORS } from "../lib/constants";

const fmt = a => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(a);
const fmtDate = d => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export default function Dashboard({ txns, openEdit, del, setPage }) {
    const totalInc = txns.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const totalExp = txns.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    const balance = totalInc - totalExp;
    const savingsRate = totalInc > 0 ? ((balance / totalInc) * 100).toFixed(1) : 0;
    const avgTxn = txns.length > 0 ? (txns.reduce((s, t) => s + t.amount, 0) / txns.length) : 0;
    const largestExp = txns.filter(t => t.type === "expense").sort((a, b) => b.amount - a.amount)[0];

    return (
        <>
            <div className="sec-label">Overview</div>
            <div className="cards-row">
                <div className="stat-card bal">
                    <div className="stat-icon" style={{ background: "rgba(99,102,241,.15)" }}><Icon.balance /></div>
                    <div className="stat-label">Net Balance</div>
                    <div className="stat-val" style={{ color: balance >= 0 ? "var(--text)" : "var(--red)" }}>{fmt(balance)}</div>
                    <div className="stat-meta">From <b>{txns.length}</b> transactions</div>
                </div>
                <div className="stat-card inc">
                    <div className="stat-icon" style={{ background: "rgba(16,185,129,.15)" }}><Icon.income /></div>
                    <div className="stat-label">Total Income</div>
                    <div className="stat-val" style={{ color: "var(--green)" }}>{fmt(totalInc)}</div>
                    <div className="stat-meta"><b>{txns.filter(t => t.type === "income").length}</b> entries</div>
                </div>
                <div className="stat-card exp">
                    <div className="stat-icon" style={{ background: "rgba(239,68,68,.12)" }}><Icon.expense /></div>
                    <div className="stat-label">Total Expenses</div>
                    <div className="stat-val" style={{ color: "var(--red)" }}>{fmt(totalExp)}</div>
                    <div className="stat-meta"><b>{txns.filter(t => t.type === "expense").length}</b> entries</div>
                </div>
            </div>

            <div className="dash-grid">
                <div className="dash-recent">
                    <div className="dash-recent-head">
                        <span className="dash-recent-title">Recent Transactions</span>
                        <button className="dash-recent-link" onClick={() => setPage("transactions")}>View all</button>
                    </div>
                    {[...txns].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5).map(t => (
                        <div key={t.id} className="tbl-row" style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 90px" }}>
                            <div className="row-name"><span className="dot" style={{ background: CAT_COLORS[t.category] || "#94A3B8" }} />{t.title}</div>
                            <div className={`row-amt ${t.type}`}>{t.type === "income" ? "+" : "−"}{fmt(t.amount)}</div>
                            <div><span className="badge">{t.category}</span></div>
                            <div className="row-date">{fmtDate(t.date)}</div>
                            <div className="row-acts">
                                <button className="act-btn edit" onClick={() => openEdit(t)}><Icon.edit /></button>
                                <button className="act-btn del" onClick={() => del(t.id)}><Icon.trash /></button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="dash-side">
                    <div className="savings-card">
                        <div className="savings-title">Savings Rate</div>
                        <div className="savings-rate">{savingsRate}%</div>
                        <div className="savings-sub">of income saved this period</div>
                        <div className="savings-bar"><div className="savings-fill" style={{ width: `${Math.min(100, Math.max(0, savingsRate))}%` }} /></div>
                        <div style={{ fontSize: 12, color: "var(--t3)" }}>{fmt(balance)} saved of {fmt(totalInc)}</div>
                    </div>

                    <div className="quick-stats-card">
                        <div className="quick-stats-title">Quick Stats</div>
                        <div className="quick-stat-item"><span className="quick-stat-key">Avg. Transaction</span><span className="quick-stat-val">{fmt(avgTxn)}</span></div>
                        <div className="quick-stat-item"><span className="quick-stat-key">Total Transactions</span><span className="quick-stat-val">{txns.length}</span></div>
                        {largestExp && <div className="quick-stat-item"><span className="quick-stat-key">Largest Expense</span><span className="quick-stat-val" style={{ color: "var(--red)" }}>{fmt(largestExp.amount)}</span></div>}
                        <div className="quick-stat-item"><span className="quick-stat-key">Income Sources</span><span className="quick-stat-val">{txns.filter(t => t.type === "income").length}</span></div>
                    </div>
                </div>
            </div>
        </>
    );
}
