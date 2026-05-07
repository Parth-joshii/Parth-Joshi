import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Kanban, 
  Settings, 
  LogOut, 
  Search, 
  Bell,
  ChevronRight,
  Plus,
  Filter,
  MoreVertical,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  Target,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Car
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { Lead, LeadStatus, LeadSource } from './types';
import { MOCK_LEADS } from './mockData';
import { format } from 'date-fns';

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex items-center w-full gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
      active 
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" 
        : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600"
    )}
  >
    <Icon size={20} className={cn(active ? "text-white" : "group-hover:scale-110 transition-transform")} />
    <span className="font-medium">{label}</span>
    {active && <motion.div layoutId="active-pill" className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />}
  </button>
);

const StatusBadge = ({ status }: { status: LeadStatus }) => {
  const styles: Record<LeadStatus, string> = {
    'New': 'bg-blue-50 text-blue-600 border-blue-100',
    'Contacted': 'bg-amber-50 text-amber-600 border-amber-100',
    'Qualified': 'bg-emerald-50 text-emerald-600 border-emerald-100',
    'Negotiating': 'bg-purple-50 text-purple-600 border-purple-100',
    'Closed': 'bg-indigo-50 text-indigo-600 border-indigo-100',
    'Not Interested': 'bg-slate-50 text-slate-500 border-slate-100',
  };

  return (
    <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold border", styles[status])}>
      {status}
    </span>
  );
};

const PriorityBadge = ({ priority }: { priority: Lead['priority'] }) => {
  const styles = {
    'High': 'text-rose-600 bg-rose-50',
    'Medium': 'text-amber-600 bg-amber-50',
    'Low': 'text-slate-500 bg-slate-50',
  };
  return (
    <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider", styles[priority])}>
      {priority}
    </span>
  );
};

// --- Screens ---

const Dashboard = ({ leads }: { leads: Lead[] }) => {
  const statusCounts = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sourceCounts = leads.reduce((acc, lead) => {
    acc[lead.source] = (acc[lead.source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = [
    { name: 'Mon', leads: 12 },
    { name: 'Tue', leads: 19 },
    { name: 'Wed', leads: 15 },
    { name: 'Thu', leads: 22 },
    { name: 'Fri', leads: 30 },
    { name: 'Sat', leads: 25 },
    { name: 'Sun', leads: 18 },
  ];

  const sourceData = Object.entries(sourceCounts).map(([name, value]) => ({ name, value }));

  const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Leads', value: '1,284', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50', trend: '+12.5%' },
          { label: 'Conversion Rate', value: '24.2%', icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: '+3.1%' },
          { label: 'Avg. Response Time', value: '1.2h', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', trend: '-15%' },
          { label: 'Revenue Forecast', value: '₹4.2Cr', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50', trend: '+8.4%' },
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label} 
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-3 rounded-xl", stat.bg)}>
                <stat.icon className={stat.color} size={24} />
              </div>
              <span className={cn("text-xs font-bold px-2 py-1 rounded-lg", 
                stat.trend.startsWith('+') ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
              )}>
                {stat.trend}
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">Lead Inflow Trend</h3>
            <select className="text-sm border-none bg-slate-50 rounded-lg px-3 py-1 focus:ring-0">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="leads" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">Leads by Source</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {sourceData.map((s, i) => (
              <div key={s.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-slate-600">{s.name}</span>
                </div>
                <span className="font-bold text-slate-900">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const LeadListing = ({ leads, onSelectLead, onSmartAssign }: { leads: Lead[], onSelectLead: (lead: Lead) => void, onSmartAssign: () => void }) => {
  const [search, setSearch] = useState('');

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(search.toLowerCase()) || 
    l.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-bottom border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search leads by name or email..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onSmartAssign}
            className="flex items-center gap-2 px-4 py-2 text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors border border-indigo-100"
          >
            <Target size={18} />
            <span className="font-medium">Smart Assign</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-slate-600 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
            <Filter size={18} />
            <span className="font-medium">Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
            <Plus size={18} />
            <span className="font-medium">Add Lead</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider font-bold">
              <th className="px-6 py-4">Lead Info</th>
              <th className="px-6 py-4">Source</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Interested In</th>
              <th className="px-6 py-4">Created</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredLeads.map((lead) => (
              <motion.tr 
                layout
                key={lead.id} 
                className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                onClick={() => onSelectLead(lead)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                      {lead.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-slate-900">{lead.name}</p>
                        <PriorityBadge priority={lead.priority} />
                      </div>
                      <p className="text-xs text-slate-500">{lead.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-600 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    {lead.source}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={lead.status} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Car size={14} className="text-indigo-500" />
                    {lead.interestedModel || 'Not Specified'}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-600">{format(new Date(lead.createdAt), 'MMM d, yyyy')}</p>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const LeadManagement = ({ leads, onUpdateStatus }: { leads: Lead[], onUpdateStatus: (id: string, status: LeadStatus) => void }) => {
  const columns: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Negotiating', 'Closed'];
  
  return (
    <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
      {columns.map((status) => (
        <div key={status} className="flex-shrink-0 w-80">
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-800">{status}</h3>
              <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-1.5 py-0.5 rounded">
                {leads.filter(l => l.status === status).length}
              </span>
            </div>
            <button className="p-1 text-slate-400 hover:text-indigo-600 transition-colors">
              <Plus size={18} />
            </button>
          </div>
          
          <div className="space-y-4 min-h-[500px] bg-slate-50/50 p-3 rounded-2xl border border-dashed border-slate-200">
            {leads.filter(l => l.status === status).map((lead) => (
              <motion.div 
                layoutId={lead.id}
                key={lead.id}
                className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing"
              >
                <div className="flex justify-between items-start mb-2">
                  <PriorityBadge priority={lead.priority} />
                  <div className="flex gap-1">
                    {status !== 'Closed' && (
                      <button 
                        onClick={() => {
                          const nextStatus: Record<LeadStatus, LeadStatus> = {
                            'New': 'Contacted',
                            'Contacted': 'Qualified',
                            'Qualified': 'Negotiating',
                            'Negotiating': 'Closed',
                            'Closed': 'Closed',
                            'Not Interested': 'Not Interested'
                          };
                          onUpdateStatus(lead.id, nextStatus[status]);
                        }}
                        className="p-1 hover:bg-indigo-50 text-indigo-600 rounded"
                      >
                        <ChevronRight size={12} />
                      </button>
                    )}
                  </div>
                </div>
                <h4 className="font-bold text-slate-900 mb-1">{lead.name}</h4>
                <p className="text-xs text-slate-500 mb-3 line-clamp-1">{lead.interestedModel}</p>
                
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-50">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-indigo-600">
                      {lead.name.charAt(0)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                      <Phone size={14} />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                      <Mail size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const LeadDetails = ({ lead, onClose, onUpdateStatus }: { lead: Lead, onClose: () => void, onUpdateStatus: (status: LeadStatus) => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className="fixed inset-y-0 right-0 w-full max-w-2xl bg-white shadow-2xl z-50 flex flex-col border-l border-slate-100"
    >
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-colors text-slate-500">
            <ChevronRight className="rotate-180" size={20} />
          </button>
          <h2 className="text-xl font-bold text-slate-900">Lead Details</h2>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={lead.status}
            onChange={(e) => onUpdateStatus(e.target.value as LeadStatus)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors outline-none border-none"
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Negotiating">Negotiating</option>
            <option value="Closed">Closed</option>
            <option value="Not Interested">Not Interested</option>
          </select>
          <button className="p-2 text-slate-400 hover:text-slate-600">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="flex items-start gap-6 mb-8">
          <div className="w-20 h-20 rounded-3xl bg-indigo-600 flex items-center justify-center text-3xl text-white font-bold shadow-xl shadow-indigo-100">
            {lead.name.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-slate-900">{lead.name}</h1>
              <StatusBadge status={lead.status} />
            </div>
            <p className="text-slate-500 flex items-center gap-2 mb-4">
              <Mail size={14} /> {lead.email}
            </p>
            <div className="flex flex-wrap gap-2">
              <div className="px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-2">
                <Phone size={12} /> {lead.phone}
              </div>
              <div className="px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-2">
                <Calendar size={12} /> Created {format(new Date(lead.createdAt), 'MMM d, yyyy')}
              </div>
              <div className="px-3 py-1.5 bg-indigo-50 rounded-lg text-xs font-bold text-indigo-600 flex items-center gap-2">
                <Target size={12} /> Source: {lead.source}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Interested Model</p>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-xl shadow-sm">
                <Car className="text-indigo-600" size={20} />
              </div>
              <p className="font-bold text-slate-800">{lead.interestedModel || 'Not Specified'}</p>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Priority Level</p>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-xl shadow-sm">
                <AlertCircle className="text-amber-600" size={20} />
              </div>
              <p className="font-bold text-slate-800">{lead.priority}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Clock size={18} className="text-indigo-600" />
              Activity Log
            </h3>
            <div className="space-y-4 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              {lead.notes.map((note, i) => (
                <div key={i} className="relative pl-10">
                  <div className="absolute left-2.5 top-1.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-indigo-600 z-10" />
                  <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                    <p className="text-sm text-slate-700">{note}</p>
                    <p className="text-[10px] text-slate-400 mt-2 font-medium">March 12, 2024 • 10:30 AM</p>
                  </div>
                </div>
              ))}
              <div className="relative pl-10">
                <div className="absolute left-2.5 top-1.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-emerald-500 z-10" />
                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                  <p className="text-sm text-emerald-800 font-medium">Lead Created via {lead.source}</p>
                  <p className="text-[10px] text-emerald-600 mt-2 font-medium">{format(new Date(lead.createdAt), 'MMM d, yyyy • h:mm a')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-slate-100 bg-slate-50/50">
        <div className="flex gap-3">
          <input 
            type="text" 
            placeholder="Add a note or update..." 
            className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
          />
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">
            Send
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'listing' | 'management'>('dashboard');
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [notifications, setNotifications] = useState(3);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const updateLeadStatus = (leadId: string, newStatus: LeadStatus) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
    if (selectedLead?.id === leadId) {
      setSelectedLead(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const handleSmartAssign = () => {
    const unassigned = leads.filter(l => l.status === 'New');
    if (unassigned.length === 0) return;
    
    setLeads(prev => prev.map(l => 
      l.status === 'New' ? { ...l, status: 'Contacted', notes: [...l.notes, 'Auto-assigned to Sales Rep via SmartAssign'] } : l
    ));
    setNotifications(0);
    alert(`Successfully assigned ${unassigned.length} new leads to the sales team!`);
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-900 font-sans relative overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-100 flex flex-col p-6 z-50 transition-transform duration-300 lg:relative lg:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between mb-10 px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <Car className="text-white" size={24} />
            </div>
            <div>
              <h1 className="font-black text-xl tracking-tight text-slate-900">HSR <span className="text-indigo-600">DriveHub</span></h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lead Management</p>
            </div>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-slate-400 hover:text-slate-600">
            <XCircle size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }} 
          />
          <SidebarItem 
            icon={Users} 
            label="Lead Listing" 
            active={activeTab === 'listing'} 
            onClick={() => { setActiveTab('listing'); setIsSidebarOpen(false); }} 
          />
          <SidebarItem 
            icon={Kanban} 
            label="Lead Management" 
            active={activeTab === 'management'} 
            onClick={() => { setActiveTab('management'); setIsSidebarOpen(false); }} 
          />
          <div className="pt-6 pb-2 px-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System</p>
          </div>
          <SidebarItem icon={Settings} label="Settings" onClick={() => {}} />
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100">
          <div className="flex items-center gap-3 px-2 mb-6">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">
              JS
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">John Sales</p>
              <p className="text-xs text-slate-500">Sales Executive</p>
            </div>
          </div>
          <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all group">
            <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors"
            >
              <LayoutDashboard size={24} />
            </button>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-slate-900">
                {activeTab === 'dashboard' && 'Business Overview'}
                {activeTab === 'listing' && 'All Leads'}
                {activeTab === 'management' && 'Pipeline Management'}
              </h2>
              <p className="text-[10px] md:text-xs text-slate-500 hidden sm:block">Welcome back, John! You have {notifications} new leads today.</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <button className="p-2.5 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors relative">
                <Bell size={20} />
                {notifications > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
                )}
              </button>
            </div>
            <div className="h-8 w-px bg-slate-100" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900">HSR Motors</p>
                <p className="text-[10px] font-bold text-emerald-600 uppercase">Live Sync Active</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center">
                <Car size={20} className="text-slate-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'dashboard' && <Dashboard leads={leads} />}
                {activeTab === 'listing' && (
                  <LeadListing 
                    leads={leads} 
                    onSelectLead={setSelectedLead} 
                    onSmartAssign={handleSmartAssign}
                  />
                )}
                {activeTab === 'management' && (
                  <LeadManagement 
                    leads={leads} 
                    onUpdateStatus={updateLeadStatus} 
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Lead Details Drawer */}
      <AnimatePresence>
        {selectedLead && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLead(null)}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
            />
            <LeadDetails 
              lead={selectedLead} 
              onClose={() => setSelectedLead(null)} 
              onUpdateStatus={(status) => updateLeadStatus(selectedLead.id, status)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
