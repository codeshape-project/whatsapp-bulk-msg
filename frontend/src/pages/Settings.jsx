// ============================================================================
// SETTINGS PAGE – everything for this page lives in this one file
// ============================================================================
import { useState } from "react";
import { HOSPITAL } from "../data/dummyData";

/* ---------- small helper used only on this page ---------- */

function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-brand-900">{title}</h2>
      {subtitle && <p className="text-sm text-slate-600">{subtitle}</p>}
    </div>
  );
}

/* ---------- the page ---------- */

export default function Settings() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    hospital: HOSPITAL.name,
    location: HOSPITAL.location,
    phoneId: "109876543210987",
    businessId: "208765432109876",
    token: "EAAG••••••••••••••••••••",
  });

  const submit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const field = (key, label, type = "text") => (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">{label}</label>
      <input type={type} className="input" value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
    </div>
  );

  return (
    <>
      <PageHeader title="Settings" subtitle="Hospital profile and WhatsApp Cloud API connection" />
      <form onSubmit={submit} className="grid gap-5 lg:grid-cols-2">
        <section className="card space-y-4 p-5">
          <h3 className="text-lg font-semibold text-brand-900">Hospital profile</h3>
          {field("hospital", "Hospital name")}
          {field("location", "Location")}
        </section>

        <section className="card space-y-4 p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-brand-900">WhatsApp Cloud API</h3>
            <span className="flex items-center gap-1.5 text-xs font-medium text-brand-700">
              <span className="h-2 w-2 rounded-full bg-wa shadow-[0_0_8px_#25d366]" /> Connected
            </span>
          </div>
          {field("phoneId", "Phone number ID")}
          {field("businessId", "Business account ID")}
          {field("token", "Access token", "password")}
        </section>

        <div className="flex items-center gap-3 lg:col-span-2">
          <button type="submit" className="btn-primary">Save changes</button>
          {saved && <span className="text-sm text-brand-700">Changes saved.</span>}
        </div>
      </form>
    </>
  );
}
