'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdminLayout } from '@/components/layout';
import {
    IconCalendarEvent,
    IconLayoutGrid,
    IconTicket,
    IconPhoto,
    IconCheck,
    IconArrowLeft,
    IconArrowRight,
    IconPlus,
    IconPencil,
    IconTrash,
    IconX,
} from '@tabler/icons-react';

// Step types
type Step = 1 | 2 | 3 | 4;

// Mock sessions data
const mockSessions = [
    { id: 1, code: 'S01', name: 'Opening Ceremony', description: 'Welcome address', room: 'Grand Ballroom', start: 'Mar 15, 09:00', end: '10:00', capacity: 500 },
    { id: 2, code: 'S02', name: 'Keynote Speech', description: 'Industry trends', room: 'Grand Ballroom', start: 'Mar 15, 10:30', end: '12:00', capacity: 500 },
];

// Mock tickets data
const mockTickets = [
    { id: 1, name: 'Early Bird - Member', description: 'For ACCP members', category: 'primary', price: '฿3,500', quota: 100 },
    { id: 2, name: 'Regular - Public', description: 'General admission', category: 'primary', price: '฿4,500', quota: 200 },
    { id: 3, name: 'Workshop A', description: 'Add-on workshop', category: 'addon', price: '฿1,500', quota: 50 },
];

export default function CreateEventPage() {
    const [currentStep, setCurrentStep] = useState<Step>(1);
    const [showSessionForm, setShowSessionForm] = useState(false);
    const [showTicketModal, setShowTicketModal] = useState(false);

    const steps = [
        { id: 1, icon: IconCalendarEvent, label: 'Event Details' },
        { id: 2, icon: IconLayoutGrid, label: 'Sessions' },
        { id: 3, icon: IconTicket, label: 'Tickets' },
        { id: 4, icon: IconPhoto, label: 'Venue/Images' },
    ];

    const goToStep = (step: Step) => {
        if (step >= 1 && step <= 4) {
            setCurrentStep(step);
        }
    };

    const handleFinish = () => {
        alert('Event created successfully!');
        // In real app, redirect to events list
    };

    return (
        <AdminLayout title="Create New Event">
            {/* Back Button */}
            <div className="mb-4">
                <Link href="/events" className="btn-secondary inline-flex items-center gap-2">
                    <IconArrowLeft size={18} /> Back to Events
                </Link>
            </div>

            {/* Step Progress Wizard */}
            <div className="card mb-6">
                <div className="relative py-4">
                    {/* Progress Line */}
                    <div className="absolute h-1 bg-gray-200 left-[10%] right-[10%] top-[32px] z-0" />
                    <div
                        className="absolute h-1 bg-green-500 left-[10%] top-[32px] z-[1] transition-all duration-300"
                        style={{ width: `${((currentStep - 1) / 3) * 80}%` }}
                    />

                    <div className="flex justify-between relative z-[2]">
                        {steps.map((step) => {
                            const Icon = step.icon;
                            return (
                                <div
                                    key={step.id}
                                    className={`text-center flex-1 cursor-pointer`}
                                    onClick={() => step.id <= currentStep && goToStep(step.id as Step)}
                                >
                                    <div
                                        className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 transition-all
                      ${step.id < currentStep ? 'bg-green-500 text-white' :
                                                step.id === currentStep ? 'bg-blue-600 text-white' :
                                                    'bg-gray-200 text-gray-500'}`}
                                    >
                                        {step.id < currentStep ? <IconCheck size={24} /> : <Icon size={24} stroke={1.5} />}
                                    </div>
                                    <p className={`text-sm font-medium ${step.id === currentStep ? 'text-blue-600' :
                                            step.id < currentStep ? 'text-green-600' : 'text-gray-500'
                                        }`}>
                                        {step.label}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Step 1: Event Details */}
            {currentStep === 1 && (
                <div className="card">
                    <div className="bg-blue-600 text-white px-6 py-4 rounded-t-xl -m-6 mb-6 flex items-center gap-2">
                        <IconCalendarEvent size={20} />
                        <h3 className="text-lg font-semibold">Step 1: Event Details</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Event Code *</label>
                            <input type="text" className="input-field" placeholder="e.g., CONF2026" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                            <select className="input-field">
                                <option value="single_room">Single Room</option>
                                <option value="multi_session">Multi Session</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Name *</label>
                        <input type="text" className="input-field" placeholder="Enter event name" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea className="input-field h-24" placeholder="Event description..." />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                            <input type="datetime-local" className="input-field" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
                            <input type="datetime-local" className="input-field" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location Name</label>
                            <input type="text" className="input-field" placeholder="e.g., Bangkok Convention Center" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Google Maps Link</label>
                            <input type="url" className="input-field" placeholder="https://maps.google.com/..." />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Max Capacity</label>
                            <input type="number" className="input-field" defaultValue={100} min={1} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">CPE Credits</label>
                            <input type="text" className="input-field" placeholder="e.g., 6.00" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select className="input-field">
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
                        <input type="file" className="input-field" accept="image/*" />
                    </div>

                    <hr className="my-6" />

                    <div className="flex justify-end">
                        <button onClick={() => goToStep(2)} className="btn-primary text-lg px-6 py-3 flex items-center gap-2">
                            Save & Continue <IconArrowRight size={20} />
                        </button>
                    </div>
                </div>
            )}

            {/* Step 2: Sessions */}
            {currentStep === 2 && (
                <div className="card">
                    <div className="bg-purple-600 text-white px-6 py-4 rounded-t-xl -m-6 mb-6 flex items-center gap-2">
                        <IconLayoutGrid size={20} />
                        <h3 className="text-lg font-semibold">Step 2: Sessions</h3>
                    </div>

                    <div className="bg-blue-50 text-blue-700 p-4 rounded-lg mb-4 flex items-center gap-2">
                        <IconLayoutGrid size={18} /> Add sessions for your multi-session event
                    </div>

                    {/* Add Session Form */}
                    {showSessionForm && (
                        <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
                            <h4 className="font-semibold mb-4">Add New Session</h4>
                            <div className="grid grid-cols-4 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Session Code *</label>
                                    <input type="text" className="input-field" placeholder="S03" />
                                </div>
                                <div className="col-span-3">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Session Name *</label>
                                    <input type="text" className="input-field" placeholder="Session name" />
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
                                    <input type="text" className="input-field" placeholder="Grand Hall" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time *</label>
                                    <input type="datetime-local" className="input-field" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time *</label>
                                    <input type="datetime-local" className="input-field" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                                    <input type="number" className="input-field" defaultValue={50} />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="btn-primary flex items-center gap-2">
                                    <IconCheck size={18} /> Save Session
                                </button>
                                <button onClick={() => setShowSessionForm(false)} className="btn-secondary">Cancel</button>
                            </div>
                        </div>
                    )}

                    {!showSessionForm && (
                        <button onClick={() => setShowSessionForm(true)} className="btn-secondary mb-4 flex items-center gap-2">
                            <IconPlus size={18} /> Add Session
                        </button>
                    )}

                    {/* Sessions Table */}
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
                                {mockSessions.map((session) => (
                                    <tr key={session.id}>
                                        <td className="font-mono text-sm">{session.code}</td>
                                        <td>
                                            <p className="font-medium">{session.name}</p>
                                            <p className="text-sm text-gray-500">{session.description}</p>
                                        </td>
                                        <td>{session.room}</td>
                                        <td className="text-sm">{session.start}<br />to {session.end}</td>
                                        <td>{session.capacity}</td>
                                        <td>
                                            <button className="p-1.5 hover:bg-gray-100 rounded">
                                                <IconPencil size={18} className="text-gray-600" />
                                            </button>
                                            <button className="p-1.5 hover:bg-red-100 rounded">
                                                <IconTrash size={18} className="text-red-600" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <hr className="my-6" />

                    <div className="flex justify-between">
                        <button onClick={() => goToStep(1)} className="btn-secondary flex items-center gap-2">
                            <IconArrowLeft size={18} /> Back to Event Details
                        </button>
                        <button onClick={() => goToStep(3)} className="btn-primary text-lg px-6 py-3 flex items-center gap-2">
                            Continue <IconArrowRight size={20} />
                        </button>
                    </div>
                </div>
            )}

            {/* Step 3: Tickets */}
            {currentStep === 3 && (
                <div className="card">
                    <div className="bg-yellow-500 text-white px-6 py-4 rounded-t-xl -m-6 mb-6 flex items-center gap-2">
                        <IconTicket size={20} />
                        <h3 className="text-lg font-semibold">Step 3: Tickets</h3>
                    </div>

                    <div className="bg-blue-50 text-blue-700 p-4 rounded-lg mb-4 flex items-center gap-2">
                        <IconTicket size={18} /> Add ticket types for your event (e.g., Early Bird, Member, Public)
                    </div>

                    <button onClick={() => setShowTicketModal(true)} className="btn-secondary mb-4 flex items-center gap-2">
                        <IconPlus size={18} /> Add Ticket Type
                    </button>

                    {/* Tickets Table */}
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
                                {mockTickets.map((ticket) => (
                                    <tr key={ticket.id}>
                                        <td>
                                            <p className="font-medium">{ticket.name}</p>
                                            <p className="text-sm text-gray-500">{ticket.description}</p>
                                        </td>
                                        <td>
                                            <span className={`badge ${ticket.category === 'primary' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                                                {ticket.category === 'primary' ? 'Primary' : 'Add-on'}
                                            </span>
                                        </td>
                                        <td className="font-semibold">{ticket.price}</td>
                                        <td>{ticket.quota}</td>
                                        <td>
                                            <button className="p-1.5 hover:bg-gray-100 rounded">
                                                <IconPencil size={18} className="text-gray-600" />
                                            </button>
                                            <button className="p-1.5 hover:bg-red-100 rounded">
                                                <IconTrash size={18} className="text-red-600" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <hr className="my-6" />

                    <div className="flex justify-between">
                        <button onClick={() => goToStep(2)} className="btn-secondary flex items-center gap-2">
                            <IconArrowLeft size={18} /> Back to Sessions
                        </button>
                        <button onClick={() => goToStep(4)} className="btn-primary text-lg px-6 py-3 flex items-center gap-2">
                            Continue <IconArrowRight size={20} />
                        </button>
                    </div>
                </div>
            )}

            {/* Step 4: Venue/Images */}
            {currentStep === 4 && (
                <div className="card">
                    <div className="bg-green-600 text-white px-6 py-4 rounded-t-xl -m-6 mb-6 flex items-center gap-2">
                        <IconPhoto size={20} />
                        <h3 className="text-lg font-semibold">Step 4: Venue/Images</h3>
                    </div>

                    <div className="bg-blue-50 text-blue-700 p-4 rounded-lg mb-4 flex items-center gap-2">
                        <IconPhoto size={18} /> Upload images of the venue (max 10 images)
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Venue Images</label>
                        <input type="file" className="input-field" multiple accept="image/*" />
                    </div>

                    {/* Image Grid */}
                    <div className="grid grid-cols-4 gap-4 mb-6">
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <div className="h-32 bg-gray-100 flex items-center justify-center">
                                <IconPhoto size={40} className="text-gray-400" />
                            </div>
                            <div className="p-2 text-center">
                                <button className="text-red-600 hover:bg-red-100 p-1 rounded text-sm flex items-center gap-1 mx-auto">
                                    <IconTrash size={14} /> Remove
                                </button>
                            </div>
                        </div>
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <div className="h-32 bg-gray-100 flex items-center justify-center">
                                <IconPhoto size={40} className="text-gray-400" />
                            </div>
                            <div className="p-2 text-center">
                                <button className="text-red-600 hover:bg-red-100 p-1 rounded text-sm flex items-center gap-1 mx-auto">
                                    <IconTrash size={14} /> Remove
                                </button>
                            </div>
                        </div>
                    </div>

                    <hr className="my-6" />

                    <div className="flex justify-between">
                        <button onClick={() => goToStep(3)} className="btn-secondary flex items-center gap-2">
                            <IconArrowLeft size={18} /> Back to Tickets
                        </button>
                        <button onClick={handleFinish} className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700 flex items-center gap-2">
                            <IconCheck size={20} /> Finish
                        </button>
                    </div>
                </div>
            )}

            {/* Add Ticket Modal */}
            {showTicketModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full">
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <IconTicket size={20} /> Add Ticket Type
                                </h3>
                                <button onClick={() => setShowTicketModal(false)} className="text-gray-400 hover:text-gray-600">
                                    <IconX size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ticket Name *</label>
                                <input type="text" className="input-field" placeholder="e.g., Early Bird - Member" />
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <select className="input-field">
                                        <option value="primary">Primary</option>
                                        <option value="addon">Add-on</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (฿)</label>
                                    <input type="number" className="input-field" placeholder="3500" />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Quota</label>
                                <input type="number" className="input-field" defaultValue={100} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea className="input-field h-20" placeholder="Ticket description..." />
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
                            <button onClick={() => setShowTicketModal(false)} className="btn-secondary">Cancel</button>
                            <button onClick={() => { setShowTicketModal(false); alert('Ticket added!'); }} className="btn-primary">
                                Add Ticket
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
