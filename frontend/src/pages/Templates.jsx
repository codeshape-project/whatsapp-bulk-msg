// // ============================================================================
// // TEMPLATES PAGE – everything for this page lives in this one file
// // ============================================================================
// import { Plus, FileText } from "lucide-react";
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

// const badgeStyles = {
//   Approved: "bg-emerald-100 text-emerald-700",
//   Pending: "bg-amber-100 text-amber-700",
//   Rejected: "bg-rose-100 text-rose-700",
// };

// function StatusBadge({ status }) {
//   return (
//     <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${badgeStyles[status] || "bg-slate-100 text-slate-600"}`}>
//       {status}
//     </span>
//   );
// }

// /* ---------- the page ---------- */

// export default function Templates() {
//   const { data: templates, loading } = useFetch(api.getTemplates);
//   if (loading) return <Loader />;

//   return (
//     <>
//       <PageHeader title="Templates" subtitle="WhatsApp message templates approved by Meta">
//         <button className="btn-primary"><Plus size={16} /> New Template</button>
//       </PageHeader>

//       <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
//         {templates.map((t) => (
//           <article key={t.id} className="card flex flex-col p-5 transition hover:-translate-y-1 hover:shadow-[0_14px_30px_-12px_rgba(18,140,126,0.5)]">
//             <div className="flex items-start justify-between gap-3">
//               <div className="flex items-center gap-3">
//                 <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-wa to-brand-700 text-white shadow-[0_0_12px_rgba(37,211,102,0.5)]">
//                   <FileText size={20} />
//                 </span>
//                 <div>
//                   <h3 className="text-sm font-semibold text-slate-900">{t.name}</h3>
//                   <p className="text-xs text-slate-500">{t.category} • {t.language}</p>
//                 </div>
//               </div>
//               <StatusBadge status={t.status} />
//             </div>
//             <div className="mt-4 flex-1 rounded-lg rounded-tl-none bg-[#d9fdd3] p-3 text-sm text-slate-800">
//               {t.body}
//             </div>
//             <div className="mt-4 flex gap-2">
//               <button className="btn-ghost flex-1 py-1.5">Preview</button>
//               <button className="btn-primary flex-1 py-1.5" disabled={t.status !== "Approved"}>Use Template</button>
//             </div>
//           </article>
//         ))}
//       </div>
//     </>
//   );
// }



import { useEffect, useState } from "react";
import {
  Plus,
  FileText,
  X,
  Pencil,
  Eye,
  Trash2,
  Link as LinkIcon,
  Phone,
  MessageSquare,
  ArrowLeft,
  Save,
  Smartphone,
} from "lucide-react";

import useFetch from "../hooks/useFetch";
import api from "../services/api";

/* ---------------- Helpers ---------------- */

function Loader() {
  return (
    <div className="flex items-center justify-center gap-3 py-16 text-sm text-slate-500">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-emerald-200 border-t-emerald-700" />
      Loading templates...
    </div>
  );
}

function PageHeader({ title, subtitle, children }) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h2 className="text-2xl font-semibold text-brand-900">{title}</h2>
        {subtitle && (
          <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
        )}
      </div>
      {children && (
        <div className="flex flex-wrap items-center gap-2">{children}</div>
      )}
    </div>
  );
}

const badgeStyles = {
  Approved: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Rejected: "bg-rose-100 text-rose-700",
  Draft: "bg-slate-100 text-slate-600",
};

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
        badgeStyles[status] || badgeStyles.Draft
      }`}
    >
      {status || "Draft"}
    </span>
  );
}

const inputClass =
  "mt-1 w-full rounded-xl border border-emerald-100 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

const labelClass = "text-sm font-medium text-slate-700";

const emptyForm = {
  name: "",
  category: "Marketing",
  language: "English",
  header: "",
  body: "",
  footer: "",
  buttons: [],
};

/* ---------------- Template Editor ---------------- */

function TemplateEditor({ initialTemplate, onClose, onSave }) {
  const [form, setForm] = useState(() => ({
    ...emptyForm,
    ...(initialTemplate || {}),
    buttons: (initialTemplate?.buttons || []).map((button) => ({
      id: button.id || `${Date.now()}-${Math.random()}`,
      type: button.type || "Quick Reply",
      text: button.text || "",
      value: button.value || "",
    })),
  }));

  const [previewOpen, setPreviewOpen] = useState(true);
  const [error, setError] = useState("");

  function updateField(field, value) {
    setForm((previous) => ({ ...previous, [field]: value }));
  }

  function addButton() {
    if (form.buttons.length >= 3) {
      setError("You can add a maximum of 3 buttons in this editor.");
      return;
    }

    setError("");

    setForm((previous) => ({
      ...previous,
      buttons: [
        ...previous.buttons,
        {
          id: `${Date.now()}-${Math.random()}`,
          type: "Quick Reply",
          text: "",
          value: "",
        },
      ],
    }));
  }

  function updateButton(id, field, value) {
    setForm((previous) => ({
      ...previous,
      buttons: previous.buttons.map((button) =>
        button.id === id ? { ...button, [field]: value } : button
      ),
    }));
  }

  function removeButton(id) {
    setForm((previous) => ({
      ...previous,
      buttons: previous.buttons.filter((button) => button.id !== id),
    }));
    setError("");
  }

  function handleSave(event) {
    event.preventDefault();

    if (!form.name.trim()) {
      setError("Please enter a template name.");
      return;
    }

    if (!form.body.trim()) {
      setError("Please enter the message body.");
      return;
    }

    if (form.buttons.some((button) => !button.text.trim())) {
      setError("Please enter text for every button.");
      return;
    }

    if (
      form.buttons.some(
        (button) =>
          button.type === "URL" &&
          (!button.value.trim() ||
            !/^https?:\/\/.+/i.test(button.value.trim()))
      )
    ) {
      setError("URL buttons require a valid http:// or https:// URL.");
      return;
    }

    if (
      form.buttons.some(
        (button) =>
          button.type === "Phone Call" &&
          !button.value.replace(/\D/g, "")
      )
    ) {
      setError("Phone Call buttons require a phone number.");
      return;
    }

    onSave({
      ...form,
      name: form.name.trim(),
      body: form.body.trim(),
      header: form.header.trim(),
      footer: form.footer.trim(),
      buttons: form.buttons.map(({ id, ...button }) => button),
      id: initialTemplate?.id,
      status: initialTemplate?.status || "Draft",
    });
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 p-3 backdrop-blur-sm sm:p-6">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-2xl">
        {/* Editor header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-100 bg-white px-5 py-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-700"
              aria-label="Back to templates"
            >
              <ArrowLeft size={20} />
            </button>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {initialTemplate ? "Edit Template" : "Create Template"}
              </h2>
              <p className="text-xs text-slate-500">
                Customize your WhatsApp message and buttons
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPreviewOpen((previous) => !previous)}
              className="flex items-center gap-2 rounded-xl border border-emerald-200 px-3 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-50 lg:hidden"
            >
              <Eye size={16} />
              {previewOpen ? "Hide Preview" : "Show Preview"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-600"
              aria-label="Close editor"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSave}>
          <div className="grid lg:grid-cols-[1.25fr_0.75fr]">
            {/* Left: Editing controls */}
            <div className="space-y-6 p-5 sm:p-7">
              <section>
                <h3 className="mb-4 text-base font-semibold text-slate-900">
                  Template Details
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className={labelClass}>
                    Template Name
                    <input
                      className={inputClass}
                      placeholder="e.g. appointment_reminder"
                      value={form.name}
                      onChange={(event) =>
                        updateField("name", event.target.value)
                      }
                      required
                    />
                  </label>

                  <label className={labelClass}>
                    Category
                    <select
                      className={inputClass}
                      value={form.category}
                      onChange={(event) =>
                        updateField("category", event.target.value)
                      }
                    >
                      <option>Marketing</option>
                      <option>Utility</option>
                      <option>Authentication</option>
                    </select>
                  </label>

                  <label className={labelClass}>
                    Language
                    <select
                      className={inputClass}
                      value={form.language}
                      onChange={(event) =>
                        updateField("language", event.target.value)
                      }
                    >
                      <option>English</option>
                      <option>Hindi</option>
                      <option>English (US)</option>
                    </select>
                  </label>
                </div>
              </section>

              <section className="rounded-2xl border border-emerald-100 p-4 sm:p-5">
                <h3 className="mb-4 font-semibold text-slate-900">
                  Message Content
                </h3>

                <div className="space-y-4">
                  <label className={labelClass}>
                    Header (Optional)
                    <input
                      className={inputClass}
                      placeholder="e.g. Appointment Confirmation"
                      maxLength={60}
                      value={form.header}
                      onChange={(event) =>
                        updateField("header", event.target.value)
                      }
                    />
                  </label>

                  <label className={labelClass}>
                    Message Body
                    <textarea
                      className={`${inputClass} min-h-36 resize-y`}
                      placeholder="Hello {{1}}, your appointment is confirmed for {{2}}."
                      value={form.body}
                      onChange={(event) =>
                        updateField("body", event.target.value)
                      }
                      maxLength={1024}
                      required
                    />
                    <span className="mt-1 block text-right text-xs text-slate-500">
                      {form.body.length}/1024 characters
                    </span>
                  </label>

                  <div className="rounded-xl bg-emerald-50 p-3 text-xs leading-5 text-emerald-900">
                    <strong>Personalize your message:</strong> use placeholders
                    such as {"{{1}}"} and {"{{2}}"} for values you will provide
                    when sending the campaign.
                  </div>

                  <label className={labelClass}>
                    Footer (Optional)
                    <input
                      className={inputClass}
                      placeholder="e.g. Thank you for choosing us"
                      maxLength={60}
                      value={form.footer}
                      onChange={(event) =>
                        updateField("footer", event.target.value)
                      }
                    />
                  </label>
                </div>
              </section>

              {/* Buttons editor */}
              <section className="rounded-2xl border border-emerald-100 p-4 sm:p-5">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Interactive Buttons
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Add, edit, or remove buttons from your message.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={addButton}
                    disabled={form.buttons.length >= 3}
                    className="flex items-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Plus size={16} />
                    Add Button
                  </button>
                </div>

                {form.buttons.length === 0 && (
                  <div className="rounded-xl border border-dashed border-emerald-200 py-8 text-center">
                    <MessageSquare
                      size={24}
                      className="mx-auto mb-2 text-emerald-600"
                    />
                    <p className="text-sm font-medium text-slate-700">
                      No buttons added
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Add a quick reply, website link, or phone button.
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  {form.buttons.map((button, index) => (
                    <div
                      key={button.id}
                      className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-800">
                          Button {index + 1}
                        </span>

                        <button
                          type="button"
                          onClick={() => removeButton(button.id)}
                          className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-rose-600 hover:bg-rose-50"
                        >
                          <Trash2 size={14} />
                          Remove
                        </button>
                      </div>

                      <label className={labelClass}>
                        Button Type
                        <select
                          className={inputClass}
                          value={button.type}
                          onChange={(event) =>
                            updateButton(
                              button.id,
                              "type",
                              event.target.value
                            )
                          }
                        >
                          <option value="Quick Reply">
                            Quick Reply / Keyword
                          </option>
                          <option value="URL">CTA - URL</option>
                          <option value="Phone Call">Phone Call</option>
                        </select>
                      </label>

                      <label className={`${labelClass} mt-3 block`}>
                        Button Text
                        <input
                          className={inputClass}
                          placeholder="e.g. Contact Us"
                          maxLength={25}
                          value={button.text}
                          onChange={(event) =>
                            updateButton(
                              button.id,
                              "text",
                              event.target.value
                            )
                          }
                          required
                        />
                      </label>

                      {button.type === "URL" && (
                        <label className={`${labelClass} mt-3 block`}>
                          Website URL
                          <input
                            className={inputClass}
                            type="url"
                            placeholder="https://example.com"
                            value={button.value}
                            onChange={(event) =>
                              updateButton(
                                button.id,
                                "value",
                                event.target.value
                              )
                            }
                            required
                          />
                        </label>
                      )}

                      {button.type === "Phone Call" && (
                        <label className={`${labelClass} mt-3 block`}>
                          Phone Number
                          <input
                            className={inputClass}
                            type="tel"
                            placeholder="+91 9876543210"
                            value={button.value}
                            onChange={(event) =>
                              updateButton(
                                button.id,
                                "value",
                                event.target.value
                              )
                            }
                            required
                          />
                        </label>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {error && (
                <p
                  role="alert"
                  className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700"
                >
                  {error}
                </p>
              )}

              <div className="flex flex-wrap justify-end gap-3 border-t border-emerald-100 pt-5">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:from-emerald-700 hover:to-emerald-800"
                >
                  <Save size={16} />
                  Save Template
                </button>
              </div>
            </div>

            {/* Right: Live WhatsApp preview */}
            <div
              className={`border-t border-emerald-100 bg-[#e9e2d8] p-5 sm:p-7 lg:block lg:border-l lg:border-t-0 ${
                previewOpen ? "block" : "hidden lg:block"
              }`}
            >
              <div className="sticky top-5">
                <div className="mb-4 flex items-center gap-3 rounded-t-2xl bg-emerald-800 p-4 text-white">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600">
                    <Smartphone size={21} />
                  </span>
                  <div>
                    <h3 className="font-semibold">Preview</h3>
                    <p className="text-xs text-emerald-100">
                      Live template preview
                    </p>
                  </div>
                </div>

                <div className="min-h-80 rounded-b-2xl bg-[#efe7dc] p-4">
                  <div className="ml-auto max-w-sm overflow-hidden rounded-xl rounded-tr-none bg-[#d9fdd3] shadow-sm">
                    {form.header && (
                      <div className="px-3 pt-3 text-sm font-bold text-slate-900">
                        {form.header}
                      </div>
                    )}

                    <div className="whitespace-pre-wrap break-words px-3 py-3 text-sm leading-6 text-slate-800">
                      {form.body || "Your message will appear here..."}
                    </div>

                    {form.footer && (
                      <div className="px-3 pb-2 text-xs text-slate-500">
                        {form.footer}
                      </div>
                    )}

                    <div className="px-3 pb-2 text-right text-[10px] text-slate-500">
                      12:00 ✓✓
                    </div>

                    {form.buttons.map((button, index) => (
                      <div
                        key={button.id}
                        className="flex items-center justify-center gap-2 border-t border-emerald-200 bg-white/90 px-3 py-3 text-sm font-medium text-emerald-700"
                      >
                        {button.type === "URL" ? (
                          <LinkIcon size={15} />
                        ) : button.type === "Phone Call" ? (
                          <Phone size={15} />
                        ) : (
                          <MessageSquare size={15} />
                        )}
                        <span>
                          {button.text || `Button ${index + 1}`}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="mx-auto mt-5 max-w-xs text-center text-xs leading-5 text-slate-500">
                    This is a visual preview. Actual layout and button
                    availability depend on the WhatsApp template format and
                    Meta approval.
                  </p>
                </div>

                <div className="mt-4 rounded-xl border border-white/70 bg-white/80 p-3 text-xs leading-5 text-slate-600">
                  <strong className="text-slate-800">Template status:</strong>{" "}
                  {initialTemplate?.status || "Draft"}
                  <br />
                  Editing an approved template here does not change the
                  version approved by Meta.
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------------- Templates Page ---------------- */

export default function Templates() {
  const { data: fetchedTemplates, loading } = useFetch(api.getTemplates);

  const [templates, setTemplates] = useState([]);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [notice, setNotice] = useState("");

  // Load API data and apply saved browser-side edits.
  useEffect(() => {
    if (!fetchedTemplates) return;

    let result = Array.isArray(fetchedTemplates) ? fetchedTemplates : [];

    try {
      const saved = localStorage.getItem("whatsapp_template_edits");

      if (saved) {
        const edits = JSON.parse(saved);

        if (Array.isArray(edits)) {
          const editMap = new Map(edits.map((item) => [String(item.id), item]));

          result = result.map((item) =>
            editMap.has(String(item.id))
              ? { ...item, ...editMap.get(String(item.id)) }
              : item
          );

          const existingIds = new Set(result.map((item) => String(item.id)));

          result = [
            ...result,
            ...edits.filter((item) => !existingIds.has(String(item.id))),
          ];
        }
      }
    } catch {
      // If local storage data is invalid, continue with API data.
    }

    setTemplates(result);
  }, [fetchedTemplates]);

  function openNewEditor() {
    setEditingTemplate(null);
    setEditorOpen(true);
    setNotice("");
  }

  function openEditEditor(template) {
    setEditingTemplate(template);
    setEditorOpen(true);
    setNotice("");
  }

  function saveTemplate(template) {
    const isEditing = template.id !== undefined && template.id !== null;

    const savedTemplate = {
      ...template,
      id: isEditing ? template.id : `local-${Date.now()}`,
      status: isEditing ? template.status : "Draft",
    };

    const updated = isEditing
      ? templates.map((item) =>
          String(item.id) === String(savedTemplate.id)
            ? savedTemplate
            : item
        )
      : [savedTemplate, ...templates];

    setTemplates(updated);

    try {
      localStorage.setItem("whatsapp_template_edits", JSON.stringify(updated));
    } catch {
      setNotice(
        "Template changed for this session, but browser storage was unavailable."
      );
      setEditorOpen(false);
      return;
    }

    setEditorOpen(false);
    setEditingTemplate(null);
    setNotice(
      isEditing
        ? "Template changes saved in this browser."
        : "New draft template created successfully."
    );
  }

  function deleteTemplate(template) {
    if (
      !window.confirm(
        `Delete "${template.name}" from this application's template list?`
      )
    ) {
      return;
    }

    const updated = templates.filter(
      (item) => String(item.id) !== String(template.id)
    );

    setTemplates(updated);

    try {
      localStorage.setItem("whatsapp_template_edits", JSON.stringify(updated));
    } catch {
      setNotice("Template removed for this session only.");
      return;
    }

    setNotice("Template removed from this browser's list.");
  }

  if (loading) return <Loader />;

  return (
    <>
      <PageHeader
        title="Templates"
        subtitle="Create, customize, and preview WhatsApp message templates"
      >
        <button
          type="button"
          onClick={openNewEditor}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={16} />
          New Template
        </button>
      </PageHeader>

      {notice && (
        <div className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <span>{notice}</span>
          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {templates.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-emerald-200 bg-white p-10 text-center">
          <FileText size={36} className="mx-auto mb-3 text-emerald-600" />
          <h3 className="font-semibold text-slate-900">No templates found</h3>
          <p className="mt-1 text-sm text-slate-500">
            Create your first template to get started.
          </p>
          <button
            type="button"
            onClick={openNewEditor}
            className="btn-primary mt-4 inline-flex items-center gap-2"
          >
            <Plus size={16} />
            Create Template
          </button>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {templates.map((template) => (
            <article
              key={template.id}
              className="card flex flex-col p-5 transition hover:-translate-y-1 hover:shadow-[0_14px_30px_-12px_rgba(18,140,126,0.35)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-wa to-brand-700 text-white shadow-[0_0_12px_rgba(37,211,102,0.35)]">
                    <FileText size={20} />
                  </span>

                  <div className="min-w-0">
                    <h3 className="break-words text-sm font-semibold text-slate-900">
                      {template.name}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {template.category || "Marketing"} •{" "}
                      {template.language || "English"}
                    </p>
                  </div>
                </div>

                <StatusBadge status={template.status} />
              </div>

              <div className="mt-4 flex-1 overflow-hidden rounded-lg rounded-tl-none bg-[#d9fdd3] p-3 text-sm leading-6 text-slate-800">
                {template.header && (
                  <p className="mb-2 font-bold">{template.header}</p>
                )}

                <p className="whitespace-pre-wrap break-words">
                  {template.body || "No message content"}
                </p>

                {template.footer && (
                  <p className="mt-2 text-xs text-slate-500">
                    {template.footer}
                  </p>
                )}

                {template.buttons?.length > 0 && (
                  <div className="mt-3 space-y-2 border-t border-emerald-200 pt-3">
                    {template.buttons.map((button, index) => (
                      <div
                        key={`${template.id}-button-${index}`}
                        className="flex items-center justify-center gap-2 text-xs font-medium text-emerald-700"
                      >
                        {button.type === "URL" ? (
                          <LinkIcon size={13} />
                        ) : button.type === "Phone Call" ? (
                          <Phone size={13} />
                        ) : (
                          <MessageSquare size={13} />
                        )}
                        {button.text}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => openEditEditor(template)}
                  className="btn-ghost flex flex-1 items-center justify-center gap-2 py-2"
                >
                  <Pencil size={14} />
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => openEditEditor(template)}
                  className="btn-primary flex flex-1 items-center justify-center gap-2 py-2"
                >
                  <Eye size={14} />
                  Preview
                </button>

                <button
                  type="button"
                  onClick={() => deleteTemplate(template)}
                  className="rounded-xl border border-rose-100 px-3 text-rose-600 transition hover:bg-rose-50"
                  title="Remove template from this app"
                  aria-label={`Delete ${template.name}`}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {editorOpen && (
        <TemplateEditor
          initialTemplate={editingTemplate}
          onClose={() => {
            setEditorOpen(false);
            setEditingTemplate(null);
          }}
          onSave={saveTemplate}
        />
      )}
    </>
  );
}
