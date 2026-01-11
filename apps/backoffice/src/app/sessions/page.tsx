'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout';
import {
    IconCalendarTime,
    IconPlus,
    IconPencil,
    IconTrash,
    IconSearch,
    IconCheck,
    IconX,
    IconClock,
    IconMapPin,
    IconUsers,
} from '@tabler/icons-react';

// Mock session data
const mockSessions = [
    {
        id: 1,
        title: 'Opening Ceremony & Keynote Address',
        description: 'Welcome address by the conference chair and keynote speech on the future of pharmacy.',
        date: '2026-03-15',
        startTime: '08:30',
        endTime: '10:00',
        room: 'Grand Ballroom',
        type: 'keynote',
        speakers: ['Prof. Dr. Somchai Jaidee'],
        capacity: 500,
        registered: 423,
    },
    {
        id: 2,
        title: 'Clinical Pharmacy in Practice',
        description: 'Panel discussion on implementing clinical pharmacy services in hospitals.',
        date: '2026-03-15',
        startTime: '10:30',
        endTime: '12:00',
        room: 'Hall A',
        type: 'panel',
        speakers: ['Dr. Jane Smith', 'ภก. วิชัย มั่นคง'],
        capacity: 200,
        registered: 178,
    },
    {
        id: 3,
        title: 'Workshop A: Drug Interactions',
        description: 'Hands-on workshop on identifying and managing drug interactions.',
        date: '2026-03-15',
        startTime: '13:00',
        endTime: '15:00',
        room: 'Meeting Room 1',
        type: 'workshop',
        speakers: ['Dr. Jane Smith'],
        capacity: 40,
        registered: 40,
    },
    {
        id: 4,
        title: 'Workshop B: Oncology Pharmacy',
        description: 'Advanced topics in oncology pharmacy practice.',
        date: '2026-03-15',
        startTime: '13:00',
        endTime: '15:00',
        room: 'Meeting Room 2',
        type: 'workshop',
        speakers: ['ภก. วิชัย มั่นคง'],
        capacity: 40,
        registered: 35,
    },
    {
        id: 5,
        title: 'Networking Lunch',
        description: 'Networking opportunity with fellow pharmacists and industry partners.',
        date: '2026-03-15',
        startTime: '12:00',
        endTime: '13:00',
        room: 'Dining Hall',
        type: 'break',
        speakers: [],
        capacity: 500,
        registered: 0,
    },
    {
        id: 6,
        title: 'Closing Ceremony',
        description: 'Closing remarks and certificate distribution.',
        date: '2026-03-16',
        startTime: '16:00',
        endTime: '17:00',
        room: 'Grand Ballroom',
        type: 'ceremony',
        speakers: ['Dr. Michael Chen'],
        capacity: 500,
        registered: 380,
    },
];

const typeColors: { [key: string]: string } = {
    keynote: 'bg-purple-100 text-purple-700',
    panel: 'bg-blue-100 text-blue-700',
    workshop: 'bg-green-100 text-green-700',
    break: 'bg-gray-100 text-gray-600',
    ceremony: 'bg-yellow-100 text-yellow-700',
};

const typeLabels: { [key: string]: string } = {
    keynote: 'Keynote',
    panel: 'Panel Discussion',
    workshop: 'Workshop',
    break: 'Break/Networking',
    ceremony: 'Ceremony',
};

export default function SessionsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedSession, setSelectedSession] = useState<typeof mockSessions[0] | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        startTime: '',
        endTime: '',
        room: '',
        type: 'panel',
        capacity: 100,
    });

    const filteredSessions = mockSessions.filter(session => {
        const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = !typeFilter || session.type === typeFilter;
        const matchesDate = !dateFilter || session.date === dateFilter;
        return matchesSearch && matchesType && matchesDate;
    });

    // Group by date
    const sessionsByDate = filteredSessions.reduce((acc, session) => {
        if (!acc[session.date]) acc[session.date] = [];
        acc[session.date].push(session);
        return acc;
    }, {} as { [key: string]: typeof mockSessions });

    // Sort sessions within each date by start time
    Object.keys(sessionsByDate).forEach(date => {
        sessionsByDate[date].sort((a, b) => a.startTime.localeCompare(b.startTime));
    });

    const stats = {
        total: mockSessions.length,
        workshops: mockSessions.filter(s => s.type === 'workshop').length,
        panels: mockSessions.filter(s => s.type === 'panel' || s.type === 'keynote').length,
    };

    const uniqueDates = [...new Set(mockSessions.map(s => s.date))].sort();

    const resetForm = () => {
        setFormData({
            title: '', description: '', date: '', startTime: '', endTime: '', room: '', type: 'panel', capacity: 100,
        });
    };

    const openEditModal = (session: typeof mockSessions[0]) => {
        setSelectedSession(session);
        setFormData({
            title: session.title,
            description: session.description,
            date: session.date,
            startTime: session.startTime,
            endTime: session.endTime,
            room: session.room,
            type: session.type,
            capacity: session.capacity,
        });
        setShowEditModal(true);
    };

    const handleCreate = () => {
        setShowCreateModal(false);
        resetForm();
        alert('Session created successfully!');
    };

    const handleEdit = () => {
        setShowEditModal(false);
        setSelectedSession(null);
        alert('Session updated successfully!');
    };

    const handleDelete = () => {
        setShowDeleteModal(false);
        setSelectedSession(null);
        alert('Session deleted successfully!');
    };

    return (
        <AdminLayout title="Sessions & Agenda">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="card py-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                            <IconCalendarTime size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                            <p className="text-sm text-gray-500">Total Sessions</p>
                        </div>
                    </div>
                </div>
                <div className="card py-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                            <IconUsers size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-green-600">{stats.workshops}</p>
                            <p className="text-sm text-gray-500">Workshops</p>
                        </div>
                    </div>
                </div>
                <div className="card py-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                            <IconCalendarTime size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-purple-600">{stats.panels}</p>
                            <p className="text-sm text-gray-500">Keynotes & Panels</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="card">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <IconCalendarTime size={20} className="text-blue-600" />
                        Conference Agenda
                    </h2>
                    <button
                        onClick={() => { resetForm(); setShowCreateModal(true); }}
                        className="btn-primary flex items-center gap-2"
                    >
                        <IconPlus size={18} /> Add Session
                    </button>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1 max-w-md">
                        <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search sessions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input-field pl-10"
                        />
                    </div>
                    <select
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="input-field w-auto"
                    >
                        <option value="">All Dates</option>
                        {uniqueDates.map(date => (
                            <option key={date} value={date}>{date}</option>
                        ))}
                    </select>
                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="input-field w-auto"
                    >
                        <option value="">All Types</option>
                        <option value="keynote">Keynote</option>
                        <option value="panel">Panel Discussion</option>
                        <option value="workshop">Workshop</option>
                        <option value="break">Break/Networking</option>
                        <option value="ceremony">Ceremony</option>
                    </select>
                </div>

                {/* Timeline View */}
                <div className="space-y-8">
                    {Object.keys(sessionsByDate).sort().map(date => (
                        <div key={date}>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <IconCalendarTime size={20} className="text-blue-500" />
                                {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </h3>
                            <div className="space-y-3">
                                {sessionsByDate[date].map(session => {
                                    const capacityPercent = (session.registered / session.capacity) * 100;
                                    return (
                                        <div key={session.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
                                            <div className="flex flex-col md:flex-row md:items-center gap-4">
                                                {/* Time */}
                                                <div className="flex items-center gap-2 text-gray-600 w-32 flex-shrink-0">
                                                    <IconClock size={18} />
                                                    <span className="font-mono">{session.startTime} - {session.endTime}</span>
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <h4 className="font-semibold text-gray-800">{session.title}</h4>
                                                                <span className={`badge text-xs ${typeColors[session.type]}`}>
                                                                    {typeLabels[session.type]}
                                                                </span>
                                                            </div>
                                                            <p className="text-sm text-gray-500 line-clamp-1">{session.description}</p>
                                                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                                                <span className="flex items-center gap-1">
                                                                    <IconMapPin size={14} /> {session.room}
                                                                </span>
                                                                {session.speakers.length > 0 && (
                                                                    <span className="flex items-center gap-1">
                                                                        <IconUsers size={14} /> {session.speakers.join(', ')}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Capacity */}
                                                        {session.type !== 'break' && (
                                                            <div className="text-right flex-shrink-0 hidden md:block">
                                                                <div className="text-sm text-gray-600">{session.registered}/{session.capacity}</div>
                                                                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                                                                    <div
                                                                        className={`h-full rounded-full ${capacityPercent >= 100 ? 'bg-red-500' : capacityPercent >= 80 ? 'bg-yellow-500' : 'bg-green-500'}`}
                                                                        style={{ width: `${Math.min(capacityPercent, 100)}%` }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex gap-1 flex-shrink-0">
                                                    <button
                                                        onClick={() => openEditModal(session)}
                                                        className="p-1.5 hover:bg-blue-50 rounded text-blue-600"
                                                        title="Edit"
                                                    >
                                                        <IconPencil size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => { setSelectedSession(session); setShowDeleteModal(true); }}
                                                        className="p-1.5 hover:bg-red-50 rounded text-red-600"
                                                        title="Delete"
                                                    >
                                                        <IconTrash size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Create/Edit Modal */}
            {(showCreateModal || showEditModal) && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <IconCalendarTime size={20} /> {showCreateModal ? 'Add Session' : 'Edit Session'}
                                </h3>
                                <button
                                    onClick={() => { setShowCreateModal(false); setShowEditModal(false); }}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <IconX size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Session Title *</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="Opening Ceremony"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    className="input-field h-20"
                                    placeholder="Session description..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                                    <input
                                        type="date"
                                        className="input-field"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                                    <select
                                        className="input-field"
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    >
                                        <option value="keynote">Keynote</option>
                                        <option value="panel">Panel Discussion</option>
                                        <option value="workshop">Workshop</option>
                                        <option value="break">Break/Networking</option>
                                        <option value="ceremony">Ceremony</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time *</label>
                                    <input
                                        type="time"
                                        className="input-field"
                                        value={formData.startTime}
                                        onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time *</label>
                                    <input
                                        type="time"
                                        className="input-field"
                                        value={formData.endTime}
                                        onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Room *</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        placeholder="Grand Ballroom"
                                        value={formData.room}
                                        onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                                    <input
                                        type="number"
                                        className="input-field"
                                        value={formData.capacity}
                                        onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
                            <button onClick={() => { setShowCreateModal(false); setShowEditModal(false); }} className="btn-secondary">
                                Cancel
                            </button>
                            <button onClick={showCreateModal ? handleCreate : handleEdit} className="btn-primary flex items-center gap-2">
                                <IconCheck size={18} /> {showCreateModal ? 'Add Session' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && selectedSession && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full">
                        <div className="p-6 bg-red-600 rounded-t-2xl">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <IconTrash size={20} /> Delete Session
                            </h3>
                        </div>
                        <div className="p-6 text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <IconTrash size={32} className="text-red-600" />
                            </div>
                            <p className="mb-2">Are you sure you want to delete this session?</p>
                            <p className="font-semibold text-gray-800">{selectedSession.title}</p>
                            {selectedSession.registered > 0 && (
                                <p className="text-sm text-red-600 mt-2 bg-red-50 p-2 rounded">
                                    ⚠️ Warning: {selectedSession.registered} attendees registered!
                                </p>
                            )}
                        </div>
                        <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
                            <button onClick={() => setShowDeleteModal(false)} className="btn-secondary">Cancel</button>
                            <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                                Delete Session
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
