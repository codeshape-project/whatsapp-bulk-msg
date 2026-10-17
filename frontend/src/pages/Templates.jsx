// ============================================================================
// TEMPLATES PAGE – everything for this page lives in this one file
// ============================================================================
import { Plus, FileText } from "lucide-react";
import useFetch from "../hooks/useFetch";
import api from "../services/api";

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
  Approved: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Rejected: "bg-rose-100 text-rose-700",
};

function StatusBadge({ status }) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${badgeStyles[status] || "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
  );
}

/* ---------- the page ---------- */

export default function Templates() {
  const { data: templates, loading } = useFetch(api.getTemplates);
  if (loading) return <Loader />;

  return (
    <>
      <PageHeader title="Templates" subtitle="WhatsApp message templates approved by Meta">
        <button className="btn-primary"><Plus size={16} /> New Template</button>
      </PageHeader>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {templates.map((t) => (
          <article key={t.id} className="card flex flex-col p-5 transition hover:-translate-y-1 hover:shadow-[0_14px_30px_-12px_rgba(18,140,126,0.5)]">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-wa to-brand-700 text-white shadow-[0_0_12px_rgba(37,211,102,0.5)]">
                  <FileText size={20} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">{t.name}</h3>
                  <p className="text-xs text-slate-500">{t.category} • {t.language}</p>
                </div>
              </div>
              <StatusBadge status={t.status} />
            </div>
            <div className="mt-4 flex-1 rounded-lg rounded-tl-none bg-[#d9fdd3] p-3 text-sm text-slate-800">
              {t.body}
            </div>
            <div className="mt-4 flex gap-2">
              <button className="btn-ghost flex-1 py-1.5">Preview</button>
              <button className="btn-primary flex-1 py-1.5" disabled={t.status !== "Approved"}>Use Template</button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
