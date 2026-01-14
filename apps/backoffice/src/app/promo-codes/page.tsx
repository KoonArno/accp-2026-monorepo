'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout';
import {
    IconDiscount,
    IconPlus,
    IconPencil,
    IconTrash,
    IconSearch,
    IconCheck,
    IconX,
    IconCopy,
    IconCalendarEvent,
    IconPercentage,
} from '@tabler/icons-react';
import { useAuth } from '@/contexts/AuthContext';

// Mock events
const allEvents = [
    { id: 1, code: 'ACCP2026', name: 'ACCP Annual Conference 2026' },
    { id: 2, code: 'MIS2026', name: 'Medical Innovation Summit' },
    { id: 3, code: 'CPE001', name: 'CPE Workshop Series' },
];

// Mock promo codes
const mockPromoCodes = [
    {
        id: 1,
        eventId: 1,
        code: 'EARLYBIRD20',
        description: 'ส่วนลด 20% สำหรับการลงทะเบียนก่อน 1 ก.พ.',
        discountType: 'percentage',
        discountValue: 20,
        minPurchase: 0,
        maxDiscount: 2000,
        usageLimit: 100,
        usedCount: 45,
        status: 'active',
        startDate: '2026-01-01',
        endDate: '2026-02-01',
    },
    {
        id: 2,
        eventId: 1,
        code: 'MEMBER500',
        description: 'ส่วนลด 500 บาท สำหรับสมาชิก',
        discountType: 'fixed',
        discountValue: 500,
        minPurchase: 3000,
        maxDiscount: null,
        usageLimit: 50,
        usedCount: 28,
        status: 'active',
        startDate: '2026-01-01',
        endDate: '2026-03-15',
    },
    {
        id: 3,
        eventId: 1,
        code: 'GROUP10',
        description: 'ส่วนลด 10% สำหรับลงทะเบียนกลุ่ม 5 คนขึ้นไป',
        discountType: 'percentage',
        discountValue: 10,
        minPurchase: 15000,
        maxDiscount: 5000,
        usageLimit: null,
        usedCount: 12,
        status: 'active',
        startDate: '2026-01-01',
        endDate: '2026-03-15',
    },
    {
        id: 4,
        eventId: 1,
        code: 'WELCOME1000',
        description: 'ส่วนลดผู้ลงทะเบียนใหม่',
        discountType: 'fixed',
        discountValue: 1000,
        minPurchase: 4000,
        maxDiscount: null,
        usageLimit: 30,
        usedCount: 30,
        status: 'expired',
        startDate: '2026-01-01',
        endDate: '2026-01-15',
    },
    {
        id: 5,
        eventId: 2,
        code: 'MIS15',
        description: '15% off for MIS Summit',
        discountType: 'percentage',
        discountValue: 15,
        minPurchase: 0,
        maxDiscount: 1500,
        usageLimit: 50,
        usedCount: 8,
        status: 'active',
        startDate: '2026-01-01',
        endDate: '2026-04-20',
    },
];

const statusColors: { [key: string]: string } = {
    active: 'badge-success',
    expired: 'badge-error',
    inactive: 'badge-warning',
};

interface PromoCode {
    id: number;
    eventId: number;
    code: string;
    description: string;
    discountType: string;
    discountValue: number;
    minPurchase: number;
    maxDiscount: number | null;
    usageLimit: number | null;
    usedCount: number;
    status: string;
    startDate: string;
    endDate: string;
}

export default function PromoCodesPage() {
    const { isAdmin, user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [eventFilter, setEventFilter] = useState<number | ''>('');
    const [statusFilter, setStatusFilter] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedPromo, setSelectedPromo] = useState<PromoCode | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        eventId: 1,
        code: '',
        description: '',
        discountType: 'percentage',
        discountValue: 10,
        minPurchase: 0,
        maxDiscount: '',
        usageLimit: '',
        startDate: '',
        endDate: '',
    });

    // Filter events based on user access
    const accessibleEvents = isAdmin
        ? allEvents
        : allEvents.filter(e => user?.assignedEvents.some(ae => ae.id === e.id));

    // Filter promo codes based on event access
    const accessiblePromos = mockPromoCodes.filter(p => {
        if (isAdmin) return true;
        return user?.assignedEvents.some(e => e.id === p.eventId);
    });

    const filteredPromos = accessiblePromos.filter((promo) => {
        const matchesSearch =
            promo.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            promo.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesEvent = !eventFilter || promo.eventId === eventFilter;
        const matchesStatus = !statusFilter || promo.status === statusFilter;
        return matchesSearch && matchesEvent && matchesStatus;
    });

    const getEventName = (eventId: number) => {
        return allEvents.find(e => e.id === eventId)?.code || 'Unknown';
    };

    const stats = {
        total: accessiblePromos.length,
        active: accessiblePromos.filter(p => p.status === 'active').length,
        expired: accessiblePromos.filter(p => p.status === 'expired').length,
        totalUsed: accessiblePromos.reduce((sum, p) => sum + p.usedCount, 0),
    };

    const handleCreate = () => {
        setShowCreateModal(false);
        resetForm();
        alert('Promo code created successfully!');
    };

    const handleEdit = () => {
        setShowEditModal(false);
        setSelectedPromo(null);
        alert('Promo code updated successfully!');
    };

    const handleDelete = () => {
        setShowDeleteModal(false);
        setSelectedPromo(null);
        alert('Promo code deleted successfully!');
    };

    const handleDuplicate = (promo: PromoCode) => {
        setFormData({
            eventId: promo.eventId,
            code: promo.code + '-COPY',
            description: promo.description,
            discountType: promo.discountType,
            discountValue: promo.discountValue,
            minPurchase: promo.minPurchase,
            maxDiscount: promo.maxDiscount ? String(promo.maxDiscount) : '',
            usageLimit: promo.usageLimit ? String(promo.usageLimit) : '',
            startDate: promo.startDate,
            endDate: promo.endDate,
        });
        setShowCreateModal(true);
    };

    const resetForm = () => {
        setFormData({
            eventId: accessibleEvents[0]?.id || 1,
            code: '',
            description: '',
            discountType: 'percentage',
            discountValue: 10,
            minPurchase: 0,
            maxDiscount: '',
            usageLimit: '',
            startDate: '',
            endDate: '',
        });
    };

    const openEditModal = (promo: PromoCode) => {
        setSelectedPromo(promo);
        setFormData({
            eventId: promo.eventId,
            code: promo.code,
            description: promo.description,
            discountType: promo.discountType,
            discountValue: promo.discountValue,
            minPurchase: promo.minPurchase,
            maxDiscount: promo.maxDiscount ? String(promo.maxDiscount) : '',
            usageLimit: promo.usageLimit ? String(promo.usageLimit) : '',
            startDate: promo.startDate,
            endDate: promo.endDate,
        });
        setShowEditModal(true);
    };

    const generateCode = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 8; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setFormData({ ...formData, code });
    };

    return (
        <AdminLayout title="Promo Codes">
            {/* Event Filter - Above Content */}
            <div className="mb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4 flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                    <IconCalendarEvent className="text-blue-600" size={20} />
                </div>
                <span className="text-sm font-medium text-gray-700">Select Event:</span>
                <select
                    value={eventFilter}
                    onChange={(e) => setEventFilter(e.target.value ? Number(e.target.value) : '')}
                    className="input-field pr-8 min-w-[250px] font-semibold bg-white"
                >
                    <option value="">All Events</option>
                    {accessibleEvents.map((event) => (
                        <option key={event.id} value={event.id}>{event.name}</option>
                    ))}
                </select>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="card py-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                            <IconDiscount size={24} stroke={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                            <p className="text-sm text-gray-500">Total Codes</p>
                        </div>
                    </div>
                </div>
                <div className="card py-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                            <IconCheck size={24} stroke={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                            <p className="text-sm text-gray-500">Active</p>
                        </div>
                    </div>
                </div>
                <div className="card py-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600">
                            <IconX size={24} stroke={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-red-600">{stats.expired}</p>
                            <p className="text-sm text-gray-500">Expired</p>
                        </div>
                    </div>
                </div>
                <div className="card py-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                            <IconPercentage size={24} stroke={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-purple-600">{stats.totalUsed}</p>
                            <p className="text-sm text-gray-500">Total Used</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Card */}
            <div className="card">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">
                        {eventFilter ? `Promo Codes for ${accessibleEvents.find(e => e.id === eventFilter)?.name || 'Event'}` : 'All Promo Codes'}
                    </h2>
                    <button
                        onClick={() => { resetForm(); setShowCreateModal(true); }}
                        className="btn-primary flex items-center gap-2"
                    >
                        <IconPlus size={18} />
                        Add Promo Code
                    </button>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1 max-w-md">
                        <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none" size={18} />
                        <input
                            type="text"
                            placeholder="Search by code or description..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input-field pl-10"
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="input-field w-auto"
                    >
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="expired">Expired</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Promo Code</th>
                                <th>Event</th>
                                <th>Discount</th>
                                <th>Usage</th>
                                <th>Status</th>
                                <th>Period</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPromos.map((promo) => {
                                const usagePercentage = promo.usageLimit ? (promo.usedCount / promo.usageLimit) * 100 : 0;
                                return (
                                    <tr key={promo.id} className="animate-fade-in">
                                        <td>
                                            <div>
                                                <p className="font-mono font-semibold text-gray-800">{promo.code}</p>
                                                <p className="text-sm text-gray-500">{promo.description}</p>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge bg-gray-100 text-gray-800">
                                                {getEventName(promo.eventId)}
                                            </span>
                                        </td>
                                        <td>
                                            <div>
                                                <p className="font-semibold text-green-600">
                                                    {promo.discountType === 'percentage'
                                                        ? `${promo.discountValue}%`
                                                        : `฿${promo.discountValue.toLocaleString()}`}
                                                </p>
                                                {promo.minPurchase > 0 && (
                                                    <p className="text-xs text-gray-400">min ฿{promo.minPurchase.toLocaleString()}</p>
                                                )}
                                                {promo.maxDiscount && (
                                                    <p className="text-xs text-gray-400">max ฿{promo.maxDiscount.toLocaleString()}</p>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            {promo.usageLimit ? (
                                                <div className="w-20">
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span className="text-gray-600">{promo.usedCount}/{promo.usageLimit}</span>
                                                    </div>
                                                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full ${usagePercentage >= 100 ? 'bg-red-500' : usagePercentage >= 80 ? 'bg-yellow-500' : 'bg-green-500'}`}
                                                            style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <span className="text-gray-600">{promo.usedCount}</span>
                                                    <span className="text-xs text-gray-400 block">Unlimited</span>
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <span className={`badge ${statusColors[promo.status]}`}>
                                                {promo.status.charAt(0).toUpperCase() + promo.status.slice(1)}
                                            </span>
                                        </td>
                                        <td>
                                            <p className="text-sm text-gray-600">{promo.startDate}</p>
                                            <p className="text-sm text-gray-400">to {promo.endDate}</p>
                                        </td>
                                        <td>
                                            <div className="flex gap-1 justify-center">
                                                <button
                                                    className="p-1.5 hover:bg-gray-100 rounded text-gray-600"
                                                    title="Duplicate"
                                                    onClick={() => handleDuplicate(promo)}
                                                >
                                                    <IconCopy size={18} />
                                                </button>
                                                <button
                                                    className="p-1.5 hover:bg-gray-100 rounded text-gray-600"
                                                    title="Edit"
                                                    onClick={() => openEditModal(promo)}
                                                >
                                                    <IconPencil size={18} />
                                                </button>
                                                <button
                                                    className="p-1.5 hover:bg-red-100 rounded text-red-600"
                                                    title="Delete"
                                                    onClick={() => { setSelectedPromo(promo); setShowDeleteModal(true); }}
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
                        Showing {filteredPromos.length} of {accessiblePromos.length} promo codes
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
                                    <IconDiscount size={20} /> {showCreateModal ? 'Create Promo Code' : 'Edit Promo Code'}
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
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Event *</label>
                                <select
                                    className="input-field"
                                    value={formData.eventId}
                                    onChange={(e) => setFormData({ ...formData, eventId: Number(e.target.value) })}
                                >
                                    {accessibleEvents.map((event) => (
                                        <option key={event.id} value={event.id}>{event.code} - {event.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Promo Code *</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        className="input-field font-mono flex-1"
                                        placeholder="PROMO2026"
                                        value={formData.code}
                                        onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                    />
                                    <button
                                        type="button"
                                        onClick={generateCode}
                                        className="btn-secondary whitespace-nowrap"
                                    >
                                        Generate
                                    </button>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="รายละเอียดโค้ดส่วนลด"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type *</label>
                                    <select
                                        className="input-field"
                                        value={formData.discountType}
                                        onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                                    >
                                        <option value="percentage">Percentage (%)</option>
                                        <option value="fixed">Fixed Amount (฿)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Discount Value *
                                    </label>
                                    <input
                                        type="number"
                                        className="input-field"
                                        value={formData.discountValue}
                                        onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Purchase (฿)</label>
                                    <input
                                        type="number"
                                        className="input-field"
                                        placeholder="0"
                                        value={formData.minPurchase}
                                        onChange={(e) => setFormData({ ...formData, minPurchase: Number(e.target.value) })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Discount (฿)</label>
                                    <input
                                        type="number"
                                        className="input-field"
                                        placeholder="No limit"
                                        value={formData.maxDiscount}
                                        onChange={(e) => setFormData({ ...formData, maxDiscount: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Usage Limit</label>
                                <input
                                    type="number"
                                    className="input-field"
                                    placeholder="Unlimited"
                                    value={formData.usageLimit}
                                    onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                                />
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
                                <IconCheck size={18} /> {showCreateModal ? 'Create Code' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && selectedPromo && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full">
                        <div className="p-6 bg-red-600 rounded-t-2xl">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <IconTrash size={20} /> Delete Promo Code
                            </h3>
                        </div>
                        <div className="p-6 text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <IconTrash size={32} className="text-red-600" />
                            </div>
                            <p className="mb-2">Are you sure you want to delete this promo code?</p>
                            <p className="font-mono font-semibold text-gray-800 text-lg">{selectedPromo.code}</p>
                            {selectedPromo.usedCount > 0 && (
                                <p className="text-sm text-yellow-600 mt-2 bg-yellow-50 p-2 rounded">
                                    ⚠️ This code has been used {selectedPromo.usedCount} time(s)
                                </p>
                            )}
                        </div>
                        <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
                            <button onClick={() => setShowDeleteModal(false)} className="btn-secondary">Cancel</button>
                            <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                                Delete Code
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
