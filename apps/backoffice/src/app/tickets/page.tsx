'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout';
import {
    IconTicket,
    IconPlus,
    IconPencil,
    IconTrash,
    IconSearch,
    IconCheck,
    IconX,
    IconCopy,
    IconCalendarEvent,
} from '@tabler/icons-react';
import { useAuth } from '@/contexts/AuthContext';

// Mock events
const allEvents = [
    { id: 1, code: 'ACCP2026', name: 'ACCP Annual Conference 2026' },
    { id: 2, code: 'MIS2026', name: 'Medical Innovation Summit' },
    { id: 3, code: 'CPE001', name: 'CPE Workshop Series' },
];

// Mock ticket data
const mockTickets = [
    {
        id: 1,
        eventId: 1,
        code: 'EARLY-MEM',
        name: 'Early Bird - Member',
        description: 'สำหรับสมาชิก ACCP ลงทะเบียนก่อน 1 ก.พ.',
        category: 'primary',
        price: 3500,
        originalPrice: 4500,
        quota: 100,
        sold: 45,
        status: 'active',
        startDate: '2026-01-01',
        endDate: '2026-02-01',
        type: 'thai_pharmacy',
    },
    {
        id: 2,
        eventId: 1,
        code: 'EARLY-PUB',
        name: 'Early Bird - Public',
        description: 'บุคคลทั่วไป ลงทะเบียนก่อน 1 ก.พ.',
        category: 'primary',
        price: 4000,
        originalPrice: 5000,
        quota: 150,
        sold: 82,
        status: 'active',
        startDate: '2026-01-01',
        endDate: '2026-02-01',
        type: 'thai_pharmacy', // Changed from public to match typical non-student role or new mapping
    },
    {
        id: 3,
        eventId: 1,
        code: 'REG-MEM',
        name: 'Regular - Member',
        description: 'สำหรับสมาชิก ACCP',
        category: 'primary',
        price: 4500,
        originalPrice: null,
        quota: 100,
        sold: 23,
        status: 'active',
        startDate: '2026-02-02',
        endDate: '2026-03-15',
        type: 'thai_pharmacy',
    },
    {
        id: 4,
        eventId: 1,
        code: 'REG-PUB',
        name: 'Regular - Public',
        description: 'บุคคลทั่วไป',
        category: 'primary',
        price: 5000,
        originalPrice: null,
        quota: 200,
        sold: 55,
        status: 'active',
        startDate: '2026-02-02',
        endDate: '2026-03-15',
        type: 'thai_pharmacy',
    },
    {
        id: 5,
        eventId: 1,
        code: 'STU-TH',
        name: 'Thai Student',
        description: 'นักศึกษาไทย (ต้องยืนยันสถานะ)',
        category: 'primary',
        price: 1500,
        originalPrice: null,
        quota: 50,
        sold: 28,
        status: 'active',
        startDate: '2026-01-01',
        endDate: '2026-03-15',
        type: 'thai_student',
    },
    {
        id: 6,
        eventId: 1,
        code: 'STU-INT',
        name: 'International Student',
        description: 'นักศึกษาต่างชาติ (ต้องยืนยันสถานะ)',
        category: 'primary',
        price: 2000,
        originalPrice: null,
        quota: 30,
        sold: 12,
        status: 'active',
        startDate: '2026-01-01',
        endDate: '2026-03-15',
        type: 'intl_student',
    },
    {
        id: 7,
        eventId: 1,
        code: 'WS-A',
        name: 'Workshop A: Clinical Pharmacy',
        description: 'Workshop เพิ่มเติม - เช้าวันที่ 15',
        category: 'addon',
        price: 1500,
        originalPrice: null,
        quota: 40,
        sold: 35,
        status: 'active',
        startDate: '2026-01-01',
        endDate: '2026-03-14',
        type: 'thai_pharmacy',
    },
    {
        id: 8,
        eventId: 1,
        code: 'WS-B',
        name: 'Workshop B: Drug Interactions',
        description: 'Workshop เพิ่มเติม - บ่ายวันที่ 15',
        category: 'addon',
        price: 1500,
        originalPrice: null,
        quota: 40,
        sold: 22,
        status: 'active',
        startDate: '2026-01-01',
        endDate: '2026-03-14',
        type: 'thai_pharmacy',
    },
    {
        id: 9,
        eventId: 2,
        code: 'MIS-REG',
        name: 'Regular Registration',
        description: 'ลงทะเบียนทั่วไป',
        category: 'primary',
        price: 3000,
        originalPrice: null,
        quota: 200,
        sold: 45,
        status: 'active',
        startDate: '2026-01-01',
        endDate: '2026-04-20',
        type: 'intl_pharmacy',
    },
];

const categoryColors: { [key: string]: { bg: string; text: string } } = {
    primary: { bg: 'bg-blue-100', text: 'text-blue-800' },
    addon: { bg: 'bg-purple-100', text: 'text-purple-800' },
};

const typeColors: { [key: string]: string } = {
    thai_student: 'bg-green-100 text-green-800',
    thai_pharmacy: 'bg-blue-100 text-blue-800',
    intl_student: 'bg-yellow-100 text-yellow-800',
    intl_pharmacy: 'bg-purple-100 text-purple-800',
};

interface Ticket {
    id: number;
    eventId: number;
    code: string;
    name: string;
    description: string;
    category: string;
    price: number;
    originalPrice: number | null;
    quota: number;
    sold: number;
    status: string;
    startDate: string;
    endDate: string;
    type: string;
}

export default function TicketsPage() {
    const { isAdmin, currentEvent, user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [eventFilter, setEventFilter] = useState<number | ''>('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        eventId: 1,
        code: '',
        name: '',
        description: '',
        category: 'primary',
        type: 'thai_student',
        price: 0,
        originalPrice: '',
        quota: 100,
        startDate: '',
        endDate: '',
    });

    // Filter events based on user access
    const accessibleEvents = isAdmin
        ? allEvents
        : allEvents.filter(e => user?.assignedEvents.some(ae => ae.id === e.id));

    // Filter tickets based on event access
    const accessibleTickets = mockTickets.filter(t => {
        if (isAdmin) return true;
        return user?.assignedEvents.some(e => e.id === t.eventId);
    });

    // Base filtered tickets (for stats - excludes text search)
    const statsTickets = accessibleTickets.filter((ticket) => {
        const matchesEvent = !eventFilter || ticket.eventId === eventFilter;
        const matchesCategory = !categoryFilter || ticket.category === categoryFilter;
        const matchesType = !typeFilter || ticket.type === typeFilter;
        return matchesEvent && matchesCategory && matchesType;
    });

    // Final filtered tickets (for table - includes text search)
    const filteredTickets = statsTickets.filter((ticket) => {
        return ticket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.code.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const getEventName = (eventId: number) => {
        return allEvents.find(e => e.id === eventId)?.code || 'Unknown';
    };

    const stats = {
        total: statsTickets.length,
        primary: statsTickets.filter(t => t.category === 'primary').length,
        addon: statsTickets.filter(t => t.category === 'addon').length,
        totalSold: statsTickets.reduce((sum, t) => sum + t.sold, 0),
    };

    const handleCreate = () => {
        setShowCreateModal(false);
        resetForm();
        alert('Ticket created successfully!');
    };

    const handleEdit = () => {
        setShowEditModal(false);
        setSelectedTicket(null);
        alert('Ticket updated successfully!');
    };

    const handleDelete = () => {
        setShowDeleteModal(false);
        setSelectedTicket(null);
        alert('Ticket deleted successfully!');
    };

    const handleDuplicate = (ticket: Ticket) => {
        setFormData({
            eventId: ticket.eventId,
            code: ticket.code + '-COPY',
            name: ticket.name + ' (Copy)',
            description: ticket.description,
            category: ticket.category,
            type: ticket.type,
            price: ticket.price,
            originalPrice: ticket.originalPrice ? String(ticket.originalPrice) : '',
            quota: ticket.quota,
            startDate: ticket.startDate,
            endDate: ticket.endDate,
        });
        setShowCreateModal(true);
    };

    const resetForm = () => {
        setFormData({
            eventId: accessibleEvents[0]?.id || 1,
            code: '',
            name: '',
            description: '',
            category: 'primary',
            type: 'thai_student',
            price: 0,
            originalPrice: '',
            quota: 100,
            startDate: '',
            endDate: '',
        });
    };

    const openEditModal = (ticket: Ticket) => {
        setSelectedTicket(ticket);
        setFormData({
            eventId: ticket.eventId,
            code: ticket.code,
            name: ticket.name,
            description: ticket.description,
            category: ticket.category,
            type: ticket.type,
            price: ticket.price,
            originalPrice: ticket.originalPrice ? String(ticket.originalPrice) : '',
            quota: ticket.quota,
            startDate: ticket.startDate,
            endDate: ticket.endDate,
        });
        setShowEditModal(true);
    };

    return (
        <AdminLayout title="Ticket Management">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="card py-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                            <IconTicket size={24} stroke={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                            <p className="text-sm text-gray-500">Total Tickets</p>
                        </div>
                    </div>
                </div>
                <div className="card py-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                            <IconTicket size={24} stroke={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-green-600">{stats.primary}</p>
                            <p className="text-sm text-gray-500">Primary Tickets</p>
                        </div>
                    </div>
                </div>
                <div className="card py-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                            <IconTicket size={24} stroke={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-purple-600">{stats.addon}</p>
                            <p className="text-sm text-gray-500">Add-on Tickets</p>
                        </div>
                    </div>
                </div>
                <div className="card py-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600">
                            <IconCheck size={24} stroke={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-yellow-600">{stats.totalSold}</p>
                            <p className="text-sm text-gray-500">Total Sold</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Card */}
            <div className="card">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">All Tickets</h2>
                    <button
                        onClick={() => { resetForm(); setShowCreateModal(true); }}
                        className="btn-primary flex items-center gap-2"
                    >
                        <IconPlus size={18} />
                        Add Ticket
                    </button>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1 max-w-md">
                        <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name or code..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input-field pl-10"
                        />
                    </div>

                    <select
                        value={eventFilter}
                        onChange={(e) => setEventFilter(e.target.value ? Number(e.target.value) : '')}
                        className="input-field w-auto"
                    >
                        <option value="">All Events</option>
                        {accessibleEvents.map((event) => (
                            <option key={event.id} value={event.id}>{event.code} - {event.name}</option>
                        ))}
                    </select>

                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="input-field w-auto"
                    >
                        <option value="">All Categories</option>
                        <option value="primary">Primary</option>
                        <option value="addon">Add-on</option>
                    </select>

                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="input-field w-auto"
                    >
                        <option value="">All Types</option>
                        <option value="thai_student">Thai Student</option>
                        <option value="thai_pharmacy">Thai Pharmacy</option>
                        <option value="intl_student">International Student</option>
                        <option value="intl_pharmacy">International Pharmacy</option>
                    </select>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Ticket</th>
                                <th>Event</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Quota</th>
                                <th>Sales Period</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTickets.map((ticket) => {
                                const soldPercentage = (ticket.sold / ticket.quota) * 100;
                                return (
                                    <tr key={ticket.id} className="animate-fade-in">
                                        <td>
                                            <div>
                                                <p className="font-medium text-gray-800">{ticket.name}</p>
                                                <p className="text-sm text-gray-500 font-mono">{ticket.code}</p>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge bg-gray-100 text-gray-800">
                                                {getEventName(ticket.eventId)}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge ${categoryColors[ticket.category]?.bg} ${categoryColors[ticket.category]?.text}`}>
                                                {ticket.category === 'primary' ? 'Primary' : 'Add-on'}
                                            </span>
                                            <span className={`badge ml-1 ${typeColors[ticket.type] || 'bg-gray-100 text-gray-600'}`}>
                                                {ticket.type.replace('_', ' ').toUpperCase()}
                                            </span>
                                        </td>
                                        <td>
                                            <div>
                                                <p className="font-semibold text-gray-800">฿{ticket.price.toLocaleString()}</p>
                                                {ticket.originalPrice && (
                                                    <p className="text-sm text-gray-400 line-through">฿{ticket.originalPrice.toLocaleString()}</p>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="w-24">
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="text-gray-600">{ticket.sold}/{ticket.quota}</span>
                                                    <span className={soldPercentage >= 90 ? 'text-red-600' : soldPercentage >= 70 ? 'text-yellow-600' : 'text-green-600'}>
                                                        {Math.round(soldPercentage)}%
                                                    </span>
                                                </div>
                                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${soldPercentage >= 90 ? 'bg-red-500' : soldPercentage >= 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
                                                        style={{ width: `${Math.min(soldPercentage, 100)}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p className="text-sm text-gray-600">{ticket.startDate}</p>
                                            <p className="text-sm text-gray-400">to {ticket.endDate}</p>
                                        </td>
                                        <td>
                                            <div className="flex gap-1 justify-center">
                                                <button
                                                    className="p-1.5 hover:bg-gray-100 rounded text-gray-600"
                                                    title="Duplicate"
                                                    onClick={() => handleDuplicate(ticket)}
                                                >
                                                    <IconCopy size={18} />
                                                </button>
                                                <button
                                                    className="p-1.5 hover:bg-gray-100 rounded text-gray-600"
                                                    title="Edit"
                                                    onClick={() => openEditModal(ticket)}
                                                >
                                                    <IconPencil size={18} />
                                                </button>
                                                <button
                                                    className="p-1.5 hover:bg-red-100 rounded text-red-600"
                                                    title="Delete"
                                                    onClick={() => { setSelectedTicket(ticket); setShowDeleteModal(true); }}
                                                >
                                                    <IconTrash size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500">
                        Showing {filteredTickets.length} of {accessibleTickets.length} tickets
                    </p>
                </div>
            </div>

            {/* Create/Edit Modal */}
            {(showCreateModal || showEditModal) && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <IconTicket size={20} /> {showCreateModal ? 'Create Ticket' : 'Edit Ticket'}
                                </h3>
                                <button
                                    onClick={() => { setShowCreateModal(false); setShowEditModal(false); }}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <IconX size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Event *</label>
                                    <select
                                        className="input-field"
                                        value={formData.eventId}
                                        onChange={(e) => setFormData({ ...formData, eventId: Number(e.target.value) })}
                                    >
                                        {accessibleEvents.map((event) => (
                                            <option key={event.id} value={event.id}>{event.code}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                                    <select
                                        className="input-field"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option value="primary">Primary</option>
                                        <option value="addon">Add-on</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience *</label>
                                <select
                                    className="input-field"
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                >
                                    <option value="thai_student">Thai Student</option>
                                    <option value="thai_pharmacy">Thai Pharmacy</option>
                                    <option value="intl_student">International Student</option>
                                    <option value="intl_pharmacy">International Pharmacy</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ticket Code *</label>
                                    <input
                                        type="text"
                                        className="input-field font-mono"
                                        placeholder="EARLY-MEM"
                                        value={formData.code}
                                        onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Quota *</label>
                                    <input
                                        type="number"
                                        className="input-field"
                                        value={formData.quota}
                                        onChange={(e) => setFormData({ ...formData, quota: Number(e.target.value) })}
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ticket Name *</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="Early Bird - Member"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    className="input-field h-20"
                                    placeholder="รายละเอียดบัตร..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (฿) *</label>
                                    <input
                                        type="number"
                                        className="input-field"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (฿)</label>
                                    <input
                                        type="number"
                                        className="input-field"
                                        placeholder="For showing discount"
                                        value={formData.originalPrice}
                                        onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                                    <input
                                        type="date"
                                        className="input-field"
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
                                    <input
                                        type="date"
                                        className="input-field"
                                        value={formData.endDate}
                                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
                            <button
                                onClick={() => { setShowCreateModal(false); setShowEditModal(false); }}
                                className="btn-secondary"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={showCreateModal ? handleCreate : handleEdit}
                                className="btn-primary flex items-center gap-2"
                            >
                                <IconCheck size={18} /> {showCreateModal ? 'Create Ticket' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && selectedTicket && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full">
                        <div className="p-6 bg-red-600 rounded-t-2xl">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <IconTrash size={20} /> Delete Ticket
                            </h3>
                        </div>
                        <div className="p-6 text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <IconTrash size={32} className="text-red-600" />
                            </div>
                            <p className="mb-2">Are you sure you want to delete this ticket?</p>
                            <p className="font-semibold text-gray-800">{selectedTicket.name}</p>
                            <p className="text-sm text-gray-500 font-mono">{selectedTicket.code}</p>
                            {selectedTicket.sold > 0 && (
                                <p className="text-sm text-red-600 mt-2 bg-red-50 p-2 rounded">
                                    ⚠️ Warning: {selectedTicket.sold} tickets have been sold!
                                </p>
                            )}
                        </div>
                        <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
                            <button onClick={() => setShowDeleteModal(false)} className="btn-secondary">Cancel</button>
                            <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                                Delete Ticket
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
