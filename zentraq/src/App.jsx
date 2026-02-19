import { useState, useEffect, useRef } from "react";
import { auth, db } from "./lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, onSnapshot, addDoc, deleteDoc, updateDoc, doc, query, where } from "firebase/firestore";

import AuthPage from "./components/AuthPage";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import Analytics from "./components/Analytics";
import Modal from "./components/UI/Modal";
import Toast from "./components/UI/Toast";


import "./index.css"; 


const DARK = `
  --bg:#0A0D14; --surface:#111827; --s2:#161E2E; --s3:#1A2335;
  --border:#1E2D42; --b2:#243248; --text:#E2E8F4; --t2:#7D90B0; --t3:#4A5E78;
  --accent:#3B82F6; --a2:#60A5FA; --green:#10B981; --red:#EF4444;
  --amber:#F59E0B; --glow:rgba(59,130,246,0.12); --shadow:rgba(0,0,0,0.45);
`;
const LIGHT = `
  --bg:#EEF2FA; --surface:#FFFFFF; --s2:#F4F7FE; --s3:#E8EEF8;
  --border:#D5DFF0; --b2:#C0CEEA; --text:#0D1829; --t2:#435070; --t3:#8A9BB8;
  --accent:#2563EB; --a2:#3B82F6; --green:#059669; --red:#DC2626;
  --amber:#D97706; --glow:rgba(37,99,235,0.08); --shadow:rgba(13,24,41,0.12);
`;

export default function App() {
  const [user, setUser] = useState(null);
  const [isDark, setIsDark] = useState(true);
  const [page, setPage] = useState("dashboard");
  const [txns, setTxns] = useState([]);
  const [modal, setModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [toast, setToast] = useState(null);
  const toastRef = useRef(null);


  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);


  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "transactions"),
      where("uid", "==", user.uid)
      
    );
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setTxns(list);
    });
    return () => unsub();
  }, [user]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast(null), 3000);
  };

  const openAdd = () => { setEditItem(null); setModal(true); };
  const openEdit = item => { setEditItem(item); setModal(true); };

  const handleSignOut = () => {
    signOut(auth);
  };

  
  const save = async (formData) => {
    if (!formData.title.trim() || !formData.amount || isNaN(+formData.amount) || +formData.amount <= 0) {
      showToast("Please fill in all fields correctly", "error"); return;
    }

    const payload = { ...formData, amount: +formData.amount, uid: user.uid };

    try {
      if (editItem) {
        await updateDoc(doc(db, "transactions", editItem.id), payload);
        showToast("Transaction updated", "info");
      } else {
        await addDoc(collection(db, "transactions"), payload);
        showToast("Transaction added", "success");
      }
      setModal(false);
    } catch (e) {
      console.error(e);
      showToast("Error saving transaction", "error");
    }
  };

  const del = async (id) => {
    try {
      await deleteDoc(doc(db, "transactions", id));
      showToast("Transaction deleted", "error");
    } catch (e) {
      console.error(e);
      showToast("Error deleting transaction", "error");
    }
  };

  if (!user) return (
    <>
      <style>{`:root{${isDark ? DARK : LIGHT}}`}</style>
      <AuthPage />
    </>
  );

  return (
    <>
      <style>{`:root{${isDark ? DARK : LIGHT}}`}</style>

      <div className="shell">
        <Navbar
          user={user}
          isDark={isDark}
          toggleTheme={() => setIsDark(d => !d)}
          page={page}
          setPage={setPage}
          openAdd={openAdd}
          onSignOut={handleSignOut}
        />

        <main className="page">
          {page === "dashboard" && <Dashboard txns={txns} openEdit={openEdit} del={del} setPage={setPage} />}
          {page === "transactions" && <Transactions txns={txns} openEdit={openEdit} del={del} />}
          {page === "analytics" && <Analytics txns={txns} />}
        </main>

        <footer className="footer">FinTrack — Personal Finance Tracker &nbsp;·&nbsp; Built with React</footer>

        <Modal isOpen={modal} onClose={() => setModal(false)} editItem={editItem} onSave={save} />
        <Toast toast={toast} />
      </div>
    </>
  );
}