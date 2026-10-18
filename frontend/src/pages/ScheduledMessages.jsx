// // ============================================================================
// // SCHEDULED MESSAGES PAGE – everything for this page lives in this one file
// // ============================================================================
// import { CalendarClock } from "lucide-react";
// import useFetch from "../hooks/useFetch";
// import api from "../services/api";

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

// export default function ScheduledMessages() {
//   const { data, setData, loading } = useFetch(api.getScheduledMessages);
//   if (loading) return <Loader />;

//   const columns = [
//     {
//       key: "campaign", label: "Campaign",
//       render: (r) => (
//         <span className="flex items-center gap-2 font-medium text-slate-900">
//           <CalendarClock size={16} className="text-brand-700" /> {r.campaign}
//         </span>
//       ),
//     },
//     { key: "template", label: "Template", render: (r) => <span className="text-slate-500">{r.template}</span> },
//     { key: "recipients", label: "Recipients", render: (r) => r.recipients.toLocaleString("en-IN") },
//     { key: "date", label: "Scheduled For", render: (r) => `${r.date}, ${r.time}` },
//     {
//       key: "actions", label: "Actions",
//       render: (r) => (
//         <button onClick={() => setData((l) => l.filter((x) => x.id !== r.id))} className="text-sm font-medium text-rose-600 hover:underline">
//           Cancel
//         </button>
//       ),
//     },
//   ];

//   return (
//     <>
//       <PageHeader title="Scheduled Messages" subtitle="Campaigns waiting to be sent" />
//       <section className="card">
//         <DataTable columns={columns} rows={data} empty="No scheduled messages. Schedule a campaign to see it here." />
//       </section>
//     </>
//   );
// }


// ============================================================================
// SCHEDULED MESSAGES PAGE – everything for this page lives in this one file
// ============================================================================
import { CalendarClock } from "lucide-react";
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

export default function ScheduledMessages() {
  const { data, setData, loading } = useFetch(api.getScheduledMessages);
  if (loading) return <Loader />;

  const columns = [
    {
      key: "campaign", label: "Campaign",
      render: (r) => (
        <span className="flex items-center gap-2 font-medium text-slate-900">
          <CalendarClock size={16} className="text-brand-700" /> {r.campaign}
        </span>
      ),
    },
    { key: "template", label: "Template", render: (r) => <span className="text-slate-500">{r.template}</span> },
    { key: "recipients", label: "Recipients", render: (r) => r.recipients.toLocaleString("en-IN") },
    { key: "date", label: "Scheduled For", render: (r) => `${r.date}, ${r.time}` },
    {
      key: "actions", label: "Actions",
      render: (r) => (
        <button onClick={() => setData((l) => l.filter((x) => x.id !== r.id))} className="text-sm font-medium text-rose-600 hover:underline">
          Cancel
        </button>
      ),
    },
  ];

  return (
    <>
      <PageHeader title="Scheduled Messages" subtitle="Campaigns waiting to be sent" />
      <section className="card">
        <DataTable columns={columns} rows={data} empty="No scheduled messages. Schedule a campaign to see it here." />
      </section>
    </>
  );
}
