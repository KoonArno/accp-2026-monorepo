'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { AdminLayout } from '@/components/layout';
import { api } from '@/lib/api';
import {
    IconCalendarEvent,
    IconLayoutGrid,
    IconTicket,
    IconPhoto,
    IconArrowLeft,
    IconCheck,
    IconPlus,
    IconTrash,
    IconX,
    IconLoader2,
} from '@tabler/icons-react';

// Types
interface SessionData {
    id?: number;
    sessionCode: string;
    sessionName: string;
    description: string;
    room: string;
    startTime: string;
    endTime: string;
    maxCapacity: number;
    isNew?: boolean;
}

interface TicketData {
    id?: number;
    name: string;
    category: 'primary' | 'addon';
    price: string;
    quota: number;
    isNew?: boolean;
}

interface VenueImage {
    id?: number;
    imageUrl: string;
    caption: string;
    isNew?: boolean;
}

interface EventFormData {
    eventCode: string;
    eventName: string;
    description: string;
    eventType: 'single_room' | 'multi_session';
    location: string;
    mapUrl: string;
    startDate: string;
    endDate: string;
    maxCapacity: number;
    conferenceCode: string;
    cpeCredits: string;
    status: 'draft' | 'published' | 'cancelled' | 'completed';
}

// Helper to convert ISO date to datetime-local format
const toDateTimeLocal = (isoString: string): string => {
    if (!isoString) return '';
    try {
        const date = new Date(isoString);
        return date.toISOString().slice(0, 16);
    } catch {
        return '';
    }
};

// Helper function to format datetime
const formatDateTime = (dateTimeStr: string): string => {
    if (!dateTimeStr) return '-';
    try {
        const date = new Date(dateTimeStr);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    } catch {
        return dateTimeStr;
    }
};

export default function EditEventPage() {
    const router = useRouter();
    const params = useParams();
    const eventId = params.id as string;

    const [activeTab, setActiveTab] = useState<'details' | 'sessions' | 'tickets' | 'venue'>('details');
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    // Form data
    const [formData, setFormData] = useState<EventFormData>({
        eventCode: '',
        eventName: '',
        description: '',
        eventType: 'single_room',
        location: '',
        mapUrl: '',
        startDate: '',
        endDate: '',
        maxCapacity: 100,
        conferenceCode: '',
        cpeCredits: '',
        status: 'draft',
    });

    // Sessions, Tickets, Images
    const [sessions, setSessions] = useState<SessionData[]>([]);
    const [tickets, setTickets] = useState<TicketData[]>([]);
    const [venueImages, setVenueImages] = useState<VenueImage[]>([]);

    // Modals
    const [showSessionForm, setShowSessionForm] = useState(false);
    const [showTicketModal, setShowTicketModal] = useState(false);

    // Session form
    const [sessionForm, setSessionForm] = useState<SessionData>({
        sessionCode: '',
        sessionName: '',
        description: '',
        room: '',
        startTime: '',
        endTime: '',
        maxCapacity: 50,
    });

    // Ticket form
    const [ticketForm, setTicketForm] = useState<TicketData>({
        name: '',
        category: 'primary',
        price: '',
        quota: 100,
    });

    const shouldShowSessions = formData.eventType === 'multi_session';

    // Fetch existing event data
    useEffect(() => {
        const fetchEvent = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem('backoffice_token') || '';
                const response = await api.backofficeEvents.get(token, parseInt(eventId));
                const event = response.event;

                setFormData({
                    eventCode: event.eventCode || '',
                    eventName: event.eventName || '',
                    description: event.description || '',
                    eventType: event.eventType || 'single_room',
                    location: event.location || '',
                    mapUrl: event.mapUrl || '',
                    startDate: toDateTimeLocal(event.startDate),
                    endDate: toDateTimeLocal(event.endDate),
                    maxCapacity: event.maxCapacity || 100,
                    conferenceCode: event.conferenceCode || '',
                    cpeCredits: event.cpeCredits || '',
                    status: event.status || 'draft',
                });

                // Load sessions
                if (response.sessions) {
                    setSessions(response.sessions.map((s: any) => ({
                        id: s.id,
                        sessionCode: s.sessionCode,
                        sessionName: s.sessionName,
                        description: s.description || '',
                        room: s.room || '',
                        startTime: toDateTimeLocal(s.startTime),
                        endTime: toDateTimeLocal(s.endTime),
                        maxCapacity: s.maxCapacity || 50,
                    })));
                }

                // Load tickets
                if (response.tickets) {
                    setTickets(response.tickets.map((t: any) => ({
                        id: t.id,
                        name: t.name,
                        category: t.category,
                        price: t.price,
                        quota: t.quota,
                    })));
                }

                // Load venue images
                if (response.venueImages) {
                    setVenueImages(response.venueImages.map((img: any) => ({
                        id: img.id,
                        imageUrl: img.imageUrl,
                        caption: img.caption || '',
                    })));
                }
            } catch (err: any) {
                setError(err.message || 'Failed to fetch event');
            } finally {
                setIsLoading(false);
            }
        };

        if (eventId) {
            fetchEvent();
        }
    }, [eventId]);

    // Add session
    const handleAddSession = async () => {
        if (!sessionForm.sessionCode || !sessionForm.sessionName) return;
        try {
            const token = localStorage.getItem('backoffice_token') || '';
            const response = await api.backofficeEvents.createSession(token, parseInt(eventId), {
                sessionCode: sessionForm.sessionCode,
                sessionName: sessionForm.sessionName,
                description: sessionForm.description || undefined,
                room: sessionForm.room || undefined,
                startTime: new Date(sessionForm.startTime).toISOString(),
                endTime: new Date(sessionForm.endTime).toISOString(),
                maxCapacity: sessionForm.maxCapacity,
            });
            setSessions(prev => [...prev, { ...response.session, startTime: toDateTimeLocal(response.session.startTime), endTime: toDateTimeLocal(response.session.endTime) }]);
            setSessionForm({ sessionCode: '', sessionName: '', description: '', room: '', startTime: '', endTime: '', maxCapacity: 50 });
            setShowSessionForm(false);
        } catch (err: any) {
            alert(err.message || 'Failed to add session');
        }
    };

    // Delete session
    const handleDeleteSession = async (id: number) => {
        if (!confirm('Delete this session?')) return;
        try {
            const token = localStorage.getItem('backoffice_token') || '';
            await api.backofficeEvents.deleteSession(token, parseInt(eventId), id);
            setSessions(prev => prev.filter(s => s.id !== id));
        } catch (err: any) {
            alert(err.message || 'Failed to delete session');
        }
    };

    // Add ticket
    const handleAddTicket = async () => {
        if (!ticketForm.name || !ticketForm.price) return;
        try {
            const token = localStorage.getItem('backoffice_token') || '';
            const response = await api.backofficeEvents.createTicket(token, parseInt(eventId), {
                name: ticketForm.name,
                category: ticketForm.category,
                price: ticketForm.price,
                quota: ticketForm.quota,
            });
            setTickets(prev => [...prev, response.ticket]);
            setTicketForm({ name: '', category: 'primary', price: '', quota: 100 });
            setShowTicketModal(false);
        } catch (err: any) {
            alert(err.message || 'Failed to add ticket');
        }
    };

    // Delete ticket
    const handleDeleteTicket = async (id: number) => {
        if (!confirm('Delete this ticket?')) return;
        try {
            const token = localStorage.getItem('backoffice_token') || '';
            await api.backofficeEvents.deleteTicket(token, parseInt(eventId), id);
            setTickets(prev => prev.filter(t => t.id !== id));
        } catch (err: any) {
            alert(err.message || 'Failed to delete ticket');
        }
    };

    // Delete venue image
    const handleDeleteImage = async (id: number) => {
        if (!confirm('Delete this image?')) return;
        try {
            const token = localStorage.getItem('backoffice_token') || '';
            await api.backofficeEvents.deleteImage(token, parseInt(eventId), id);
            setVenueImages(prev => prev.filter(img => img.id !== id));
        } catch (err: any) {
            alert(err.message || 'Failed to delete image');
        }
    };

    // Save event details
    const handleSaveDetails = async () => {
        setError('');
        setIsSubmitting(true);

        try {
            const token = localStorage.getItem('backoffice_token') || '';
            const eventData = {
                eventCode: formData.eventCode,
                eventName: formData.eventName,
                description: formData.description || undefined,
                eventType: formData.eventType,
                location: formData.location || undefined,
                mapUrl: formData.mapUrl || undefined,
                startDate: new Date(formData.startDate).toISOString(),
                endDate: new Date(formData.endDate).toISOString(),
                maxCapacity: formData.maxCapacity,
                conferenceCode: formData.conferenceCode || undefined,
                cpeCredits: formData.cpeCredits || undefined,
                status: formData.status,
            };

            await api.backofficeEvents.update(token, parseInt(eventId), eventData);
            alert('Event details saved!');
        } catch (err: any) {
            setError(err.message || 'Failed to save event');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <AdminLayout title="Edit Event">
                <div className="flex items-center justify-center py-12">
                    <IconLoader2 size={32} className="animate-spin text-blue-600" />
                    <span className="ml-2 text-gray-500">Loading event...</span>
                </div>
            </AdminLayout>
        );
    }

    const tabs = [
        { id: 'details', label: 'Event Details', icon: IconCalendarEvent },
        ...(shouldShowSessions ? [{ id: 'sessions', label: 'Sessions', icon: IconLayoutGrid }] : []),
        { id: 'tickets', label: 'Tickets', icon: IconTicket },
        { id: 'venue', label: 'Venue/Images', icon: IconPhoto },
    ];

    return (
        <AdminLayout title={`Edit Event`}>
            {/* Back Button */}
            <div className="mb-4">
                <Link href="/events" className="btn-secondary inline-flex items-center gap-2">
                    <IconArrowLeft size={18} /> Back to Events
                </Link>
            </div>

            {/* Prominent Header Banner */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-6 mb-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                            <IconCalendarEvent size={32} />
                        </div>
                        <div>
                            <p className="text-blue-200 text-sm font-medium mb-1">{formData.eventCode}</p>
                            <h1 className="text-2xl font-bold">{formData.eventName || 'Untitled Event'}</h1>
                            <p className="text-blue-200 text-sm mt-1">
                                {formData.location || 'No location set'} • {formData.conferenceCode && `CPE: ${formData.conferenceCode}`}
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${formData.status === 'published' ? 'bg-green-500' :
                                formData.status === 'draft' ? 'bg-yellow-500' :
                                    formData.status === 'cancelled' ? 'bg-red-500' : 'bg-gray-500'
                            }`}>
                            {formData.status.charAt(0).toUpperCase() + formData.status.slice(1)}
                        </span>
                        <p className="text-blue-200 text-sm mt-2">
                            {formData.startDate && new Date(formData.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${activeTab === tab.id
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                }`}
                        >
                            <Icon size={18} />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-4">
                    {error}
                </div>
            )}

            {/* Event Details Tab */}
            {activeTab === 'details' && (
                <div className="card">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Event Code *</label>
                            <input
                                type="text"
                                className="input-field"
                                value={formData.eventCode}
                                onChange={(e) => setFormData(prev => ({ ...prev, eventCode: e.target.value }))}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                            <select
                                className="input-field"
                                value={formData.eventType}
                                onChange={(e) => setFormData(prev => ({ ...prev, eventType: e.target.value as any }))}
                            >
                                <option value="single_room">Single Room</option>
                                <option value="multi_session">Multi Session</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Name *</label>
                        <input
                            type="text"
                            className="input-field"
                            value={formData.eventName}
                            onChange={(e) => setFormData(prev => ({ ...prev, eventName: e.target.value }))}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            className="input-field h-24"
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                            <input
                                type="datetime-local"
                                className="input-field"
                                value={formData.startDate}
                                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
                            <input
                                type="datetime-local"
                                className="input-field"
                                value={formData.endDate}
                                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <input
                                type="text"
                                className="input-field"
                                value={formData.location}
                                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Google Maps Link</label>
                            <input
                                type="url"
                                className="input-field"
                                value={formData.mapUrl}
                                onChange={(e) => setFormData(prev => ({ ...prev, mapUrl: e.target.value }))}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Max Capacity</label>
                            <input
                                type="number"
                                className="input-field"
                                value={formData.maxCapacity}
                                onChange={(e) => setFormData(prev => ({ ...prev, maxCapacity: parseInt(e.target.value) || 100 }))}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Conference Code (CPE)</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="e.g., ACCP2026"
                                value={formData.conferenceCode}
                                onChange={(e) => setFormData(prev => ({ ...prev, conferenceCode: e.target.value }))}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">CPE Credits</label>
                            <input
                                type="text"
                                className="input-field"
                                value={formData.cpeCredits}
                                onChange={(e) => setFormData(prev => ({ ...prev, cpeCredits: e.target.value }))}
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            className="input-field w-48"
                            value={formData.status}
                            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <hr className="my-6" />

                    <div className="flex justify-end">
                        <button
                            onClick={handleSaveDetails}
                            disabled={isSubmitting}
                            className="btn-primary flex items-center gap-2"
                        >
                            {isSubmitting ? <IconLoader2 size={18} className="animate-spin" /> : <IconCheck size={18} />}
                            Save Changes
                        </button>
                    </div>
                </div>
            )}

            {/* Sessions Tab */}
            {activeTab === 'sessions' && shouldShowSessions && (
                <div className="card">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Sessions</h3>
                        <button onClick={() => setShowSessionForm(true)} className="btn-primary flex items-center gap-2">
                            <IconPlus size={18} /> Add Session
                        </button>
                    </div>

                    {/* Add Session Form */}
                    {showSessionForm && (
                        <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
                            <h4 className="font-semibold mb-4">Add New Session</h4>
                            <div className="grid grid-cols-4 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Session Code *</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        placeholder="S01"
                                        value={sessionForm.sessionCode}
                                        onChange={(e) => setSessionForm(prev => ({ ...prev, sessionCode: e.target.value }))}
                                    />
                                </div>
                                <div className="col-span-3">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Session Name *</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        value={sessionForm.sessionName}
                                        onChange={(e) => setSessionForm(prev => ({ ...prev, sessionName: e.target.value }))}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        value={sessionForm.room}
                                        onChange={(e) => setSessionForm(prev => ({ ...prev, room: e.target.value }))}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time *</label>
                                    <input
                                        type="datetime-local"
                                        className="input-field"
                                        value={sessionForm.startTime}
                                        onChange={(e) => setSessionForm(prev => ({ ...prev, startTime: e.target.value }))}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time *</label>
                                    <input
                                        type="datetime-local"
                                        className="input-field"
                                        value={sessionForm.endTime}
                                        onChange={(e) => setSessionForm(prev => ({ ...prev, endTime: e.target.value }))}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                                    <input
                                        type="number"
                                        className="input-field"
                                        value={sessionForm.maxCapacity}
                                        onChange={(e) => setSessionForm(prev => ({ ...prev, maxCapacity: parseInt(e.target.value) || 50 }))}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={handleAddSession} className="btn-primary flex items-center gap-2">
                                    <IconCheck size={18} /> Save Session
                                </button>
                                <button onClick={() => setShowSessionForm(false)} className="btn-secondary">Cancel</button>
                            </div>
                        </div>
                    )}

                    {/* Sessions Table */}
                    {sessions.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Code</th>
                                        <th>Session Name</th>
                                        <th>Room</th>
                                        <th>Time</th>
                                        <th>Capacity</th>
                                        <th className="w-24">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sessions.map((session) => (
                                        <tr key={session.id}>
                                            <td className="font-mono text-sm">{session.sessionCode}</td>
                                            <td>{session.sessionName}</td>
                                            <td>{session.room || '-'}</td>
                                            <td className="text-sm">{formatDateTime(session.startTime)}</td>
                                            <td>{session.maxCapacity}</td>
                                            <td>
                                                <button
                                                    onClick={() => handleDeleteSession(session.id!)}
                                                    className="p-1.5 hover:bg-red-100 rounded"
                                                >
                                                    <IconTrash size={18} className="text-red-600" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            No sessions yet. Click "Add Session" to create one.
                        </div>
                    )}
                </div>
            )}

            {/* Tickets Tab */}
            {activeTab === 'tickets' && (
                <div className="card">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Ticket Types</h3>
                        <button onClick={() => setShowTicketModal(true)} className="btn-primary flex items-center gap-2">
                            <IconPlus size={18} /> Add Ticket
                        </button>
                    </div>

                    {tickets.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Ticket Name</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Quota</th>
                                        <th className="w-24">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tickets.map((ticket) => (
                                        <tr key={ticket.id}>
                                            <td className="font-medium">{ticket.name}</td>
                                            <td>
                                                <span className={`badge ${ticket.category === 'primary' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                                                    {ticket.category === 'primary' ? 'Primary' : 'Add-on'}
                                                </span>
                                            </td>
                                            <td className="font-semibold">฿{ticket.price}</td>
                                            <td>{ticket.quota}</td>
                                            <td>
                                                <button
                                                    onClick={() => handleDeleteTicket(ticket.id!)}
                                                    className="p-1.5 hover:bg-red-100 rounded"
                                                >
                                                    <IconTrash size={18} className="text-red-600" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            No tickets yet. Click "Add Ticket" to create one.
                        </div>
                    )}
                </div>
            )}

            {/* Venue/Images Tab */}
            {activeTab === 'venue' && (
                <div className="card">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Venue Images</h3>
                    </div>

                    <div className="bg-blue-50 text-blue-700 p-4 rounded-lg mb-4 flex items-center gap-2">
                        <IconPhoto size={18} /> Upload images of the venue
                    </div>

                    {venueImages.length > 0 ? (
                        <div className="grid grid-cols-4 gap-4">
                            {venueImages.map((img) => (
                                <div key={img.id} className="border border-gray-200 rounded-lg overflow-hidden">
                                    <div className="h-32 bg-gray-100 flex items-center justify-center">
                                        <img src={img.imageUrl} alt={img.caption} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="p-2 text-center">
                                        <button
                                            onClick={() => handleDeleteImage(img.id!)}
                                            className="text-red-600 hover:bg-red-100 p-1 rounded text-sm flex items-center gap-1 mx-auto"
                                        >
                                            <IconTrash size={14} /> Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            No venue images yet.
                        </div>
                    )}
                </div>
            )}

            {/* Add Ticket Modal */}
            {showTicketModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full">
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">Add Ticket Type</h3>
                                <button onClick={() => setShowTicketModal(false)} className="text-gray-400 hover:text-gray-600">
                                    <IconX size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ticket Name *</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="e.g., Early Bird"
                                    value={ticketForm.name}
                                    onChange={(e) => setTicketForm(prev => ({ ...prev, name: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select
                                    className="input-field"
                                    value={ticketForm.category}
                                    onChange={(e) => setTicketForm(prev => ({ ...prev, category: e.target.value as 'primary' | 'addon' }))}
                                >
                                    <option value="primary">Primary</option>
                                    <option value="addon">Add-on</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (THB) *</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        placeholder="0.00"
                                        value={ticketForm.price}
                                        onChange={(e) => setTicketForm(prev => ({ ...prev, price: e.target.value }))}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Quota *</label>
                                    <input
                                        type="number"
                                        className="input-field"
                                        value={ticketForm.quota}
                                        onChange={(e) => setTicketForm(prev => ({ ...prev, quota: parseInt(e.target.value) || 100 }))}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
                            <button onClick={() => setShowTicketModal(false)} className="btn-secondary">Cancel</button>
                            <button onClick={handleAddTicket} className="btn-primary flex items-center gap-2">
                                <IconCheck size={18} /> Add Ticket
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
