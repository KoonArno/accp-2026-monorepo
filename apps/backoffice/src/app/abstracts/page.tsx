'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout';
import {
    IconFileText,
    IconClock,
    IconCheck,
    IconX,
    IconSearch,
    IconEye,
    IconDownload,
} from '@tabler/icons-react';

// Mock abstract data
const mockAbstracts = [
    {
        id: 'ABS-001',
        title: 'Impact of Clinical Pharmacist Intervention on Medication Adherence in Diabetic Patients',
        author: 'Dr. Somchai Jaidee',
        affiliation: 'Department of Clinical Pharmacy',
        email: 'somchai@hospital.com',
        event: 'ACCP Annual Conference 2026',
        topic: 'Clinical Pharmacy',
        status: 'pending',
        submittedAt: '2026-01-05',
        content: 'This study examines the impact of clinical pharmacist intervention on medication adherence in diabetic patients. A randomized controlled trial was conducted with 200 participants over 6 months.'
    },
    {
        id: 'ABS-002',
        title: 'Machine Learning Approach for Drug-Drug Interaction Prediction',
        author: 'Nattaporn Srisuk',
        affiliation: 'Faculty of Pharmaceutical Sciences',
        email: 'nattaporn@university.edu',
        event: 'ACCP Annual Conference 2026',
        topic: 'Technology',
        status: 'approved',
        submittedAt: '2026-01-03',
        content: 'We present a novel machine learning model for predicting drug-drug interactions based on molecular structure analysis and patient data.'
    },
    {
        id: 'ABS-003',
        title: 'Novel Teaching Methods for Pharmacy Students: A Comparative Study',
        author: 'Dr. Wichai Tanaka',
        affiliation: 'Medical Education Center',
        email: 'wichai@education.org',
        event: 'Medical Innovation Summit',
        topic: 'Education',
        status: 'approved',
        submittedAt: '2025-12-28',
        content: 'This comparative study evaluates the effectiveness of problem-based learning versus traditional lecture methods in pharmacy education.'
    },
    {
        id: 'ABS-004',
        title: 'Antimicrobial Resistance Patterns in Hospital Settings: A 5-Year Review',
        author: 'Supaporn Chai',
        affiliation: 'Infectious Disease Unit',
        email: 'supaporn@hospital.com',
        event: 'ACCP Annual Conference 2026',
        topic: 'Research',
        status: 'rejected',
        submittedAt: '2026-01-01',
        content: 'A retrospective analysis of antimicrobial resistance patterns in a tertiary care hospital over 5 years.'
    },
    {
        id: 'ABS-005',
        title: 'Cost-Effectiveness Analysis of Biologic Therapies in Rheumatoid Arthritis',
        author: 'Piyapong Suwannee',
        affiliation: 'Pharmacoeconomics Department',
        email: 'piyapong@research.org',
        event: 'ACCP Annual Conference 2026',
        topic: 'Research',
        status: 'pending',
        submittedAt: '2026-01-06',
        content: 'Pharmacoeconomic evaluation comparing biologic therapies for rheumatoid arthritis treatment in Thai healthcare setting.'
    },
];

const statusColors: { [key: string]: string } = {
    pending: 'badge-warning',
    approved: 'badge-success',
    rejected: 'badge-error',
    under_review: 'badge-info',
};

const topicColors: { [key: string]: string } = {
    'Clinical Pharmacy': 'bg-blue-100 text-blue-800',
    'Technology': 'bg-purple-100 text-purple-800',
    'Education': 'bg-green-100 text-green-800',
    'Research': 'bg-gray-100 text-gray-800',
};

interface Abstract {
    id: string;
    title: string;
    author: string;
    affiliation: string;
    email: string;
    event: string;
    topic: string;
    status: string;
    submittedAt: string;
    content: string;
}

export default function AbstractsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [topicFilter, setTopicFilter] = useState('');
    const [selectedAbstract, setSelectedAbstract] = useState<Abstract | null>(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);

    const filteredAbstracts = mockAbstracts.filter((abs) => {
        const matchesSearch =
            abs.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            abs.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            abs.id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = !statusFilter || abs.status === statusFilter;
        const matchesTopic = !topicFilter || abs.topic === topicFilter;

        return matchesSearch && matchesStatus && matchesTopic;
    });

    const stats = {
        total: mockAbstracts.length,
        pending: mockAbstracts.filter(a => a.status === 'pending').length,
        approved: mockAbstracts.filter(a => a.status === 'approved').length,
        rejected: mockAbstracts.filter(a => a.status === 'rejected').length,
    };

    const handleApprove = () => {
        setShowApproveModal(false);
        setSelectedAbstract(null);
        alert('Abstract approved successfully!');
    };

    const handleReject = () => {
        setShowRejectModal(false);
        setSelectedAbstract(null);
        alert('Abstract rejected.');
    };

    return (
        <AdminLayout title="Abstract Submissions">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="card py-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                            <IconFileText size={24} stroke={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                            <p className="text-sm text-gray-500">Total Submissions</p>
                        </div>
                    </div>
                </div>
                <div className="card py-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600">
                            <IconClock size={24} stroke={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                            <p className="text-sm text-gray-500">Pending Review</p>
                        </div>
                    </div>
                </div>
                <div className="card py-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                            <IconCheck size={24} stroke={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                            <p className="text-sm text-gray-500">Approved</p>
                        </div>
                    </div>
                </div>
                <div className="card py-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600">
                            <IconX size={24} stroke={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                            <p className="text-sm text-gray-500">Rejected</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="card">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">All Submissions</h2>
                    <button className="btn-secondary flex items-center gap-2">
                        <IconDownload size={18} /> Export
                    </button>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1 max-w-md">
                        <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by title, author, or ID..."
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
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>

                    <select
                        value={topicFilter}
                        onChange={(e) => setTopicFilter(e.target.value)}
                        className="input-field w-auto"
                    >
                        <option value="">All Topics</option>
                        <option value="Clinical Pharmacy">Clinical Pharmacy</option>
                        <option value="Research">Research</option>
                        <option value="Education">Education</option>
                        <option value="Technology">Technology</option>
                    </select>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th className="min-w-[300px]">Title & Author</th>
                                <th>Topic</th>
                                <th>Status</th>
                                <th>Submitted</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAbstracts.map((abs) => (
                                <tr key={abs.id} className="animate-fade-in">
                                    <td className="font-mono text-sm text-gray-600">{abs.id}</td>
                                    <td>
                                        <h5 className="font-medium text-gray-800 mb-1">{abs.title}</h5>
                                        <p className="text-sm text-gray-500">{abs.author}, {abs.affiliation}</p>
                                    </td>
                                    <td>
                                        <span className={`badge ${topicColors[abs.topic] || 'bg-gray-100 text-gray-800'}`}>
                                            {abs.topic}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge ${statusColors[abs.status]}`}>
                                            {abs.status.charAt(0).toUpperCase() + abs.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="text-gray-500 text-sm">{abs.submittedAt}</td>
                                    <td className="text-center">
                                        <div className="flex gap-1 justify-center">
                                            <button
                                                className="p-1.5 hover:bg-gray-100 rounded text-gray-600"
                                                title="View"
                                                onClick={() => { setSelectedAbstract(abs); setShowViewModal(true); }}
                                            >
                                                <IconEye size={18} />
                                            </button>
                                            {abs.status === 'pending' && (
                                                <>
                                                    <button
                                                        className="p-1.5 hover:bg-green-100 rounded text-green-600"
                                                        title="Approve"
                                                        onClick={() => { setSelectedAbstract(abs); setShowApproveModal(true); }}
                                                    >
                                                        <IconCheck size={18} />
                                                    </button>
                                                    <button
                                                        className="p-1.5 hover:bg-red-100 rounded text-red-600"
                                                        title="Reject"
                                                        onClick={() => { setSelectedAbstract(abs); setShowRejectModal(true); }}
                                                    >
                                                        <IconX size={18} />
                                                    </button>
                                                </>
                                            )}
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
                        Showing {filteredAbstracts.length} of {mockAbstracts.length} abstracts
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
            {showViewModal && selectedAbstract && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">Abstract Details</h3>
                                <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-gray-600">
                                    <IconX size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex gap-2 mb-4">
                                <span className="badge bg-gray-100 text-gray-700">{selectedAbstract.id}</span>
                                <span className={`badge ${statusColors[selectedAbstract.status]}`}>
                                    {selectedAbstract.status.charAt(0).toUpperCase() + selectedAbstract.status.slice(1)}
                                </span>
                            </div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">{selectedAbstract.title}</h4>
                            <p className="text-gray-600 mb-4"><strong>{selectedAbstract.author}</strong>, {selectedAbstract.affiliation}</p>

                            <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
                                <div><strong>Event:</strong> {selectedAbstract.event}</div>
                                <div><strong>Topic:</strong> {selectedAbstract.topic}</div>
                                <div><strong>Submitted:</strong> {selectedAbstract.submittedAt}</div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h5 className="font-semibold mb-2">Abstract:</h5>
                                <p className="text-gray-600">{selectedAbstract.content}</p>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
                            <button onClick={() => setShowViewModal(false)} className="btn-secondary">Close</button>
                            {selectedAbstract.status === 'pending' && (
                                <>
                                    <button
                                        onClick={() => { setShowViewModal(false); setShowApproveModal(true); }}
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                                    >
                                        <IconCheck size={18} /> Approve
                                    </button>
                                    <button
                                        onClick={() => { setShowViewModal(false); setShowRejectModal(true); }}
                                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
                                    >
                                        <IconX size={18} /> Reject
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Approve Modal */}
            {showApproveModal && selectedAbstract && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full">
                        <div className="p-6 bg-green-600 rounded-t-2xl">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <IconCheck size={20} /> Approve Abstract
                            </h3>
                        </div>
                        <div className="p-6 text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <IconCheck size={32} className="text-green-600" />
                            </div>
                            <p className="mb-2">Approve this abstract for presentation?</p>
                            <p className="font-semibold text-gray-800">{selectedAbstract.title.substring(0, 50)}...</p>

                            <div className="mt-4 text-left">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Presentation Type</label>
                                <select className="input-field">
                                    <option>Oral Presentation</option>
                                    <option>Poster Presentation</option>
                                </select>
                            </div>

                            <div className="mt-4 text-left">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Comments (optional)</label>
                                <textarea className="input-field h-20" placeholder="Reviewer comments..."></textarea>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
                            <button onClick={() => setShowApproveModal(false)} className="btn-secondary">Cancel</button>
                            <button onClick={handleApprove} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                                Approve
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Reject Modal */}
            {showRejectModal && selectedAbstract && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full">
                        <div className="p-6 bg-red-600 rounded-t-2xl">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <IconX size={20} /> Reject Abstract
                            </h3>
                        </div>
                        <div className="p-6 text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <IconX size={32} className="text-red-600" />
                            </div>
                            <p className="mb-2">Reject this abstract?</p>
                            <p className="font-semibold text-gray-800">{selectedAbstract.title.substring(0, 50)}...</p>

                            <div className="mt-4 text-left">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Rejection Reason <span className="text-red-500">*</span></label>
                                <select className="input-field">
                                    <option value="">Select reason...</option>
                                    <option>Out of scope</option>
                                    <option>Quality concerns</option>
                                    <option>Duplicate submission</option>
                                    <option>Incomplete information</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div className="mt-4 text-left">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Comments</label>
                                <textarea className="input-field h-20" placeholder="Provide feedback to the author..."></textarea>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
                            <button onClick={() => setShowRejectModal(false)} className="btn-secondary">Cancel</button>
                            <button onClick={handleReject} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                                Reject
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
