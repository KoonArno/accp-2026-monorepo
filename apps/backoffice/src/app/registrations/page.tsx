'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout';
import {
    IconUsers,
    IconBuilding,
    IconTools,
    IconConfetti,
    IconSearch,
    IconEye,
    IconCheck,
    IconMail,
    IconX,
    IconPrinter,
    IconDownload,
    IconUserPlus,
} from '@tabler/icons-react';

// Mock registration data with more details
const mockRegistrations = [
    { id: 1, code: 'REG-001', firstName: 'Dr. Somchai', lastName: 'Jaidee', email: 'somchai@hospital.com', phone: '081-234-5678', role: 'thai-pharmacy', tickets: ['conference', 'preconference', 'gala'], total: '฿8,500', status: 'confirmed', event: 'ACCP 2026', createdAt: '2026-01-09' },
    { id: 2, code: 'REG-002', firstName: 'Nattaporn', lastName: 'Srisuk', email: 'nattaporn@gmail.com', phone: '082-345-6789', role: 'thai-student', tickets: ['conference', 'preconference'], total: '฿3,500', status: 'pending', event: 'ACCP 2026', createdAt: '2026-01-09' },
    { id: 3, code: 'REG-003', firstName: 'John', lastName: 'Smith', email: 'john.smith@stanford.edu', phone: '+1-555-1234', role: 'intl-student', tickets: ['conference', 'gala'], total: '$200', status: 'confirmed', event: 'ACCP 2026', createdAt: '2026-01-08' },
    { id: 4, code: 'REG-004', firstName: 'Prof. Sarah', lastName: 'Johnson', email: 's.johnson@harvard.edu', phone: '+1-555-5678', role: 'intl-pharmacy', tickets: ['conference'], total: '$350', status: 'checked_in', event: 'ACCP 2026', createdAt: '2026-01-08' },
    { id: 5, code: 'REG-005', firstName: 'Dr. Michael', lastName: 'Brown', email: 'm.brown@mit.edu', phone: '+1-555-9012', role: 'intl-pharmacy', tickets: ['conference', 'preconference', 'gala'], total: '$550', status: 'confirmed', event: 'ACCP 2026', createdAt: '2026-01-07' },
    { id: 6, code: 'REG-006', firstName: 'ภญ.สุภาพร', lastName: 'ใจดี', email: 'supaporn@pharmacy.com', phone: '083-456-7890', role: 'thai-pharmacy', tickets: ['conference'], total: '฿5,500', status: 'confirmed', event: 'ACCP 2026', createdAt: '2026-01-07' },
    { id: 7, code: 'REG-007', firstName: 'ปิยะพงษ์', lastName: 'สุวรรณี', email: 'piyapong@student.com', phone: '084-567-8901', role: 'thai-student', tickets: ['conference', 'gala'], total: '฿4,000', status: 'cancelled', event: 'ACCP 2026', createdAt: '2026-01-06' },
    { id: 8, code: 'REG-008', firstName: 'ภก.มานะ', lastName: 'รักเรียน', email: 'mana@pharmacy.com', phone: '085-678-9012', role: 'thai-pharmacy', tickets: ['conference', 'preconference'], total: '฿6,500', status: 'checked_in', event: 'ACCP 2026', createdAt: '2026-01-05' },
];

const statusColors: { [key: string]: string } = {
    confirmed: 'badge-success',
    pending: 'badge-warning',
    checked_in: 'badge-info',
    cancelled: 'badge-error',
};

const roleLabels: { [key: string]: { label: string; className: string } } = {
    'thai-pharmacy': { label: 'Thai Pharmacy', className: 'bg-blue-100 text-blue-800' },
    'thai-student': { label: 'Thai Student', className: 'bg-green-100 text-green-800' },
    'intl-pharmacy': { label: 'International Pharmacy', className: 'bg-purple-100 text-purple-800' },
    'intl-student': { label: 'International Student', className: 'bg-orange-100 text-orange-800' },
};

const ticketLabels: { [key: string]: { label: string; className: string } } = {
    'conference': { label: 'Conference', className: 'bg-green-100 text-green-700' },
    'preconference': { label: 'Pre-Conference', className: 'bg-yellow-100 text-yellow-700' },
    'gala': { label: 'Gala', className: 'bg-blue-100 text-blue-700' },
};

interface Registration {
    id: number;
    code: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    tickets: string[];
    total: string;
    status: string;
    event: string;
    createdAt: string;
}

export default function RegistrationsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [ticketFilter, setTicketFilter] = useState('');
    const [selectedRegistrations, setSelectedRegistrations] = useState<number[]>([]);
    const [selectedReg, setSelectedReg] = useState<Registration | null>(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showCheckinModal, setShowCheckinModal] = useState(false);

    const filteredRegistrations = mockRegistrations.filter((reg) => {
        const matchesSearch =
            reg.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reg.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reg.code.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = !statusFilter || reg.status === statusFilter;
        const matchesRole = !roleFilter || reg.role === roleFilter;
        const matchesTicket = !ticketFilter || reg.tickets.includes(ticketFilter);

        return matchesSearch && matchesStatus && matchesRole && matchesTicket;
    });

    const stats = {
        total: mockRegistrations.length,
        conference: mockRegistrations.filter(r => r.tickets.includes('conference')).length,
        preconference: mockRegistrations.filter(r => r.tickets.includes('preconference')).length,
        gala: mockRegistrations.filter(r => r.tickets.includes('gala')).length,
    };

    const toggleSelectAll = () => {
        if (selectedRegistrations.length === filteredRegistrations.length) {
            setSelectedRegistrations([]);
        } else {
            setSelectedRegistrations(filteredRegistrations.map((r) => r.id));
        }
    };

    const toggleSelect = (id: number) => {
        if (selectedRegistrations.includes(id)) {
            setSelectedRegistrations(selectedRegistrations.filter((i) => i !== id));
        } else {
            setSelectedRegistrations([...selectedRegistrations, id]);
        }
    };

    const handleCheckin = () => {
        setShowCheckinModal(false);
        setSelectedReg(null);
        alert('Attendee checked in successfully!');
    };

    return (
        <AdminLayout title="Registrations">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div
                    className={`card py-4 cursor-pointer hover:shadow-md transition-shadow ${!ticketFilter ? 'ring-2 ring-blue-500' : ''}`}
                    onClick={() => setTicketFilter('')}
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                            <IconUsers size={24} stroke={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                            <p className="text-sm text-gray-500">All Registrations</p>
                        </div>
                    </div>
                </div>
                <div
                    className={`card py-4 cursor-pointer hover:shadow-md transition-shadow ${ticketFilter === 'conference' ? 'ring-2 ring-green-500' : ''}`}
                    onClick={() => setTicketFilter('conference')}
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                            <IconBuilding size={24} stroke={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-green-600">{stats.conference}</p>
                            <p className="text-sm text-gray-500">Conference</p>
                        </div>
                    </div>
                </div>
                <div
                    className={`card py-4 cursor-pointer hover:shadow-md transition-shadow ${ticketFilter === 'preconference' ? 'ring-2 ring-yellow-500' : ''}`}
                    onClick={() => setTicketFilter('preconference')}
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600">
                            <IconTools size={24} stroke={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-yellow-600">{stats.preconference}</p>
                            <p className="text-sm text-gray-500">Pre-Conference Workshop</p>
                        </div>
                    </div>
                </div>
                <div
                    className={`card py-4 cursor-pointer hover:shadow-md transition-shadow ${ticketFilter === 'gala' ? 'ring-2 ring-purple-500' : ''}`}
                    onClick={() => setTicketFilter('gala')}
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                            <IconConfetti size={24} stroke={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-purple-600">{stats.gala}</p>
                            <p className="text-sm text-gray-500">Gala Dinner</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters & Actions */}
            <div className="card mb-6">
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                    <div className="flex flex-col md:flex-row gap-4 flex-1">
                        <div className="relative flex-1 max-w-md">
                            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search by name, email, or code..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="input-field pl-10"
                            />
                        </div>

                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input-field w-auto">
                            <option value="">All Status</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="pending">Pending</option>
                            <option value="checked_in">Checked In</option>
                            <option value="cancelled">Cancelled</option>
                        </select>

                        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="input-field w-auto">
                            <option value="">All Roles</option>
                            <option value="thai-pharmacy">Thai Pharmacy</option>
                            <option value="thai-student">Thai Student</option>
                            <option value="intl-pharmacy">International Pharmacy</option>
                            <option value="intl-student">International Student</option>
                        </select>
                    </div>

                    <div className="flex gap-2">
                        <button className="btn-secondary flex items-center gap-2">
                            <IconDownload size={18} /> Export
                        </button>
                        <button className="btn-primary flex items-center gap-2">
                            <IconUserPlus size={18} /> Add Registration
                        </button>
                    </div>
                </div>

                {/* Active Filter Badge */}
                {ticketFilter && (
                    <div className="mt-4 flex items-center gap-2">
                        <span className="text-sm text-gray-500">Filtered by:</span>
                        <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {ticketLabels[ticketFilter]?.label || ticketFilter}
                            <button onClick={() => setTicketFilter('')} className="hover:text-blue-900">
                                <IconX size={14} />
                            </button>
                        </span>
                    </div>
                )}
            </div>

            {/* Table */}
            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th className="w-12">
                                    <input
                                        type="checkbox"
                                        checked={selectedRegistrations.length === filteredRegistrations.length && filteredRegistrations.length > 0}
                                        onChange={toggleSelectAll}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                                    />
                                </th>
                                <th>Code</th>
                                <th>Attendee</th>
                                <th>Role</th>
                                <th>Tickets</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRegistrations.map((reg) => (
                                <tr key={reg.id} className="animate-fade-in">
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedRegistrations.includes(reg.id)}
                                            onChange={() => toggleSelect(reg.id)}
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                                        />
                                    </td>
                                    <td className="font-mono text-sm text-gray-600">{reg.code}</td>
                                    <td>
                                        <div>
                                            <p className="font-medium text-gray-800">{reg.firstName} {reg.lastName}</p>
                                            <p className="text-sm text-gray-500">{reg.email}</p>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`badge ${roleLabels[reg.role]?.className || 'bg-gray-100 text-gray-800'}`}>
                                            {roleLabels[reg.role]?.label || reg.role}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex flex-wrap gap-1">
                                            {reg.tickets.map(t => (
                                                <span key={t} className={`badge text-xs ${ticketLabels[t]?.className || 'bg-gray-100 text-gray-700'}`}>
                                                    {ticketLabels[t]?.label || t}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="font-semibold text-gray-800">{reg.total}</td>
                                    <td>
                                        <span className={`badge ${statusColors[reg.status]}`}>
                                            {reg.status.replace('_', ' ').charAt(0).toUpperCase() + reg.status.replace('_', ' ').slice(1)}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex gap-1 justify-center">
                                            <button
                                                className="p-1.5 hover:bg-gray-100 rounded text-gray-600"
                                                title="View"
                                                onClick={() => { setSelectedReg(reg); setShowViewModal(true); }}
                                            >
                                                <IconEye size={18} />
                                            </button>
                                            {(reg.status === 'confirmed') && (
                                                <button
                                                    className="p-1.5 hover:bg-green-100 rounded text-green-600"
                                                    title="Check In"
                                                    onClick={() => { setSelectedReg(reg); setShowCheckinModal(true); }}
                                                >
                                                    <IconCheck size={18} />
                                                </button>
                                            )}
                                            {reg.status === 'pending' && (
                                                <button className="p-1.5 hover:bg-blue-100 rounded text-blue-600" title="Send Reminder">
                                                    <IconMail size={18} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
                    <p className="text-sm text-gray-500">
                        Showing {filteredRegistrations.length} of {mockRegistrations.length} registrations
                    </p>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50" disabled>
                            Previous
                        </button>
                        <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">1</button>
                        <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* View Modal */}
            {showViewModal && selectedReg && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full">
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">Registration Details</h3>
                                <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-gray-600">
                                    <IconX size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Reg Code</p>
                                    <p className="font-mono font-semibold">{selectedReg.code}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Status</p>
                                    <span className={`badge ${statusColors[selectedReg.status]}`}>
                                        {selectedReg.status.replace('_', ' ')}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Name</p>
                                    <p className="font-semibold">{selectedReg.firstName} {selectedReg.lastName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p>{selectedReg.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Phone</p>
                                    <p>{selectedReg.phone}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Role</p>
                                    <span className={`badge ${roleLabels[selectedReg.role]?.className}`}>
                                        {roleLabels[selectedReg.role]?.label}
                                    </span>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-sm text-gray-500 mb-1">Tickets</p>
                                    <div className="flex gap-1">
                                        {selectedReg.tickets.map(t => (
                                            <span key={t} className={`badge ${ticketLabels[t]?.className}`}>{ticketLabels[t]?.label}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Total</p>
                                    <p className="text-xl font-bold text-green-600">{selectedReg.total}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
                            <button onClick={() => setShowViewModal(false)} className="btn-secondary">Close</button>
                            <button className="btn-primary flex items-center gap-2">
                                <IconPrinter size={18} /> Print Badge
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Check-in Modal */}
            {showCheckinModal && selectedReg && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full">
                        <div className="p-6 bg-green-600 rounded-t-2xl">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <IconCheck size={20} /> Check In Attendee
                            </h3>
                        </div>
                        <div className="p-6 text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <IconCheck size={32} className="text-green-600" />
                            </div>
                            <p className="mb-2">Check in this attendee?</p>
                            <p className="text-xl font-semibold text-gray-800">{selectedReg.firstName} {selectedReg.lastName}</p>
                            <p className="font-mono text-gray-500 mt-1">{selectedReg.code}</p>
                        </div>
                        <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
                            <button onClick={() => setShowCheckinModal(false)} className="btn-secondary">Cancel</button>
                            <button onClick={handleCheckin} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                                Confirm Check-in
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
