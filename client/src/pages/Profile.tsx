import { useEffect, useState, type FormEvent } from "react";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import type { User } from "../types";

export default function Profile() {
  const { user, refreshUser } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", phone: "", studentId: "", department: "", yearOfStudy: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (user) setForm({ name:user.name??"", email:user.email??"", phone:user.phone??"", studentId:user.studentId??"", department:user.department??"", yearOfStudy:user.yearOfStudy??"" });
  }, [user]);
  function update(field: keyof typeof form, value: string) { setForm(current => ({ ...current, [field]: value })); }
  async function submit(event: FormEvent) {
    event.preventDefault(); setError(""); setMessage(""); setSaving(true);
    try { await api.patch<{user:User}>("/auth/profile", form); await refreshUser(); setMessage("Your profile has been updated. These details will be attached to your next order."); }
    catch (err:any) { setError(err.response?.data?.message ?? "Could not save your profile."); }
    finally { setSaving(false); }
  }
  return <section className="profile-page"><p className="eyebrow">Your account</p><h1>Student profile</h1><p className="muted">Keep your contact and student details up to date. The canteen team receives a snapshot of these details with every order.</p><form className="auth-card profile-card" onSubmit={submit}><div className="profile-grid">
    <label>Full name<input value={form.name} onChange={e=>update("name",e.target.value)} required maxLength={80}/></label>
    <label>Email address<input type="email" value={form.email} onChange={e=>update("email",e.target.value)} required/></label>
    <label>Phone number<input type="tel" value={form.phone} onChange={e=>update("phone",e.target.value)} placeholder="e.g. 9876543210" required maxLength={20}/></label>
    <label>Student ID / Roll number<input value={form.studentId} onChange={e=>update("studentId",e.target.value)} placeholder="Your college ID" required maxLength={40}/></label>
    <label>Department<input value={form.department} onChange={e=>update("department",e.target.value)} placeholder="e.g. CSE" required maxLength={80}/></label>
    <label>Year of study<select value={form.yearOfStudy} onChange={e=>update("yearOfStudy",e.target.value)} required><option value="">Select year</option><option value="1st Year">1st Year</option><option value="2nd Year">2nd Year</option><option value="3rd Year">3rd Year</option><option value="4th Year">4th Year</option><option value="Other">Other</option></select></label>
  </div>{error&&<p className="error">{error}</p>}{message&&<p className="success-message">{message}</p>}<button className="btn" type="submit" disabled={saving}>{saving?"Saving…":"Save profile"}</button></form></section>;
}