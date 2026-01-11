'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout';
import Image from 'next/image';
import {
    IconMicrophone,
    IconPlus,
    IconPencil,
    IconTrash,
    IconSearch,
    IconCheck,
    IconX,
    IconMail,
    IconBrandLinkedin,
    IconWorld,
} from '@tabler/icons-react';
import { useAuth } from '@/contexts/AuthContext';

// Mock events
const allEvents = [
    { id: 1, code: 'ACCP2026', name: 'ACCP Annual Conference 2026' },
    { id: 2, code: 'MIS2026', name: 'Medical Innovation Summit' },
    { id: 3, code: 'CPE001', name: 'CPE Workshop Series' },
];

// Mock speaker data
const mockSpeakers = [
    {
        id: 1,
        eventId: 1,
        name: 'Prof. Dr. Somchai Jaidee',
        title: 'Dean, Faculty of Pharmacy',
        organization: 'Chulalongkorn University',
        email: 'somchai@pharm.chula.ac.th',
        bio: 'Expert in clinical pharmacy with over 20 years of experience in pharmaceutical care.',
        photo: '/api/placeholder/150/150',
        topics: ['Clinical Pharmacy', 'Drug Safety'],
        sessions: ['Opening Keynote', 'Panel Discussion'],
        status: 'confirmed',
    },
    {
        id: 2,
        eventId: 1,
        name: 'Dr. Jane Smith',
        title: 'Research Director',
        organization: 'PharmaTech Global',
        email: 'jane.smith@pharmatech.com',
        bio: 'Leading researcher in drug interactions and pharmacogenomics.',
        photo: '/api/placeholder/150/150',
        topics: ['Drug Interactions', 'Pharmacogenomics'],
        sessions: ['Workshop A'],
        status: 'confirmed',
    },
    {
        id: 3,
        eventId: 1,
        name: 'ภก. วิชัย มั่นคง',
        title: 'Clinical Pharmacist',
        organization: 'Siriraj Hospital',
        email: 'wichai@siriraj.ac.th',
        bio: 'Specialized in oncology pharmacy and patient counseling.',
        photo: '/api/placeholder/150/150',
        topics: ['Oncology Pharmacy'],
        sessions: ['Workshop B'],
        status: 'pending',
    },
    {
        id: 4,
        eventId: 2,
        name: 'Dr. Michael Chen',
        title: 'Professor',
        organization: 'National University of Singapore',
        email: 'm.chen@nus.edu.sg',
        bio: 'International expert in pharmaceutical policy and healthcare systems.',
        photo: '/api/placeholder/150/150',
        topics: ['Pharmaceutical Policy', 'Healthcare Systems'],
        sessions: ['Closing Ceremony'],
        status: 'confirmed',
    },
];

const statusColors: { [key: string]: string } = {
    confirmed: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    declined: 'bg-red-100 text-red-700',
};

export default function SpeakersPage() {
    const { isAdmin, user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [eventFilter, setEventFilter] = useState<number | ''>('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedSpeaker, setSelectedSpeaker] = useState<typeof mockSpeakers[0] | null>(null);

    const [formData, setFormData] = useState({
        eventId: 1,
        name: '',
        title: '',
        organization: '',
        email: '',
        bio: '',
        topics: '',
    });

    // Filter events based on user access
    const accessibleEvents = isAdmin
        ? allEvents
        : allEvents.filter(e => user?.assignedEvents.some(ae => ae.id === e.id));

    // Filter speakers based on event access
    const accessibleSpeakers = mockSpeakers.filter(s => {
        if (isAdmin) return true;
        return user?.assignedEvents.some(e => e.id === s.eventId);
    });

    const filteredSpeakers = accessibleSpeakers.filter(speaker => {
        const matchesSearch =
            speaker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            speaker.organization.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = !statusFilter || speaker.status === statusFilter;
        const matchesEvent = !eventFilter || speaker.eventId === eventFilter;
        return matchesSearch && matchesStatus && matchesEvent;
    });

    const stats = {
        total: mockSpeakers.length,
        confirmed: mockSpeakers.filter(s => s.status === 'confirmed').length,
        pending: mockSpeakers.filter(s => s.status === 'pending').length,
    };

    const resetForm = () => {
        setFormData({ eventId: accessibleEvents[0]?.id || 1, name: '', title: '', organization: '', email: '', bio: '', topics: '' });
    };

    const openEditModal = (speaker: typeof mockSpeakers[0]) => {
        setSelectedSpeaker(speaker);
        setFormData({
            eventId: speaker.eventId,
            name: speaker.name,
            title: speaker.title,
            organization: speaker.organization,
            email: speaker.email,
            bio: speaker.bio,
            topics: speaker.topics.join(', '),
        });
        setShowEditModal(true);
    };

    const handleCreate = () => {
        setShowCreateModal(false);
        resetForm();
        alert('Speaker added successfully!');
    };

    const handleEdit = () => {
        setShowEditModal(false);
        setSelectedSpeaker(null);
        alert('Speaker updated successfully!');
    };

    const handleDelete = () => {
        setShowDeleteModal(false);
        setSelectedSpeaker(null);
        alert('Speaker removed successfully!');
    };

    return (
        <AdminLayout title="Speakers">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="card py-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                            <IconMicrophone size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                            <p className="text-sm text-gray-500">Total Speakers</p>
                        </div>
                    </div>
                </div>
                <div className="card py-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                            <IconCheck size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
                            <p className="text-sm text-gray-500">Confirmed</p>
                        </div>
                    </div>
                </div>
                <div className="card py-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600">
                            <IconMail size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                            <p className="text-sm text-gray-500">Awaiting Response</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="card">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <IconMicrophone size={20} className="text-blue-600" />
                        All Speakers
                    </h2>
                    <button
                        onClick={() => { resetForm(); setShowCreateModal(true); }}
                        className="btn-primary flex items-center gap-2"
                    >
                        <IconPlus size={18} /> Add Speaker
                    </button>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1 max-w-md">
                        <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search speakers..."
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
                        <option value="confirmed">Confirmed</option>
                        <option value="pending">Pending</option>
                        <option value="declined">Declined</option>
                    </select>

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
                </div>

                {/* Speaker Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSpeakers.map((speaker) => (
                        <div key={speaker.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                                    {speaker.name.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-semibold text-gray-800 truncate">{speaker.name}</h3>
                                            <p className="text-sm text-gray-500">{speaker.title}</p>
                                            <p className="text-xs text-gray-400">{speaker.organization}</p>
                                        </div>
                                        <span className={`badge ${statusColors[speaker.status]} text-xs`}>
                                            {speaker.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="flex flex-wrap gap-1 mb-3">
                                    {speaker.topics.map((topic, idx) => (
                                        <span key={idx} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-sm text-gray-600 line-clamp-2">{speaker.bio}</p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                                <div className="flex gap-2">
                                    <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500" title="Website">
                                        <IconWorld size={18} />
                                    </button>
                                    <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500" title="LinkedIn">
                                        <IconBrandLinkedin size={18} />
                                    </button>
                                    <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500" title="Email">
                                        <IconMail size={18} />
                                    </button>
                                </div>
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => openEditModal(speaker)}
                                        className="p-1.5 hover:bg-blue-50 rounded text-blue-600"
                                        title="Edit"
                                    >
                                        <IconPencil size={18} />
                                    </button>
                                    <button
                                        onClick={() => { setSelectedSpeaker(speaker); setShowDeleteModal(true); }}
                                        className="p-1.5 hover:bg-red-50 rounded text-red-600"
                                        title="Delete"
                                    >
                                        <IconTrash size={18} />
                                    </button>
                                </div>
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
                                    <IconMicrophone size={20} /> {showCreateModal ? 'Add Speaker' : 'Edit Speaker'}
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="Prof. Dr. Somchai Jaidee"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        placeholder="Dean"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Organization *</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        placeholder="University"
                                        value={formData.organization}
                                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                <input
                                    type="email"
                                    className="input-field"
                                    placeholder="speaker@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Topics (comma separated)</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="Clinical Pharmacy, Drug Safety"
                                    value={formData.topics}
                                    onChange={(e) => setFormData({ ...formData, topics: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                <textarea
                                    className="input-field h-24"
                                    placeholder="Brief biography..."
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
                            <button onClick={() => { setShowCreateModal(false); setShowEditModal(false); }} className="btn-secondary">
                                Cancel
                            </button>
                            <button onClick={showCreateModal ? handleCreate : handleEdit} className="btn-primary flex items-center gap-2">
                                <IconCheck size={18} /> {showCreateModal ? 'Add Speaker' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && selectedSpeaker && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full">
                        <div className="p-6 bg-red-600 rounded-t-2xl">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <IconTrash size={20} /> Remove Speaker
                            </h3>
                        </div>
                        <div className="p-6 text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <IconTrash size={32} className="text-red-600" />
                            </div>
                            <p className="mb-2">Are you sure you want to remove this speaker?</p>
                            <p className="font-semibold text-gray-800">{selectedSpeaker.name}</p>
                            <p className="text-sm text-gray-500">{selectedSpeaker.organization}</p>
                        </div>
                        <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
                            <button onClick={() => setShowDeleteModal(false)} className="btn-secondary">Cancel</button>
                            <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                                Remove Speaker
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
