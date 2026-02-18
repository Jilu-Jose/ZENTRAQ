import React, { useState } from "react";
import { Icon } from "./UI/Icons";

export default function Navbar({ user, isDark, toggleTheme, page, setPage, openAdd, onSignOut }) {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <nav className="navbar" onClick={() => showMenu && setShowMenu(false)}>
            <div className="nav-logo">
                <div className="nav-logo-box">
                    <svg className="nav-logo-svg" viewBox="0 0 24 24"><path d="M21 18v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1" /><polyline points="15 3 21 3 21 9" /><path d="M10 14 21 3" /><path d="M3 10h11" /><path d="M3 14h4" /></svg>
                </div>
                Z.E.N.T.R.A.Q
            </div>

            <div className="nav-center">
                {[["dashboard", "Dashboard"], ["transactions", "Transactions"], ["analytics", "Analytics"]].map(([k, l]) => (
                    <button key={k} className={`nav-btn ${page === k ? "active" : ""}`} onClick={() => setPage(k)}>{l}</button>
                ))}
            </div>

            <div className="nav-right">
                <button className={`toggle-btn ${isDark ? "" : "lit"}`} onClick={toggleTheme} aria-label="Toggle theme">
                    <span className="toggle-moon"><Icon.moon /></span>
                    <span className="toggle-sun"><Icon.sun /></span>
                    <div className="toggle-knob" />
                </button>

                <button className="add-btn" onClick={openAdd}>
                    <Icon.plus /> Add Transaction
                </button>

                <div style={{ position: "relative" }} onClick={e => e.stopPropagation()}>
                    <button className="avatar-btn" onClick={() => setShowMenu(m => !m)}>
                        {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                    </button>
                    {showMenu && (
                        <div className="avatar-menu">
                            <div className="avatar-info">
                                <div className="avatar-name">{user.displayName || "User"}</div>
                                <div className="avatar-email">{user.email}</div>
                            </div>
                            <button className="avatar-menu-btn" onClick={() => { onSignOut(); setShowMenu(false); }}>
                                <Icon.logout /> Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
