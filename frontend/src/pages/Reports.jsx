// // ============================================================================
// // REPORTS PAGE – everything for this page lives in this one file
// // ============================================================================
// import { Download } from "lucide-react";
// import useFetch from "../hooks/useFetch";
// import api from "../services/api";

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

// export default function Reports() {
//   const { data, loading } = useFetch(api.getReports);
//   if (loading) return <Loader />;

//   const max = Math.max(...data.map((d) => d.sent));
//   const columns = [
//     { key: "month", label: "Month", render: (r) => <span className="font-medium text-slate-900">{r.month} 2026</span> },
//     { key: "sent", label: "Sent", render: (r) => n(r.sent) },
//     { key: "delivered", label: "Delivered", render: (r) => n(r.delivered) },
//     { key: "read", label: "Read", render: (r) => n(r.read) },
//     { key: "failed", label: "Failed", render: (r) => n(r.failed) },
//     { key: "rate", label: "Delivery Rate", render: (r) => `${((r.delivered / r.sent) * 100).toFixed(1)}%` },
//   ];

//   return (
//     <>
//       <PageHeader title="Reports" subtitle="Monthly delivery performance">
//         <button className="btn-ghost"><Download size={16} /> Export CSV</button>
//       </PageHeader>

//       <section className="card mb-6 p-5">
//         <h3 className="mb-4 text-lg font-semibold text-brand-900">Messages sent per month</h3>
//         <div className="flex h-56 items-end gap-3 sm:gap-6">
//           {data.map((d) => (
//             <div key={d.month} className="flex flex-1 flex-col items-center gap-2">
//               <span className="text-xs text-slate-500">{n(d.sent)}</span>
//               <div
//                 className="w-full rounded-t-md bg-gradient-to-t from-brand-800 to-wa shadow-[0_0_14px_rgba(37,211,102,0.45)]"
//                 style={{ height: `${(d.sent / max) * 160}px` }}
//               />
//               <span className="text-xs text-slate-600">{d.month}</span>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="card">
//         <DataTable columns={columns} rows={data.map((d) => ({ ...d, id: d.month }))} />
//       </section>
//     </>
//   );
// }


// ============================================================================
// REPORTS PAGE – everything for this page lives in this one file
// ============================================================================
import { Download } from "lucide-react";
import useFetch from "../hooks/useFetch";
import api from "../services/api";

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

export default function Reports() {
  const { data, loading } = useFetch(api.getReports);
  if (loading) return <Loader />;

  const max = Math.max(...data.map((d) => d.sent));
  const columns = [
    { key: "month", label: "Month", render: (r) => <span className="font-medium text-slate-900">{r.month} 2026</span> },
    { key: "sent", label: "Sent", render: (r) => n(r.sent) },
    { key: "delivered", label: "Delivered", render: (r) => n(r.delivered) },
    { key: "read", label: "Read", render: (r) => n(r.read) },
    { key: "failed", label: "Failed", render: (r) => n(r.failed) },
    { key: "rate", label: "Delivery Rate", render: (r) => `${((r.delivered / r.sent) * 100).toFixed(1)}%` },
  ];

  return (
    <>
      <PageHeader title="Reports" subtitle="Monthly delivery performance">
        <button className="btn-ghost"><Download size={16} /> Export CSV</button>
      </PageHeader>

      <section className="card mb-6 p-5">
        <h3 className="mb-4 text-lg font-semibold text-brand-900">Messages sent per month</h3>
        <div className="flex h-56 items-end gap-3 sm:gap-6">
          {data.map((d) => (
            <div key={d.month} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-xs text-slate-500">{n(d.sent)}</span>
              <div
                className="w-full rounded-t-md bg-gradient-to-t from-brand-800 to-wa shadow-[0_0_14px_rgba(37,211,102,0.45)]"
                style={{ height: `${(d.sent / max) * 160}px` }}
              />
              <span className="text-xs text-slate-600">{d.month}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <DataTable columns={columns} rows={data.map((d) => ({ ...d, id: d.month }))} />
      </section>
    </>
  );
}
