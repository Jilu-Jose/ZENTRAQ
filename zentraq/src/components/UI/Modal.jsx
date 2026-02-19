import React, { useState, useEffect } from "react";

import { CATEGORIES } from "../../lib/constants";

export default function Modal({ isOpen, onClose, editItem, onSave }) {
    const [form, setForm] = useState({ title: "", amount: "", category: "Food", type: "expense", date: new Date().toISOString().split("T")[0] });

    
    useEffect(() => {
        if (isOpen) {
            if (editItem) {
                setForm({ title: editItem.title, amount: String(editItem.amount), category: editItem.category, type: editItem.type, date: editItem.date });
            } else {
                setForm({ title: "", amount: "", category: "Food", type: "expense", date: new Date().toISOString().split("T")[0] });
            }
        }
    }, [isOpen, editItem]);

    const handleSave = () => {
        onSave(form);
    };

    if (!isOpen) return null;

    return (
        <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
            <div className="modal">
                <div className="modal-hd">
                    <span className="modal-title">{editItem ? "Edit Transaction" : "New Transaction"}</span>
                    <button className="modal-x" onClick={onClose}>&#x2715;</button>
                </div>
                <div className="type-row">
                    <button className={`type-btn ${form.type === "expense" ? "active expense" : ""}`} onClick={() => setForm(f => ({ ...f, type: "expense" }))}>Expense</button>
                    <button className={`type-btn ${form.type === "income" ? "active income" : ""}`} onClick={() => setForm(f => ({ ...f, type: "income" }))}>Income</button>
                </div>
                <div className="form-grid">
                    <div className="fg span2">
                        <label className="flabel">Title</label>
                        <input className="finput" placeholder="e.g. Grocery shopping" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
                    </div>
                    <div className="fg">
                        <label className="flabel">Amount ($)</label>
                        <input className="finput" type="number" placeholder="0.00" min="0" step="0.01" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} />
                    </div>
                    <div className="fg">
                        <label className="flabel">Date</label>
                        <input className="finput" type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
                    </div>
                    <div className="fg span2">
                        <label className="flabel">Category</label>
                        <select className="fsel" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                </div>
                <div className="modal-acts">
                    <button className="btn-cancel" onClick={onClose}>Cancel</button>
                    <button className="btn-save" onClick={handleSave}>{editItem ? "Save Changes" : "Add Transaction"}</button>
                </div>
            </div>
        </div>
    );
}
