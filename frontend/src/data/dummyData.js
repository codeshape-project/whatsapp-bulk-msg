// // All data in this file is dummy data. Replace with real API responses later.

// export const HOSPITAL = {
//   name: "Codeshape Hospital",
//   tagline: "WhatsApp Bulk Messaging System",
//   location: "Varanasi, Uttar Pradesh",
// };

// export const stats = {
//   totalContacts: 5000,
//   totalMessages: 4850,
//   delivered: 4607,
//   read: 3984,
//   failed: 250,
//   contactsGrowth: 12,
//   messagesGrowth: 18,
//   deliveryRate: 95.0,
//   readRate: 82.2,
//   failureRate: 5.2,
// };

// export const trend = [
//   { day: "Jun 23", value: 400 },
//   { day: "Jun 24", value: 490 },
//   { day: "Jun 25", value: 600 },
//   { day: "Jun 26", value: 700 },
//   { day: "Jun 27", value: 800 },
//   { day: "Jun 28", value: 870 },
//   { day: "Jun 29", value: 780 },
// ];

// export const recentCampaigns = [
//   { id: 1, name: "Appointment Reminder", template: "appointment_reminder", recipients: 1000, sent: 1000, delivered: 950, read: 820, failed: 50, status: "Completed", date: "29 Jun 2026", time: "10:00 AM" },
//   { id: 2, name: "Health Checkup Camp", template: "health_checkup", recipients: 2000, sent: 1980, delivered: 1870, read: 1650, failed: 110, status: "Completed", date: "27 Jun 2026", time: "04:30 PM" },
//   { id: 3, name: "Vaccination Reminder", template: "vaccination_reminder", recipients: 500, sent: 500, delivered: 480, read: 410, failed: 20, status: "Completed", date: "25 Jun 2026", time: "09:15 AM" },
//   { id: 4, name: "Follow Up Consultation", template: "follow_up", recipients: 800, sent: 760, delivered: 710, read: 620, failed: 50, status: "Completed", date: "22 Jun 2026", time: "02:20 PM" },
// ];

// export const recentActivity = [
//   { id: 1, type: "delivered", text: "Message delivered to +91 9876543210", sub: "Appointment Reminder", time: "10:24 AM" },
//   { id: 2, type: "read", text: "Message read by +91 8765432109", sub: "Health Checkup Reminder", time: "09:58 AM" },
//   { id: 3, type: "failed", text: "Message failed to +91 7654321098", sub: "Vaccination Reminder", time: "09:42 AM" },
//   { id: 4, type: "completed", text: "Campaign completed", sub: "Follow Up Consultation", time: "08:30 AM" },
//   { id: 5, type: "scheduled", text: "New campaign scheduled", sub: "Dental Checkup Reminder", time: "Yesterday, 05:15 PM" },
// ];

// export const contacts = [
//   { id: 1, name: "Rahul Verma", phone: "+91 98765 43210", email: "rahul.verma@example.com", group: "Appointments", status: "Active", lastMessage: "29 Jun 2026" },
//   { id: 2, name: "Priya Sharma", phone: "+91 87654 32109", email: "priya.sharma@example.com", group: "Vaccination", status: "Active", lastMessage: "28 Jun 2026" },
//   { id: 3, name: "Amit Singh", phone: "+91 76543 21098", email: "amit.singh@example.com", group: "Health Checkup", status: "Inactive", lastMessage: "25 Jun 2026" },
//   { id: 4, name: "Neha Gupta", phone: "+91 99887 76655", email: "neha.gupta@example.com", group: "Follow Up", status: "Active", lastMessage: "27 Jun 2026" },
//   { id: 5, name: "Sanjay Mishra", phone: "+91 91234 56780", email: "sanjay.mishra@example.com", group: "Appointments", status: "Active", lastMessage: "26 Jun 2026" },
//   { id: 6, name: "Anjali Tiwari", phone: "+91 90909 80807", email: "anjali.tiwari@example.com", group: "Dental", status: "Active", lastMessage: "24 Jun 2026" },
//   { id: 7, name: "Vikas Yadav", phone: "+91 93456 12345", email: "vikas.yadav@example.com", group: "Health Checkup", status: "Inactive", lastMessage: "20 Jun 2026" },
//   { id: 8, name: "Pooja Pandey", phone: "+91 98111 22334", email: "pooja.pandey@example.com", group: "Vaccination", status: "Active", lastMessage: "29 Jun 2026" },
//   { id: 9, name: "Manoj Kumar", phone: "+91 97000 11223", email: "manoj.kumar@example.com", group: "Follow Up", status: "Active", lastMessage: "23 Jun 2026" },
//   { id: 10, name: "Kavita Joshi", phone: "+91 96543 21870", email: "kavita.joshi@example.com", group: "Appointments", status: "Active", lastMessage: "22 Jun 2026" },
// ];

// export const contactGroups = ["Appointments", "Vaccination", "Health Checkup", "Follow Up", "Dental"];

// export const templates = [
//   { id: 1, name: "appointment_reminder", category: "Utility", language: "English", status: "Approved", body: "Hello {{1}}, your appointment with {{2}} is scheduled on {{3}}. For any changes, please contact our hospital. Thank you!" },
//   { id: 2, name: "health_checkup", category: "Marketing", language: "English", status: "Approved", body: "Hi {{1}}, our free health checkup camp is on {{2}}. Register now at the reception." },
//   { id: 3, name: "vaccination_reminder", category: "Utility", language: "Hindi", status: "Approved", body: "नमस्ते {{1}}, आपके बच्चे का टीकाकरण {{2}} को निर्धारित है।" },
//   { id: 4, name: "follow_up", category: "Utility", language: "English", status: "Approved", body: "Hello {{1}}, this is a reminder for your follow up consultation on {{2}}." },
//   { id: 5, name: "dental_checkup", category: "Marketing", language: "English", status: "Pending", body: "Hi {{1}}, it's time for your dental checkup. Book your slot today." },
//   { id: 6, name: "lab_report_ready", category: "Utility", language: "English", status: "Rejected", body: "Hello {{1}}, your lab report is ready. Please collect it from the lab counter." },
// ];

// export const campaigns = [
//   ...recentCampaigns,
//   { id: 5, name: "Dental Checkup Reminder", template: "dental_checkup", recipients: 600, sent: 0, delivered: 0, read: 0, failed: 0, status: "Scheduled", date: "01 Jul 2026", time: "10:00 AM" },
//   { id: 6, name: "Diwali Health Offer", template: "health_checkup", recipients: 3000, sent: 1200, delivered: 1130, read: 700, failed: 70, status: "Running", date: "30 Jun 2026", time: "11:00 AM" },
// ];

// export const scheduledMessages = [
//   { id: 1, campaign: "Dental Checkup Reminder", template: "dental_checkup", recipients: 600, date: "01 Jul 2026", time: "10:00 AM" },
//   { id: 2, campaign: "Eye Camp Invitation", template: "health_checkup", recipients: 1200, date: "03 Jul 2026", time: "09:00 AM" },
//   { id: 3, campaign: "Monsoon Health Tips", template: "follow_up", recipients: 2500, date: "05 Jul 2026", time: "06:30 PM" },
// ];

// export const reportSummary = [
//   { month: "Jan", sent: 3200, delivered: 3010, read: 2500, failed: 190 },
//   { month: "Feb", sent: 3600, delivered: 3420, read: 2880, failed: 180 },
//   { month: "Mar", sent: 4100, delivered: 3890, read: 3300, failed: 210 },
//   { month: "Apr", sent: 4400, delivered: 4180, read: 3560, failed: 220 },
//   { month: "May", sent: 4600, delivered: 4370, read: 3720, failed: 230 },
//   { month: "Jun", sent: 4850, delivered: 4607, read: 3984, failed: 250 },
// ];


// All data in this file is dummy data. Replace with real API responses later.

export const ORGANIZATIONS = [
  { id: "codeshape-hospital", name: "Codeshape Hospital", type: "Hospital", location: "Varanasi, Uttar Pradesh", initials: "CH" },
  { id: "codeshape-school", name: "Codeshape School", type: "School", location: "Varanasi, Uttar Pradesh", initials: "CS" },
  { id: "codeshape-hotel", name: "Codeshape Hotel", type: "Hotel", location: "Varanasi, Uttar Pradesh", initials: "CH" },
  { id: "codeshape-business", name: "Codeshape Business", type: "Business", location: "Varanasi, Uttar Pradesh", initials: "CB" },
];

export const HOSPITAL = {
  name: "Codeshape Hospital",
  tagline: "WhatsApp Bulk Messaging System",
  location: "Varanasi, Uttar Pradesh",
};

export const DEFAULT_MASTER_ITEMS = {
  Hospital: ["OPD", "IPD", "PRO", "Emergency", "Laboratory", "Radiology", "Pharmacy"],
  School: ["Admissions", "Classes", "Sections", "Examinations", "Transport"],
  Hotel: ["Reservations", "Housekeeping", "Rooms", "Guest Services"],
  Business: ["Sales", "Customer Support", "Marketing", "Branches", "Products"],
};

export const stats = {
  totalContacts: 5000,
  totalMessages: 4850,
  delivered: 4607,
  read: 3984,
  failed: 250,
  contactsGrowth: 12,
  messagesGrowth: 18,
  deliveryRate: 95.0,
  readRate: 82.2,
  failureRate: 5.2,
};

export const trend = [
  { day: "Jun 23", value: 400 },
  { day: "Jun 24", value: 490 },
  { day: "Jun 25", value: 600 },
  { day: "Jun 26", value: 700 },
  { day: "Jun 27", value: 800 },
  { day: "Jun 28", value: 870 },
  { day: "Jun 29", value: 780 },
];

export const recentCampaigns = [
  { id: 1, name: "Appointment Reminder", template: "appointment_reminder", recipients: 1000, sent: 1000, delivered: 950, read: 820, failed: 50, status: "Completed", date: "29 Jun 2026", time: "10:00 AM" },
  { id: 2, name: "Health Checkup Camp", template: "health_checkup", recipients: 2000, sent: 1980, delivered: 1870, read: 1650, failed: 110, status: "Completed", date: "27 Jun 2026", time: "04:30 PM" },
  { id: 3, name: "Vaccination Reminder", template: "vaccination_reminder", recipients: 500, sent: 500, delivered: 480, read: 410, failed: 20, status: "Completed", date: "25 Jun 2026", time: "09:15 AM" },
  { id: 4, name: "Follow Up Consultation", template: "follow_up", recipients: 800, sent: 760, delivered: 710, read: 620, failed: 50, status: "Completed", date: "22 Jun 2026", time: "02:20 PM" },
];

export const recentActivity = [
  { id: 1, type: "delivered", text: "Message delivered to +91 9876543210", sub: "Appointment Reminder", time: "10:24 AM" },
  { id: 2, type: "read", text: "Message read by +91 8765432109", sub: "Health Checkup Reminder", time: "09:58 AM" },
  { id: 3, type: "failed", text: "Message failed to +91 7654321098", sub: "Vaccination Reminder", time: "09:42 AM" },
  { id: 4, type: "completed", text: "Campaign completed", sub: "Follow Up Consultation", time: "08:30 AM" },
  { id: 5, type: "scheduled", text: "New campaign scheduled", sub: "Dental Checkup Reminder", time: "Yesterday, 05:15 PM" },
];

export const contacts = [
  { id: 1, name: "Rahul Verma", phone: "+91 98765 43210", email: "rahul.verma@example.com", group: "Appointments", status: "Active", lastMessage: "29 Jun 2026" },
  { id: 2, name: "Priya Sharma", phone: "+91 87654 32109", email: "priya.sharma@example.com", group: "Vaccination", status: "Active", lastMessage: "28 Jun 2026" },
  { id: 3, name: "Amit Singh", phone: "+91 76543 21098", email: "amit.singh@example.com", group: "Health Checkup", status: "Inactive", lastMessage: "25 Jun 2026" },
  { id: 4, name: "Neha Gupta", phone: "+91 99887 76655", email: "neha.gupta@example.com", group: "Follow Up", status: "Active", lastMessage: "27 Jun 2026" },
  { id: 5, name: "Sanjay Mishra", phone: "+91 91234 56780", email: "sanjay.mishra@example.com", group: "Appointments", status: "Active", lastMessage: "26 Jun 2026" },
  { id: 6, name: "Anjali Tiwari", phone: "+91 90909 80807", email: "anjali.tiwari@example.com", group: "Dental", status: "Active", lastMessage: "24 Jun 2026" },
  { id: 7, name: "Vikas Yadav", phone: "+91 93456 12345", email: "vikas.yadav@example.com", group: "Health Checkup", status: "Inactive", lastMessage: "20 Jun 2026" },
  { id: 8, name: "Pooja Pandey", phone: "+91 98111 22334", email: "pooja.pandey@example.com", group: "Vaccination", status: "Active", lastMessage: "29 Jun 2026" },
  { id: 9, name: "Manoj Kumar", phone: "+91 97000 11223", email: "manoj.kumar@example.com", group: "Follow Up", status: "Active", lastMessage: "23 Jun 2026" },
  { id: 10, name: "Kavita Joshi", phone: "+91 96543 21870", email: "kavita.joshi@example.com", group: "Appointments", status: "Active", lastMessage: "22 Jun 2026" },
];

export const contactGroups = ["Appointments", "Vaccination", "Health Checkup", "Follow Up", "Dental"];

export const templates = [
  { id: 1, name: "appointment_reminder", category: "Utility", language: "English", status: "Approved", body: "Hello {{1}}, your appointment with {{2}} is scheduled on {{3}}. For any changes, please contact our hospital. Thank you!" },
  { id: 2, name: "health_checkup", category: "Marketing", language: "English", status: "Approved", body: "Hi {{1}}, our free health checkup camp is on {{2}}. Register now at the reception." },
  { id: 3, name: "vaccination_reminder", category: "Utility", language: "Hindi", status: "Approved", body: "नमस्ते {{1}}, आपके बच्चे का टीकाकरण {{2}} को निर्धारित है।" },
  { id: 4, name: "follow_up", category: "Utility", language: "English", status: "Approved", body: "Hello {{1}}, this is a reminder for your follow up consultation on {{2}}." },
  { id: 5, name: "dental_checkup", category: "Marketing", language: "English", status: "Pending", body: "Hi {{1}}, it's time for your dental checkup. Book your slot today." },
  { id: 6, name: "lab_report_ready", category: "Utility", language: "English", status: "Rejected", body: "Hello {{1}}, your lab report is ready. Please collect it from the lab counter." },
];

export const campaigns = [
  ...recentCampaigns,
  { id: 5, name: "Dental Checkup Reminder", template: "dental_checkup", recipients: 600, sent: 0, delivered: 0, read: 0, failed: 0, status: "Scheduled", date: "01 Jul 2026", time: "10:00 AM" },
  { id: 6, name: "Diwali Health Offer", template: "health_checkup", recipients: 3000, sent: 1200, delivered: 1130, read: 700, failed: 70, status: "Running", date: "30 Jun 2026", time: "11:00 AM" },
];

export const scheduledMessages = [
  { id: 1, campaign: "Dental Checkup Reminder", template: "dental_checkup", recipients: 600, date: "01 Jul 2026", time: "10:00 AM" },
  { id: 2, campaign: "Eye Camp Invitation", template: "health_checkup", recipients: 1200, date: "03 Jul 2026", time: "09:00 AM" },
  { id: 3, campaign: "Monsoon Health Tips", template: "follow_up", recipients: 2500, date: "05 Jul 2026", time: "06:30 PM" },
];

export const reportSummary = [
  { month: "Jan", sent: 3200, delivered: 3010, read: 2500, failed: 190 },
  { month: "Feb", sent: 3600, delivered: 3420, read: 2880, failed: 180 },
  { month: "Mar", sent: 4100, delivered: 3890, read: 3300, failed: 210 },
  { month: "Apr", sent: 4400, delivered: 4180, read: 3560, failed: 220 },
  { month: "May", sent: 4600, delivered: 4370, read: 3720, failed: 230 },
  { month: "Jun", sent: 4850, delivered: 4607, read: 3984, failed: 250 },
];
