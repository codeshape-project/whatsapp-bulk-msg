
import { useState } from "react";
import { Plus, X, Send, CalendarClock, Save, Eye, Users } from "lucide-react";
import useFetch from "../hooks/useFetch";
import api from "../services/api";
import { templates as allTemplates, contactGroups, contacts as allContacts } from "../data/dummyData";

const initialForm = {
  name: "",
  template: "",
  group: "All Contacts",
  scheduledAt: "",
};

function Button({ children, onClick, variant = "secondary", type = "button", disabled = false }) {
  const styles = {
    primary: "bg-emerald-700 text-white hover:bg-emerald-800",
    secondary: "border border-emerald-200 bg-white text-emerald-900 hover:bg-emerald-50",
    schedule: "bg-blue-700 text-white hover:bg-blue-800",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]}`}
    >
      {children}
    </button>
  );
}

export default function Campaigns() {
  const { data: campaigns, setData, loading } = useFetch(api.getCampaigns);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [action, setAction] = useState("draft");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const approvedTemplates = allTemplates.filter(
    (template) => template.status === "Approved"
  );

  const selectedTemplate = approvedTemplates.find(
    (template) => template.name === form.template
  );

  const activeContacts = allContacts.filter(
    (contact) => contact.status === "Active"
  );

  const recipients = form.group === "All Contacts"
    ? activeContacts
    : activeContacts.filter((contact) => contact.group === form.group);

  const update = (key, value) =>
    setForm((previous) => ({ ...previous, [key]: value }));

  const openModal = () => {
    setForm({
      ...initialForm,
      template: approvedTemplates[0]?.name || "",
    });
    setAction("draft");
    setError("");
    setModalOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setNotice("");

    if (!form.name.trim()) {
      setError("Please enter a campaign name.");
      return;
    }

    if (!selectedTemplate) {
      setError("Please select an approved template.");
      return;
    }

    if (recipients.length === 0) {
      setError("No active contacts found in this group.");
      return;
    }

    if (action === "schedule") {
      if (!form.scheduledAt) {
        setError("Please select the date and time for scheduling.");
        return;
      }

      if (new Date(form.scheduledAt).getTime() <= Date.now()) {
        setError("Please select a future date and time.");
        return;
      }
    }

    const status = action === "schedule"
      ? "Scheduled"
      : action === "send"
        ? "Running"
        : "Draft";

    const campaign = {
      id: Date.now(),
      name: form.name.trim(),
      template: selectedTemplate.name,
      group: form.group,
      recipients: recipients.length,
      sent: 0,
      delivered: 0,
      read: 0,
      failed: 0,
      status,
      scheduledAt: action === "schedule" ? form.scheduledAt : null,
      date: new Date().toLocaleDateString("en-IN"),
    };

    // Demo only: this does not send or schedule a real WhatsApp message.
    setData((previous) => [campaign, ...(previous || [])]);
    setModalOpen(false);
    setForm(initialForm);

    setNotice(
      action === "send"
        ? "Campaign created in demo mode. Real WhatsApp messages have not been sent."
        : action === "schedule"
          ? "Campaign saved as scheduled in demo mode. Automatic delivery requires a backend scheduler."
          : "Campaign saved as a draft."
    );
  };

  if (loading) {
    return <div className="py-12 text-center text-emerald-800">Loading campaigns...</div>;
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-emerald-950">Campaigns</h2>
          <p className="mt-1 text-sm text-slate-600">
            Create, send, schedule, and manage WhatsApp campaigns.
          </p>
        </div>

        <Button variant="primary" onClick={openModal}>
          <Plus size={17} /> New Campaign
        </Button>
      </div>

      {notice && (
        <div className="flex items-start justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
          <p>{notice}</p>
          <button onClick={() => setNotice("")} aria-label="Dismiss">
            <X size={17} />
          </button>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
        <div className="border-b border-emerald-100 px-5 py-4">
          <h3 className="font-semibold text-emerald-950">Campaign History</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-emerald-50 text-emerald-950">
              <tr>
                {["Campaign", "Template", "Recipients", "Sent", "Delivered", "Read", "Failed", "Status", "Schedule"].map((heading) => (
                  <th key={heading} className="px-4 py-3 font-semibold">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-50">
              {(campaigns || []).length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-slate-500">
                    No campaigns yet. Click New Campaign to begin.
                  </td>
                </tr>
              ) : (
                campaigns.map((campaign, index) => (
                  <tr key={campaign.id || index} className="hover:bg-emerald-50/40">
                    <td className="px-4 py-3 font-medium text-emerald-950">{campaign.name}</td>
                    <td className="px-4 py-3">{campaign.template || "—"}</td>
                    <td className="px-4 py-3">{campaign.recipients ?? 0}</td>
                    <td className="px-4 py-3">{campaign.sent ?? 0}</td>
                    <td className="px-4 py-3">{campaign.delivered ?? 0}</td>
                    <td className="px-4 py-3">{campaign.read ?? 0}</td>
                    <td className="px-4 py-3">{campaign.failed ?? 0}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800">
                        {campaign.status || "Draft"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-600">
                      {campaign.scheduledAt
                        ? new Date(campaign.scheduledAt).toLocaleString("en-IN")
                        : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="my-auto max-h-[94vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-emerald-100 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-emerald-100 px-5 py-4">
              <div>
                <h3 className="text-lg font-bold text-emerald-950">New Campaign</h3>
                <p className="text-xs text-slate-500">Configure your message and delivery time</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-emerald-50"
                aria-label="Close"
              >
                <X size={19} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-5">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-800">Campaign Name *</label>
                <input
                  className="w-full rounded-xl border border-emerald-200 px-3 py-2.5 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  placeholder="e.g. Festival Offer"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-800">WhatsApp Template *</label>
                <select
                  className="w-full rounded-xl border border-emerald-200 px-3 py-2.5 outline-none focus:border-emerald-600"
                  value={form.template}
                  onChange={(e) => update("template", e.target.value)}
                  required
                >
                  <option value="">Choose approved template</option>
                  {approvedTemplates.map((template) => (
                    <option key={template.id || template.name} value={template.name}>
                      {template.name}
                    </option>
                  ))}
                </select>

                {selectedTemplate && (
                  <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-950">
                      <Eye size={16} /> Message Preview
                    </div>
                    <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                      {selectedTemplate.body || selectedTemplate.content || "Template body is not available in demo data."}
                    </p>
                    <p className="mt-2 text-xs text-slate-500">
                      {selectedTemplate.category || "Template"} · {selectedTemplate.language || "Language not specified"}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-800">Contact Group *</label>
                <select
                  className="w-full rounded-xl border border-emerald-200 px-3 py-2.5 outline-none focus:border-emerald-600"
                  value={form.group}
                  onChange={(e) => update("group", e.target.value)}
                >
                  <option value="All Contacts">All Contacts</option>
                  {contactGroups.map((group) => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>

                <div className="mt-3 flex items-center gap-3 rounded-xl bg-emerald-50 p-3">
                  <Users className="text-emerald-800" size={20} />
                  <div>
                    <p className="text-sm font-semibold text-emerald-950">
                      {recipients.length} active recipient(s)
                    </p>
                    <p className="text-xs text-slate-500">Based on the selected group in demo data</p>
                  </div>
                </div>
              </div>

              {action === "schedule" && (
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-800">Schedule Date & Time *</label>
                  <input
                    type="datetime-local"
                    className="w-full rounded-xl border border-emerald-200 px-3 py-2.5 outline-none focus:border-emerald-600"
                    min={new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16)}
                    value={form.scheduledAt}
                    onChange={(e) => update("scheduledAt", e.target.value)}
                    required
                  />
                  <p className="mt-1 text-xs text-slate-500">
                    Choose a future date and time.
                  </p>
                </div>
              )}

              {error && (
                <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
                  {error}
                </div>
              )}

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">
                Demo mode: these buttons save campaign records only. Real sending and automatic scheduling require the backend, a scheduler, and Meta WhatsApp Cloud API configuration.
              </div>

              <div className="flex flex-wrap justify-end gap-2 border-t border-emerald-100 pt-4">
                <Button onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => {
                    setAction("draft");
                    document.getElementById("campaign-action-submit")?.click();
                  }}
                >
                  <Save size={16} /> Save Draft
                </Button>

                <Button
                  variant="schedule"
                  onClick={() => {
                    setAction("schedule");
                    if (!form.scheduledAt) {
                      setError("Select a future date and time, then click Schedule Message again.");
                      return;
                    }
                    document.getElementById("campaign-action-submit")?.click();
                  }}
                >
                  <CalendarClock size={16} /> Schedule Message
                </Button>

                <Button
                  variant="primary"
                  onClick={() => {
                    setAction("send");
                    document.getElementById("campaign-action-submit")?.click();
                  }}
                >
                  <Send size={16} /> Send Now
                </Button>
              </div>

              <button id="campaign-action-submit" type="submit" className="hidden">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
