'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout';
import {
    IconId,
    IconClock,
    IconCheck,
    IconX,
    IconSearch,
    IconEye,
    IconDownload,
    IconFileText,
    IconPhoto,
} from '@tabler/icons-react';

// Mock verification requests
const mockVerifications = [
    {
        id: 'VER-001',
        name: 'นัฐพร ศรีสุข',
        email: 'nattaporn@student.com',
        university: 'Chulalongkorn University',
        studentId: '6532123456',
        role: 'thai-student',
        documentType: 'Student ID Card',
        documentUrl: '/images/small/small-1.jpg',
        registrationCode: 'REG-002',
        status: 'pending',
        submittedAt: '2026-01-09 10:30',
    },
    {
        id: 'VER-002',
        name: 'John Smith',
        email: 'john.smith@stanford.edu',
        university: 'Stanford University',
        studentId: 'STU2024001',
        role: 'intl-student',
        documentType: 'University Enrollment Letter',
        documentUrl: '/images/small/small-2.jpg',
        registrationCode: 'REG-003',
        status: 'pending',
        submittedAt: '2026-01-09 09:15',
    },
    {
        id: 'VER-003',
        name: 'ปิยะพงษ์ สุวรรณี',
        email: 'piyapong@student.com',
        university: 'Mahidol University',
        studentId: '6543210987',
        role: 'thai-student',
        documentType: 'Student ID Card',
        documentUrl: '/images/small/small-3.jpg',
        registrationCode: 'REG-007',
        status: 'approved',
        submittedAt: '2026-01-08 14:20',
        verifiedAt: '2026-01-08 15:00',
        verifiedBy: 'Admin User',
    },
    {
        id: 'VER-004',
        name: 'Sarah Johnson',
        email: 's.johnson@mit.edu',
        university: 'MIT',
        studentId: 'MIT2024567',
        role: 'intl-student',
        documentType: 'Student ID Card',
        documentUrl: '/images/small/small-4.jpg',
        registrationCode: 'REG-010',
        status: 'rejected',
        submittedAt: '2026-01-07 11:00',
        verifiedAt: '2026-01-07 13:30',
        verifiedBy: 'Admin User',
        rejectionReason: 'Document expired',
    },
    {
        id: 'VER-005',
        name: 'มานี รักเรียน',
        email: 'manee@student.com',
        university: 'Kasetsart University',
        studentId: '6512345678',
        role: 'thai-student',
        documentType: 'Enrollment Certificate',
        documentUrl: '/images/small/small-5.jpg',
        registrationCode: 'REG-015',
        status: 'pending',
        submittedAt: '2026-01-09 08:00',
    },
];

const statusColors: { [key: string]: string } = {
    pending: 'badge-warning',
    approved: 'badge-success',
    rejected: 'badge-error',
};

const roleLabels: { [key: string]: { label: string; className: string } } = {
    'thai-student': { label: 'Thai Student', className: 'bg-green-100 text-green-800' },
    'intl-student': { label: 'International Student', className: 'bg-orange-100 text-orange-800' },
};

interface Verification {
    id: string;
    name: string;
    email: string;
    university: string;
    studentId: string;
    role: string;
    documentType: string;
    documentUrl: string;
    registrationCode: string;
    status: string;
    submittedAt: string;
    verifiedAt?: string;
    verifiedBy?: string;
    rejectionReason?: string;
}

export default function VerificationPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [selectedVerification, setSelectedVerification] = useState<Verification | null>(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');

    const filteredVerifications = mockVerifications.filter((v) => {
        const matchesSearch =
            v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.registrationCode.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = !statusFilter || v.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const stats = {
        total: mockVerifications.length,
        pending: mockVerifications.filter(v => v.status === 'pending').length,
        approved: mockVerifications.filter(v => v.status === 'approved').length,
        rejected: mockVerifications.filter(v => v.status === 'rejected').length,
    };

    const handleApprove = () => {
        setShowApproveModal(false);
        setSelectedVerification(null);
        alert('Student verification approved! Registration ticket updated to student rate.');
    };

    const handleReject = () => {
        setShowRejectModal(false);
        setSelectedVerification(null);
        setRejectionReason('');
        alert('Verification rejected. User will be notified to resubmit documents.');
    };

    return (
        <AdminLayout title="Student Verification">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="card py-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                            <IconId size={24} stroke={1.5} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                            <p className="text-sm text-gray-500">Total Requests</p>
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
                    <h2 className="text-lg font-semibold text-gray-800">Verification Requests</h2>
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
                            placeholder="Search by name, email, or ID..."
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
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Student Info</th>
                                <th>University</th>
                                <th>Document</th>
                                <th>Status</th>
                                <th>Submitted</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredVerifications.map((v) => (
                                <tr key={v.id} className="animate-fade-in">
                                    <td className="font-mono text-sm text-gray-600">{v.id}</td>
                                    <td>
                                        <div>
                                            <p className="font-medium text-gray-800">{v.name}</p>
                                            <p className="text-sm text-gray-500">{v.email}</p>
                                            <span className={`badge text-xs mt-1 ${roleLabels[v.role]?.className}`}>
                                                {roleLabels[v.role]?.label}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <p className="text-gray-800">{v.university}</p>
                                        <p className="text-sm text-gray-500">ID: {v.studentId}</p>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <IconFileText size={16} className="text-gray-400" />
                                            <span className="text-sm">{v.documentType}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`badge ${statusColors[v.status]}`}>
                                            {v.status.charAt(0).toUpperCase() + v.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="text-gray-500 text-sm">{v.submittedAt}</td>
                                    <td>
                                        <div className="flex gap-1 justify-center">
                                            <button
                                                className="p-1.5 hover:bg-gray-100 rounded text-gray-600"
                                                title="View Document"
                                                onClick={() => { setSelectedVerification(v); setShowViewModal(true); }}
                                            >
                                                <IconEye size={18} />
                                            </button>
                                            {v.status === 'pending' && (
                                                <>
                                                    <button
                                                        className="p-1.5 hover:bg-green-100 rounded text-green-600"
                                                        title="Approve"
                                                        onClick={() => { setSelectedVerification(v); setShowApproveModal(true); }}
                                                    >
                                                        <IconCheck size={18} />
                                                    </button>
                                                    <button
                                                        className="p-1.5 hover:bg-red-100 rounded text-red-600"
                                                        title="Reject"
                                                        onClick={() => { setSelectedVerification(v); setShowRejectModal(true); }}
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
                        Showing {filteredVerifications.length} of {mockVerifications.length} requests
                    </p>
                </div>
            </div>

            {/* View Modal */}
            {showViewModal && selectedVerification && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <IconId size={20} /> Verification Details
                                </h3>
                                <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-gray-600">
                                    <IconX size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex gap-2 mb-4">
                                <span className="badge bg-gray-100 text-gray-700">{selectedVerification.id}</span>
                                <span className={`badge ${statusColors[selectedVerification.status]}`}>
                                    {selectedVerification.status}
                                </span>
                                <span className={`badge ${roleLabels[selectedVerification.role]?.className}`}>
                                    {roleLabels[selectedVerification.role]?.label}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <p className="text-sm text-gray-500">Full Name</p>
                                    <p className="font-semibold">{selectedVerification.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p>{selectedVerification.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">University</p>
                                    <p className="font-semibold">{selectedVerification.university}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Student ID</p>
                                    <p className="font-mono">{selectedVerification.studentId}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Registration Code</p>
                                    <p className="font-mono">{selectedVerification.registrationCode}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Submitted</p>
                                    <p>{selectedVerification.submittedAt}</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h5 className="font-semibold mb-3 flex items-center gap-2">
                                    <IconPhoto size={18} /> Uploaded Document
                                </h5>
                                <p className="text-sm text-gray-500 mb-2">{selectedVerification.documentType}</p>
                                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                                    <img
                                        src={selectedVerification.documentUrl}
                                        alt="Document"
                                        className="w-full h-64 object-contain"
                                    />
                                </div>
                            </div>

                            {selectedVerification.status === 'rejected' && selectedVerification.rejectionReason && (
                                <div className="mt-4 bg-red-50 p-4 rounded-lg">
                                    <p className="text-sm font-semibold text-red-800">Rejection Reason:</p>
                                    <p className="text-red-700">{selectedVerification.rejectionReason}</p>
                                </div>
                            )}
                        </div>
                        <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
                            <button onClick={() => setShowViewModal(false)} className="btn-secondary">Close</button>
                            {selectedVerification.status === 'pending' && (
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
            {showApproveModal && selectedVerification && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full">
                        <div className="p-6 bg-green-600 rounded-t-2xl">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <IconCheck size={20} /> Approve Verification
                            </h3>
                        </div>
                        <div className="p-6 text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <IconCheck size={32} className="text-green-600" />
                            </div>
                            <p className="mb-2">Approve student verification for:</p>
                            <p className="text-xl font-semibold text-gray-800">{selectedVerification.name}</p>
                            <p className="text-gray-500">{selectedVerification.university}</p>

                            <div className="mt-4 bg-blue-50 p-3 rounded-lg text-left text-sm">
                                <p className="font-semibold text-blue-800">What happens next:</p>
                                <ul className="list-disc list-inside text-blue-700 mt-1">
                                    <li>Registration will be updated to student rate</li>
                                    <li>User will receive confirmation email</li>
                                    <li>Student badge will be added to registration</li>
                                </ul>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
                            <button onClick={() => setShowApproveModal(false)} className="btn-secondary">Cancel</button>
                            <button onClick={handleApprove} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                                Approve Verification
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Reject Modal */}
            {showRejectModal && selectedVerification && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full">
                        <div className="p-6 bg-red-600 rounded-t-2xl">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <IconX size={20} /> Reject Verification
                            </h3>
                        </div>
                        <div className="p-6">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <IconX size={32} className="text-red-600" />
                            </div>
                            <p className="text-center mb-2">Reject verification for:</p>
                            <p className="text-center text-xl font-semibold text-gray-800 mb-4">{selectedVerification.name}</p>

                            <div className="text-left">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Rejection Reason <span className="text-red-500">*</span>
                                </label>
                                <select
                                    className="input-field mb-3"
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                >
                                    <option value="">Select reason...</option>
                                    <option value="expired">Document expired</option>
                                    <option value="unclear">Document not readable/unclear</option>
                                    <option value="mismatch">Name does not match registration</option>
                                    <option value="invalid">Invalid document type</option>
                                    <option value="fake">Suspected fraudulent document</option>
                                    <option value="other">Other</option>
                                </select>

                                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                                <textarea className="input-field h-20" placeholder="Provide details to help user resubmit..."></textarea>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
                            <button onClick={() => setShowRejectModal(false)} className="btn-secondary">Cancel</button>
                            <button onClick={handleReject} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                                Reject Verification
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
