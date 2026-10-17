// Dummy API layer. Every function returns a Promise with mock data after a short delay.
// To connect a real backend later, replace the body of each function with fetch/axios calls
// (for example: `return fetch(`${BASE_URL}/contacts`).then((r) => r.json())`).

import {
  stats, trend, recentCampaigns, recentActivity, contacts, contactGroups,
  templates, campaigns, scheduledMessages, reportSummary,
} from "../data/dummyData";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const delay = (data, ms = 300) =>
  new Promise((resolve) => setTimeout(() => resolve(structuredClone(data)), ms));

export const api = {
  baseUrl: BASE_URL,
  getDashboardStats: () => delay(stats),
  getMessageTrend: () => delay(trend),
  getRecentCampaigns: () => delay(recentCampaigns),
  getRecentActivity: () => delay(recentActivity),
  getContacts: () => delay(contacts),
  getContactGroups: () => delay(contactGroups, 0),
  getTemplates: () => delay(templates),
  getCampaigns: () => delay(campaigns),
  getScheduledMessages: () => delay(scheduledMessages),
  getReports: () => delay(reportSummary),
};

export default api;
