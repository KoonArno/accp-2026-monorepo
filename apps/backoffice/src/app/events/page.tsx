'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdminLayout } from '@/components/layout';
import {
    IconCalendarEvent,
    IconCheck,
    IconFileText,
    IconUsers,
    IconSearch,
    IconEye,
    IconPencil,
    IconTrash,
    IconPlus,
    IconX,
    IconAlertTriangle,
} from '@tabler/icons-react';

// Mock event data
const mockEvents = [
    {
        id: 1,
        code: 'ACCP2026',
        name: 'ACCP Annual Conference 2026',
        location: 'ศูนย์ประชุมแห่งชาติสิริกิติ์',
        date: 'Mar 15-17, 2026',
        type: 'multi_session',
        registered: 205,
        capacity: 250,
        status: 'published',
        image: null
    },
    {
        id: 2,
        code: 'MIS2026',
        name: 'Medical Innovation Summit',
        location: 'QSNCC',
        date: 'Apr 20-22, 2026',
        type: 'multi_session',
        registered: 50,
        capacity: 200,
        status: 'published',
        image: null
    },
    {
        id: 3,
        code: 'CPE001',
        name: 'CPE Workshop Series',
        location: 'Online',
        date: 'May 10, 2026',
        type: 'single_room',
        registered: 80,
        capacity: 100,
        status: 'published',
        image: null
    },
    {
        id: 4,
        code: 'RS2026',
        name: 'Research Symposium 2026',
        location: 'Chulalongkorn University',
        date: 'Jun 15-16, 2026',
        type: 'multi_session',
        registered: 0,
        capacity: 150,
        status: 'draft',
        image: null
    },
    {
        id: 5,
        code: 'DSW2026',
        name: 'Drug Safety Workshop',
        location: 'TBD',
        date: 'Jul 20, 2026',
        type: 'single_room',
        registered: 0,
        capacity: 50,
        status: 'draft',
        image: null
    },
];

const statusColors: { [key: string]: string } = {
    published: 'badge-success',
    draft: 'badge-warning',
    cancelled: 'badge-error',
    completed: 'badge-info',
};

const typeLabels: { [key: string]: { label: string; className: string } } = {
    multi_session: { label: 'Multi Session', className: 'bg-purple-100 text-purple-800' },
    single_room: { label: 'Single Room', className: 'bg-gray-100 text-gray-800' },
};

interface Event {
    id: number;
    code: string;
    name: string;
    location: string;
    date: string;
    type: string;
    registered: number;
    capacity: number;
    status: string;
    image: string | null;
}

export default function EventsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const filteredEvents = mockEvents.filter((event) => {
        const matchesSearch =
            event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.code.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = !statusFilter || event.status === statusFilter;
        const matchesType = !typeFilter || event.type === typeFilter;

        return matchesSearch && matchesStatus && matchesType;
    });

    const stats = {
        total: mockEvents.length,
        published: mockEvents.filter(e => e.status === 'published').length,
        draft: mockEvents.filter(e => e.status === 'draft').length,
        totalRegistrations: mockEvents.reduce((sum, e) => sum + e.registered, 0),
    };

    const handleDelete = () => {
        setShowDeleteModal(false);
        setSelectedEvent(null);
        alert('Event deleted successfully!');
    };

    return (
        <AdminLayout title="Events Management">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="card py-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                            <IconCalendarEvent size={24} stroke={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                            <p className="text-sm text-gray-500">Total Events</p>
                        </div>
                    </div>
                </div>
                <div className="card py-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                            <IconCheck size={24} stroke={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-green-600">{stats.published}</p>
                            <p className="text-sm text-gray-500">Published</p>
                        </div>
                    </div>
                </div>
                <div className="card py-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600">
                            <IconFileText size={24} stroke={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-yellow-600">{stats.draft}</p>
                            <p className="text-sm text-gray-500">Draft</p>
                        </div>
                    </div>
                </div>
                <div className="card py-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                            <IconUsers size={24} stroke={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-purple-600">{stats.totalRegistrations}</p>
                            <p className="text-sm text-gray-500">Total Registrations</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="card">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">All Events</h2>
                    <Link href="/events/create" className="btn-primary flex items-center gap-2">
                        <IconPlus size={18} /> Create Event
                    </Link>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1 max-w-md">
                        <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search events..."
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
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="completed">Completed</option>
                    </select>

                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="input-field w-auto"
                    >
                        <option value="">All Types</option>
                        <option value="single_room">Single Room</option>
                        <option value="multi_session">Multi Session</option>
                    </select>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th className="w-12">ID</th>
                                <th>Event</th>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Registrations</th>
                                <th>Status</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEvents.map((event) => (
                                <tr key={event.id} className="animate-fade-in">
                                    <td className="font-mono text-sm text-gray-600">{event.id}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                                                <IconCalendarEvent size={24} stroke={1.5} />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-800">{event.name}</p>
                                                <p className="text-sm text-gray-500">{event.code} • {event.location}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-gray-600">{event.date}</td>
                                    <td>
                                        <span className={`badge ${typeLabels[event.type]?.className || 'bg-gray-100 text-gray-800'}`}>
                                            {typeLabels[event.type]?.label || event.type}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-green-500 rounded-full"
                                                    style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-sm text-gray-600">{event.registered}/{event.capacity}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`badge ${statusColors[event.status]}`}>
                                            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex gap-1 justify-center">
                                            <button
                                                className="p-1.5 hover:bg-gray-100 rounded text-gray-600"
                                                title="View"
                                                onClick={() => { setSelectedEvent(event); setShowViewModal(true); }}
                                            >
                                                <IconEye size={18} />
                                            </button>
                                            <Link
                                                href={`/events/${event.id}/edit`}
                                                className="p-1.5 hover:bg-gray-100 rounded text-gray-600"
                                                title="Edit"
                                            >
                                                <IconPencil size={18} />
                                            </Link>
                                            <button
                                                className="p-1.5 hover:bg-red-100 rounded text-red-600"
                                                title="Delete"
                                                onClick={() => { setSelectedEvent(event); setShowDeleteModal(true); }}
                                            >
                                                <IconTrash size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500">
                        Showing {filteredEvents.length} of {mockEvents.length} events
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
            {showViewModal && selectedEvent && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full">
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">Event Details</h3>
                                <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-gray-600">
                                    <IconX size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex gap-6">
                                <div className="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center">
                                    <IconCalendarEvent size={48} className="text-gray-400" stroke={1.5} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xl font-semibold text-gray-800">{selectedEvent.name}</h4>
                                    <p className="text-gray-500 mb-4">{selectedEvent.code}</p>

                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-gray-500">Type</p>
                                            <p className="font-medium">{typeLabels[selectedEvent.type]?.label}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Date</p>
                                            <p className="font-medium">{selectedEvent.date}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Location</p>
                                            <p className="font-medium">{selectedEvent.location}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Capacity</p>
                                            <p className="font-medium">{selectedEvent.capacity}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Registered</p>
                                            <p className="font-medium">{selectedEvent.registered}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Status</p>
                                            <span className={`badge ${statusColors[selectedEvent.status]}`}>
                                                {selectedEvent.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
                            <button onClick={() => setShowViewModal(false)} className="btn-secondary">Close</button>
                            <Link href={`/events/${selectedEvent.id}/edit`} className="btn-primary flex items-center gap-2">
                                <IconPencil size={18} /> Edit Event
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && selectedEvent && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full">
                        <div className="p-6 bg-red-600 rounded-t-2xl">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <IconTrash size={20} /> Delete Event
                            </h3>
                        </div>
                        <div className="p-6 text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <IconAlertTriangle size={32} className="text-red-600" />
                            </div>
                            <p className="mb-2">Are you sure you want to delete this event?</p>
                            <p className="font-semibold text-gray-800">{selectedEvent.name}</p>
                            <p className="text-sm text-gray-500 mt-4">
                                This action cannot be undone. All registrations and related data will be permanently deleted.
                            </p>
                        </div>
                        <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
                            <button onClick={() => setShowDeleteModal(false)} className="btn-secondary">Cancel</button>
                            <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                                Delete Event
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
