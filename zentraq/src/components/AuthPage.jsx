import React, { useState } from "react";
import { auth, googleProvider } from "../lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";

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


    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error(error);
            setErr(error.message);
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
                <button className="auth-btn google-btn" onClick={signInWithGoogle} type="button" style={{ marginTop: "10px", backgroundColor: "#fff", color: "#333", border: "1px solid #ddd", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                    <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" /><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" /><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" /><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" /></svg>
                    Sign in with Google
                </button>
            </div>
        </div>
    );
}
