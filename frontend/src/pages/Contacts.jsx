// ============================================================================
// CONTACTS PAGE – everything for this page lives in this one file
// (summary boxes, search, table, add/edit modal, helpers).
// ============================================================================
import { useMemo, useState } from "react";
import { Plus, Search, Upload, Download, Trash2, Pencil, MessageCircle, X } from "lucide-react";
import useFetch from "../hooks/useFetch";
import api from "../services/api";
import { contactGroups } from "../data/dummyData";

const PAGE_SIZE = 6;
const emptyForm = { name: "", phone: "", email: "", group: contactGroups[0] };

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
  Active: "bg-emerald-100 text-emerald-700",
  Inactive: "bg-slate-100 text-slate-600",
};

function StatusBadge({ status }) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${badgeStyles[status] || "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
  );
}

// Colourful summary box with a glowing border
function SummaryBox({ label, value, color }) {
  return (
    <div
      className="rounded-2xl p-4 transition duration-200 hover:-translate-y-1"
      style={{
        border: `1.5px solid ${color}`,
        background: `linear-gradient(135deg, ${color}26 0%, #ffffff 70%)`,
        boxShadow: `0 0 0 3px ${color}1f, 0 0 22px ${color}66, 0 10px 22px -14px ${color}`,
      }}
    >
      <p className="text-xs font-medium text-slate-600">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
    </div>
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

export default function Contacts() {
  const { data: contacts, setData: setContacts, loading } = useFetch(api.getContacts);
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("All");
  const [page, setPage] = useState(1);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (contacts || []).filter(
      (c) =>
        (group === "All" || c.group === group) &&
        (!q || c.name.toLowerCase().includes(q) || c.phone.replace(/\s/g, "").includes(q.replace(/\s/g, "")) || c.email.toLowerCase().includes(q))
    );
  }, [contacts, query, group]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const rows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const openAdd = () => { setEditingId(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (c) => { setEditingId(c.id); setForm({ name: c.name, phone: c.phone, email: c.email, group: c.group }); setModalOpen(true); };
  const closeModal = () => setModalOpen(false);

  const save = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    if (editingId) {
      setContacts((list) => list.map((c) => (c.id === editingId ? { ...c, ...form } : c)));
    } else {
      setContacts((list) => [{ id: Date.now(), ...form, status: "Active", lastMessage: "—" }, ...list]);
    }
    closeModal();
  };

  const remove = (id) => setContacts((list) => list.filter((c) => c.id !== id));

  const columns = [
    {
      key: "name", label: "Name",
      render: (c) => (
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-wa to-brand-700 text-xs font-semibold text-white">
            {c.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
          </span>
          <div>
            <p className="font-medium text-slate-900">{c.name}</p>
            <p className="text-xs text-slate-500">{c.email}</p>
          </div>
        </div>
      ),
    },
    { key: "phone", label: "WhatsApp Number" },
    { key: "group", label: "Group" },
    { key: "status", label: "Status", render: (c) => <StatusBadge status={c.status} /> },
    { key: "lastMessage", label: "Last Message" },
    {
      key: "actions", label: "Actions",
      render: (c) => (
        <div className="flex items-center gap-1">
          <button className="rounded p-1.5 text-brand-700 hover:bg-brand-50" aria-label={`Message ${c.name}`}><MessageCircle size={16} /></button>
          <button onClick={() => openEdit(c)} className="rounded p-1.5 text-slate-600 hover:bg-slate-100" aria-label={`Edit ${c.name}`}><Pencil size={16} /></button>
          <button onClick={() => remove(c.id)} className="rounded p-1.5 text-rose-600 hover:bg-rose-50" aria-label={`Delete ${c.name}`}><Trash2 size={16} /></button>
        </div>
      ),
    },
  ];

  if (loading) return <Loader />;

  return (
    <>
      <PageHeader title="Contacts" subtitle="Manage the patients and groups you send WhatsApp messages to">
        <button className="btn-ghost"><Upload size={16} /> Import</button>
        <button className="btn-ghost"><Download size={16} /> Export</button>
        <button onClick={openAdd} className="btn-primary"><Plus size={16} /> Add Contact</button>
      </PageHeader>

      {/* Summary boxes */}
      <div className="mb-6 grid grid-cols-2 gap-5 md:grid-cols-4">
        <SummaryBox label="Total Contacts" value={contacts.length} color="#8b5cf6" />
        <SummaryBox label="Active" value={contacts.filter((c) => c.status === "Active").length} color="#25d366" />
        <SummaryBox label="Inactive" value={contacts.filter((c) => c.status === "Inactive").length} color="#f59e0b" />
        <SummaryBox label="Groups" value={contactGroups.length} color="#34b7f1" />
      </div>

      <section className="card">
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 p-4">
          <div className="relative min-w-[220px] flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              placeholder="Search by name, phone or email"
              className="input pl-9"
            />
          </div>
          <select value={group} onChange={(e) => { setGroup(e.target.value); setPage(1); }} className="input w-auto">
            <option>All</option>
            {contactGroups.map((g) => <option key={g}>{g}</option>)}
          </select>
        </div>

        <DataTable columns={columns} rows={rows} empty="No contacts match your search." />

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-4 py-3 text-sm text-slate-600">
          <span>
            Showing {filtered.length === 0 ? 0 : (current - 1) * PAGE_SIZE + 1}–{Math.min(current * PAGE_SIZE, filtered.length)} of {filtered.length}
          </span>
          <div className="flex items-center gap-2">
            <button disabled={current === 1} onClick={() => setPage(current - 1)} className="btn-ghost px-3 py-1.5 disabled:opacity-40">Previous</button>
            <span>Page {current} of {pages}</span>
            <button disabled={current === pages} onClick={() => setPage(current + 1)} className="btn-ghost px-3 py-1.5 disabled:opacity-40">Next</button>
          </div>
        </div>
      </section>

      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editingId ? "Edit Contact" : "Add Contact"}
        footer={
          <>
            <button onClick={closeModal} className="btn-ghost">Cancel</button>
            <button form="contact-form" type="submit" className="btn-primary">Save Contact</button>
          </>
        }
      >
        <form id="contact-form" onSubmit={save} className="space-y-3">
          <div>
            <label className="mb-1 block text-sm font-medium">Full name</label>
            <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">WhatsApp number</label>
            <input className="input" placeholder="+91 98765 43210" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input type="email" className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Group</label>
            <select className="input" value={form.group} onChange={(e) => setForm({ ...form, group: e.target.value })}>
              {contactGroups.map((g) => <option key={g}>{g}</option>)}
            </select>
          </div>
        </form>
      </Modal>
    </>
  );
}
