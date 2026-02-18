import React, { useState } from "react";
import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function AuthPage() {
    const [mode, setMode] = useState("login");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [name, setName] = useState("");
    const [err, setErr] = useState("");

    const submit = async () => {
        setErr("");
        if (!email.trim() || !pass.trim()) { setErr("Please fill in all fields."); return; }

        try {
            if (mode === "login") {
                await signInWithEmailAndPassword(auth, email, pass);
            } else {
                if (!name.trim()) { setErr("Please enter your name."); return; }
                const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
                await updateProfile(userCredential.user, { displayName: name });
            }
        } catch (error) {
            console.error(error);
            if (error.code === 'auth/invalid-credential') {
                setErr("Invalid email or password.");
            } else if (error.code === 'auth/email-already-in-use') {
                setErr("Email already in use.");
            } else if (error.code === 'auth/weak-password') {
                setErr("Password should be at least 6 characters.");
            } else {
                setErr(error.message);
            }
        }
    };

    return (
        <div className="auth-wrap">
            <div className="auth-card">
                <div className="auth-logo">
                    <div className="auth-logo-box">
                        <svg className="auth-logo-icon" viewBox="0 0 24 24"><path d="M21 18v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1" /><polyline points="15 3 21 3 21 9" /><path d="M10 14 21 3" /><path d="M3 10h11" /><path d="M3 14h4" /></svg>
                    </div>
                    Z.E.N.T.R.A.Q
                </div>
                <div className="auth-title">{mode === "login" ? "Welcome back" : "Create account"}</div>
                <div className="auth-sub">{mode === "login" ? "Sign in to your Z.E.N.T.R.A.Q account" : "Start managing your finances today"}</div>
                <div className="auth-tabs">
                    <button className={`auth-tab ${mode === "login" ? "active" : ""}`} onClick={() => { setMode("login"); setErr(""); }}>Sign In</button>
                    <button className={`auth-tab ${mode === "signup" ? "active" : ""}`} onClick={() => { setMode("signup"); setErr(""); }}>Sign Up</button>
                </div>
                {err && <div className="auth-error">{err}</div>}
                {mode === "signup" && (
                    <div className="auth-field">
                        <label className="auth-label">Full Name</label>
                        <input className="auth-input" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                )}
                <div className="auth-field">
                    <label className="auth-label">Email</label>
                    <input className="auth-input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()} />
                </div>
                <div className="auth-field">
                    <label className="auth-label">Password</label>
                    <input className="auth-input" type="password" placeholder={mode === "signup" ? "Min. 6 characters" : "••••••••"} value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()} />
                </div>
                <button className="auth-btn" onClick={submit}>{mode === "login" ? "Sign In" : "Create Account"}</button>
            </div>
        </div>
    );
}
