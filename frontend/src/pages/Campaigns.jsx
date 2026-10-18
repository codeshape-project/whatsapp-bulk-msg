// // ============================================================================
// // CAMPAIGNS PAGE – everything for this page lives in this one file
// // (campaign table, "New Campaign" modal, helpers).
// // ============================================================================
// import { useState } from "react";
// import { Plus, X } from "lucide-react";
// import useFetch from "../hooks/useFetch";
// import api from "../services/api";
// import { templates as allTemplates, contactGroups } from "../data/dummyData";

// const n = (v) => v.toLocaleString("en-IN");

// /* ---------- small helpers used only on this page ---------- */

// function Loader() {
//   return (
//     <div className="flex items-center justify-center gap-3 py-16 text-sm text-slate-500">
//       <span className="h-5 w-5 animate-spin rounded-full border-2 border-brand-200 border-t-brand-700" />
//       Loading...
//     </div>
//   );
// }

// function PageHeader({ title, subtitle, children }) {
//   return (
//     <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
//       <div>
//         <h2 className="text-2xl font-semibold text-brand-900">{title}</h2>
//         {subtitle && <p className="text-sm text-slate-600">{subtitle}</p>}
//       </div>
//       {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
//     </div>
//   );
// }

// const badgeStyles = {
//   Completed: "bg-emerald-100 text-emerald-700",
//   Running: "bg-sky-100 text-sky-700",
//   Scheduled: "bg-amber-100 text-amber-700",
//   Failed: "bg-rose-100 text-rose-700",
// };

// function StatusBadge({ status }) {
//   return (
//     <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${badgeStyles[status] || "bg-slate-100 text-slate-600"}`}>
//       {status}
//     </span>
//   );
// }

// function Modal({ isOpen, onClose, title, children, footer }) {
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true">
//       <div className="absolute inset-0 bg-black/50" onClick={onClose} />
//       <div className="relative w-full max-w-md rounded-2xl bg-white shadow-xl">
//         <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
//           <h3 className="text-lg font-semibold text-brand-900">{title}</h3>
//           <button onClick={onClose} className="rounded p-1 text-slate-500 hover:bg-slate-100" aria-label="Close">
//             <X size={18} />
//           </button>
//         </div>
//         <div className="px-5 py-4">{children}</div>
//         {footer && <div className="flex justify-end gap-2 border-t border-slate-100 px-5 py-3">{footer}</div>}
//       </div>
//     </div>
//   );
// }

// function DataTable({ columns, rows, empty = "No records found." }) {
//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full min-w-[640px] text-left text-sm">
//         <thead>
//           <tr className="bg-brand-50 text-xs font-semibold text-brand-900">
//             {columns.map((c) => (
//               <th key={c.key} className="px-4 py-3.5">{c.label}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-slate-100">
//           {rows.length === 0 && (
//             <tr>
//               <td colSpan={columns.length} className="px-4 py-10 text-center text-slate-500">{empty}</td>
//             </tr>
//           )}
//           {rows.map((row, i) => (
//             <tr key={row.id ?? i} className="hover:bg-brand-50/60">
//               {columns.map((c) => (
//                 <td key={c.key} className="px-4 py-3.5 text-slate-700">
//                   {c.render ? c.render(row) : row[c.key]}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// /* ---------- the page ---------- */

// export default function Campaigns() {
//   const { data: campaigns, setData, loading } = useFetch(api.getCampaigns);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [form, setForm] = useState({ name: "", template: "", group: "All Contacts" });
//   const approved = allTemplates.filter((t) => t.status === "Approved");

//   const create = (e) => {
//     e.preventDefault();
//     if (!form.name.trim()) return;
//     setData((list) => [
//       {
//         id: Date.now(), name: form.name, template: form.template || approved[0].name,
//         recipients: 0, sent: 0, delivered: 0, read: 0, failed: 0,
//         status: "Scheduled", date: "Today", time: "—",
//       },
//       ...list,
//     ]);
//     setForm({ name: "", template: "", group: "All Contacts" });
//     setModalOpen(false);
//   };

//   if (loading) return <Loader />;

//   const columns = [
//     { key: "name", label: "Campaign", render: (c) => <span className="font-medium text-slate-900">{c.name}</span> },
//     { key: "template", label: "Template", render: (c) => <span className="text-slate-500">{c.template}</span> },
//     { key: "recipients", label: "Recipients", render: (c) => n(c.recipients) },
//     { key: "sent", label: "Sent", render: (c) => n(c.sent) },
//     { key: "delivered", label: "Delivered", render: (c) => n(c.delivered) },
//     { key: "read", label: "Read", render: (c) => n(c.read) },
//     { key: "failed", label: "Failed", render: (c) => n(c.failed) },
//     { key: "status", label: "Status", render: (c) => <StatusBadge status={c.status} /> },
//     { key: "date", label: "Date", render: (c) => <>{c.date}<br /><span className="text-xs text-slate-500">{c.time}</span></> },
//   ];

//   return (
//     <>
//       <PageHeader title="Campaigns" subtitle="Create and track bulk WhatsApp campaigns">
//         <button onClick={() => setModalOpen(true)} className="btn-primary"><Plus size={16} /> New Campaign</button>
//       </PageHeader>

//       <section className="card">
//         <DataTable columns={columns} rows={campaigns} />
//       </section>

//       <Modal
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         title="New Campaign"
//         footer={
//           <>
//             <button onClick={() => setModalOpen(false)} className="btn-ghost">Cancel</button>
//             <button form="campaign-form" type="submit" className="btn-primary">Create Campaign</button>
//           </>
//         }
//       >
//         <form id="campaign-form" onSubmit={create} className="space-y-3">
//           <div>
//             <label className="mb-1 block text-sm font-medium">Campaign name</label>
//             <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
//           </div>
//           <div>
//             <label className="mb-1 block text-sm font-medium">Template</label>
//             <select className="input" value={form.template} onChange={(e) => setForm({ ...form, template: e.target.value })}>
//               {approved.map((t) => <option key={t.id} value={t.name}>{t.name}</option>)}
//             </select>
//           </div>
//           <div>
//             <label className="mb-1 block text-sm font-medium">Send to</label>
//             <select className="input" value={form.group} onChange={(e) => setForm({ ...form, group: e.target.value })}>
//               <option>All Contacts</option>
//               {contactGroups.map((g) => <option key={g}>{g}</option>)}
//             </select>
//           </div>
//         </form>
//       </Modal>
//     </>
//   );
// }

// ============================================================================
// CAMPAIGNS PAGE – everything for this page lives in this one file
// (campaign table, "New Campaign" modal, helpers).
// ============================================================================
import { useState } from "react";
import { Plus, X } from "lucide-react";
import useFetch from "../hooks/useFetch";
import api from "../services/api";
import { templates as allTemplates, contactGroups } from "../data/dummyData";

const n = (v) => v.toLocaleString("en-IN");

/* ---------- small helpers used only on this page ---------- */

function Loader() {
  return (
    <div className="flex items-center justify-center gap-3 py-16 text-sm text-slate-500">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-brand-200 border-t-brand-700" />
      Loading...
    </div>
  );
}

function PageHeader({ title, subtitle, children }) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h2 className="text-2xl font-semibold text-brand-900">{title}</h2>
        {subtitle && <p className="text-sm text-slate-600">{subtitle}</p>}
      </div>
      {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
    </div>
  );
}

const badgeStyles = {
  Completed: "bg-emerald-100 text-emerald-700",
  Running: "bg-sky-100 text-sky-700",
  Scheduled: "bg-amber-100 text-amber-700",
  Failed: "bg-rose-100 text-rose-700",
};

function StatusBadge({ status }) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${badgeStyles[status] || "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
  );
}

function Modal({ isOpen, onClose, title, children, footer }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h3 className="text-lg font-semibold text-brand-900">{title}</h3>
          <button onClick={onClose} className="rounded p-1 text-slate-500 hover:bg-slate-100" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
        {footer && <div className="flex justify-end gap-2 border-t border-slate-100 px-5 py-3">{footer}</div>}
      </div>
    </div>
  );
}

function DataTable({ columns, rows, empty = "No records found." }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="bg-brand-50 text-xs font-semibold text-brand-900">
            {columns.map((c) => (
              <th key={c.key} className="px-4 py-3.5">{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-10 text-center text-slate-500">{empty}</td>
            </tr>
          )}
          {rows.map((row, i) => (
            <tr key={row.id ?? i} className="hover:bg-brand-50/60">
              {columns.map((c) => (
                <td key={c.key} className="px-4 py-3.5 text-slate-700">
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- the page ---------- */

export default function Campaigns() {
  const { data: campaigns, setData, loading } = useFetch(api.getCampaigns);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", template: "", group: "All Contacts" });
  const approved = allTemplates.filter((t) => t.status === "Approved");

  const create = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setData((list) => [
      {
        id: Date.now(), name: form.name, template: form.template || approved[0].name,
        recipients: 0, sent: 0, delivered: 0, read: 0, failed: 0,
        status: "Scheduled", date: "Today", time: "—",
      },
      ...list,
    ]);
    setForm({ name: "", template: "", group: "All Contacts" });
    setModalOpen(false);
  };

  if (loading) return <Loader />;

  const columns = [
    { key: "name", label: "Campaign", render: (c) => <span className="font-medium text-slate-900">{c.name}</span> },
    { key: "template", label: "Template", render: (c) => <span className="text-slate-500">{c.template}</span> },
    { key: "recipients", label: "Recipients", render: (c) => n(c.recipients) },
    { key: "sent", label: "Sent", render: (c) => n(c.sent) },
    { key: "delivered", label: "Delivered", render: (c) => n(c.delivered) },
    { key: "read", label: "Read", render: (c) => n(c.read) },
    { key: "failed", label: "Failed", render: (c) => n(c.failed) },
    { key: "status", label: "Status", render: (c) => <StatusBadge status={c.status} /> },
    { key: "date", label: "Date", render: (c) => <>{c.date}<br /><span className="text-xs text-slate-500">{c.time}</span></> },
  ];

  return (
    <>
      <PageHeader title="Campaigns" subtitle="Create and track bulk WhatsApp campaigns">
        <button onClick={() => setModalOpen(true)} className="btn-primary"><Plus size={16} /> New Campaign</button>
      </PageHeader>

      <section className="card">
        <DataTable columns={columns} rows={campaigns} />
      </section>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="New Campaign"
        footer={
          <>
            <button onClick={() => setModalOpen(false)} className="btn-ghost">Cancel</button>
            <button form="campaign-form" type="submit" className="btn-primary">Create Campaign</button>
          </>
        }
      >
        <form id="campaign-form" onSubmit={create} className="space-y-3">
          <div>
            <label className="mb-1 block text-sm font-medium">Campaign name</label>
            <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Template</label>
            <select className="input" value={form.template} onChange={(e) => setForm({ ...form, template: e.target.value })}>
              {approved.map((t) => <option key={t.id} value={t.name}>{t.name}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Send to</label>
            <select className="input" value={form.group} onChange={(e) => setForm({ ...form, group: e.target.value })}>
              <option>All Contacts</option>
              {contactGroups.map((g) => <option key={g}>{g}</option>)}
            </select>
          </div>
        </form>
      </Modal>
    </>
  );
}
