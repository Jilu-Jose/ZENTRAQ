import React, { useState } from "react";
import { Icon } from "./UI/Icons";
import { CAT_COLORS, CATEGORIES } from "../lib/constants";
const fmt = a => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(a);
const fmtDate = d => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export default function Transactions({ txns, openEdit, del }) {
    const [search, setSearch] = useState("");
    const [fType, setFType] = useState("all");
    const [fCat, setFCat] = useState("all");

    const totalInc = txns.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const totalExp = txns.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    const balance = totalInc - totalExp;

    const filtered = txns.filter(t => {
        const ms = t.title.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase());
        return ms && (fType === "all" || t.type === fType) && (fCat === "all" || t.category === fCat);
    });

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

            <div className="filters">
                <div className="search-box">
                    <Icon.search />
                    <input className="search-in" placeholder="Search transactions..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <select className="fsel" value={fType} onChange={e => setFType(e.target.value)}>
                    <option value="all">All Types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                <select className="fsel" value={fCat} onChange={e => setFCat(e.target.value)}>
                    <option value="all">All Categories</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>

            <div className="sec-label">Transactions</div>
            <div className="tbl-wrap">
                <div className="tbl-head"><span>Title</span><span>Amount</span><span>Category</span><span>Date</span><span style={{ textAlign: "right" }}>Actions</span></div>
                {filtered.length === 0 ? (
                    <div className="empty">
                        <svg className="empty-icon" viewBox="0 0 24 24"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /></svg>
                        No transactions found
                    </div>
                ) : (
                    [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date)).map(t => (
                        <div key={t.id} className="tbl-row">
                            <div className="row-name"><span className="dot" style={{ background: CAT_COLORS[t.category] || "#94A3B8" }} />{t.title}</div>
                            <div className={`row-amt ${t.type}`}>{t.type === "income" ? "+" : "−"}{fmt(t.amount)}</div>
                            <div><span className="badge">{t.category}</span></div>
                            <div className="row-date">{fmtDate(t.date)}</div>
                            <div className="row-acts">
                                <button className="act-btn edit" onClick={() => openEdit(t)}><Icon.edit /></button>
                                <button className="act-btn del" onClick={() => del(t.id)}><Icon.trash /></button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}
