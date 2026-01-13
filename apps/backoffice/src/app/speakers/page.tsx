'use client';

import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layout';
import { api } from '@/lib/api';
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
    IconLoader2,
} from '@tabler/icons-react';
import { useAuth } from '@/contexts/AuthContext';

// Mock stats colors (can be real if we add status to schema later, currently schema doesn't have status for speaker itself, only in relation)
const statusColors: { [key: string]: string } = {
    confirmed: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    declined: 'bg-red-100 text-red-700',
};

interface Speaker {
    id: number;
    firstName: string;
    lastName: string;
    email: string | null;
    bio: string | null;
    organization: string | null;
    position: string | null;
    photoUrl: string | null;
    createdAt: string;
    // topics? - frontend assumes topics, schema doesn't have it explicitly yet on speaker
    // actually schema: firstName, lastName, ...
}

export default function SpeakersPage() {
    const { isAdmin, user } = useAuth();
    const [speakers, setSpeakers] = useState<Speaker[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // For now we don't have direct event-speaker filtering in this view without extra API calls
    // But we can filter by text locally after fetching all speakers

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        title: '', // maps to position
        organization: '',
        email: '',
        bio: '',
        topics: '', // currently not in DB schema for speaker, strictly speaking (it's in event_speakers relation)
    });

    useEffect(() => {
        fetchSpeakers();
    }, []);

    const fetchSpeakers = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('backoffice_token') || '';
            const res = await api.speakers.list(token);
            setSpeakers(res.speakers);
        } catch (error) {
            console.error('Failed to fetch speakers:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredSpeakers = speakers.filter(speaker => {
        const fullName = `${speaker.firstName} ${speaker.lastName}`.toLowerCase();
        const search = searchTerm.toLowerCase();
        return fullName.includes(search) ||
            (speaker.organization?.toLowerCase() || '').includes(search) ||
            (speaker.email?.toLowerCase() || '').includes(search);
    });

    const resetForm = () => {
        setFormData({ firstName: '', lastName: '', title: '', organization: '', email: '', bio: '', topics: '' });
    };

    const openEditModal = (speaker: Speaker) => {
        setSelectedSpeaker(speaker);
        setFormData({
            firstName: speaker.firstName,
            lastName: speaker.lastName,
            title: speaker.position || '',
            organization: speaker.organization || '',
            email: speaker.email || '',
            bio: speaker.bio || '',
            topics: '', // topics are not stored on speaker level in our simple schema yet
        });
        setShowEditModal(true);
    };

    const handleCreate = async () => {
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('backoffice_token') || '';
            const payload = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                organization: formData.organization,
                position: formData.title,
                bio: formData.bio,
                // topics not supported in basic create for now
            };
            await api.speakers.create(token, payload);
            await fetchSpeakers();
            setShowCreateModal(false);
            resetForm();
        } catch (error) {
            alert('Failed to create speaker');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = async () => {
        if (!selectedSpeaker) return;
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('backoffice_token') || '';
            const payload = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                organization: formData.organization,
                position: formData.title,
                bio: formData.bio,
            };
            await api.speakers.update(token, selectedSpeaker.id, payload);
            await fetchSpeakers();
            setShowEditModal(false);
            setSelectedSpeaker(null);
        } catch (error) {
            alert('Failed to update speaker');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedSpeaker) return;
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('backoffice_token') || '';
            await api.speakers.delete(token, selectedSpeaker.id);
            setSpeakers(speakers.filter(s => s.id !== selectedSpeaker.id));
            setShowDeleteModal(false);
            setSelectedSpeaker(null);
        } catch (error) {
            alert('Failed to delete speaker');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AdminLayout title="Speakers">
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
                </div>

                {/* Loading State */}
                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <IconLoader2 size={32} className="animate-spin text-blue-600" />
                    </div>
                ) : speakers.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        No speakers found. Add one to get started.
                    </div>
                ) : (
                    /* Speaker Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredSpeakers.map((speaker) => (
                            <div key={speaker.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
                                <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0 overflow-hidden">
                                        {speaker.photoUrl ? (
                                            <img src={speaker.photoUrl} alt={speaker.firstName} className="w-full h-full object-cover" />
                                        ) : (
                                            speaker.firstName.charAt(0)
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-semibold text-gray-800 truncate">{speaker.firstName} {speaker.lastName}</h3>
                                                <p className="text-sm text-gray-500">{speaker.position}</p>
                                                <p className="text-xs text-gray-400">{speaker.organization}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="text-sm text-gray-600 line-clamp-2">{speaker.bio}</p>
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                                    <div className="flex gap-2">
                                        {/* Social links placeholders */}
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
                )}
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
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title/Position</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        placeholder="Dean"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    className="input-field"
                                    placeholder="speaker@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                // Make email optional if backend allows, schema says optional().or('')
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
                            <button
                                onClick={() => { setShowCreateModal(false); setShowEditModal(false); }}
                                className="btn-secondary"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={showCreateModal ? handleCreate : handleEdit}
                                className="btn-primary flex items-center gap-2"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <IconLoader2 size={18} className="animate-spin" /> Saving...
                                    </>
                                ) : (
                                    <>
                                        <IconCheck size={18} /> {showCreateModal ? 'Add Speaker' : 'Save Changes'}
                                    </>
                                )}
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
                            <p className="font-semibold text-gray-800">{selectedSpeaker.firstName} {selectedSpeaker.lastName}</p>
                            <p className="text-sm text-gray-500">{selectedSpeaker.organization}</p>
                        </div>
                        <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
                            <button onClick={() => setShowDeleteModal(false)} className="btn-secondary" disabled={isSubmitting}>Cancel</button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
                                disabled={isSubmitting}
                            >
                                {isSubmitting && <IconLoader2 size={18} className="animate-spin" />}
                                Remove Speaker
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
