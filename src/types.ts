export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Negotiating' | 'Closed' | 'Not Interested';

export type LeadSource = 'Facebook' | 'Twitter' | 'Google' | 'Website' | 'Offline' | 'Referral';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: LeadSource;
  status: LeadStatus;
  createdAt: string;
  lastContacted?: string;
  interestedModel?: string;
  assignedTo?: string;
  notes: string[];
  priority: 'Low' | 'Medium' | 'High';
}

export interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  conversionRate: number;
  revenueForecast: number;
}
