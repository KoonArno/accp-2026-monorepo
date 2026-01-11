'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout';
import {
    IconScan,
    IconCheck,
    IconX,
    IconAlertTriangle,
    IconRefresh,
    IconCamera,
    IconKeyboard,
    IconUser,
    IconTicket,
    IconCalendarEvent,
} from '@tabler/icons-react';

// Mock recent check-ins
const mockRecentCheckins = [
    { id: 1, name: 'สมชาย ใจดี', ticketCode: 'REG-001', time: '10:30', status: 'success' },
    { id: 2, name: 'Jane Doe', ticketCode: 'REG-002', time: '10:28', status: 'success' },
    { id: 3, name: 'Unknown', ticketCode: 'INVALID', time: '10:25', status: 'error' },
    { id: 4, name: 'Dr. Smith', ticketCode: 'REG-004', time: '10:22', status: 'duplicate' },
    { id: 5, name: 'วิทยากร B', ticketCode: 'REG-005', time: '10:20', status: 'success' },
];

type ScanResult = null | {
    status: 'success' | 'error' | 'duplicate';
    code: string;
    name?: string;
    ticketType?: string;
    message: string;
};

export default function CheckinPage() {
    const [scanMode, setScanMode] = useState<'camera' | 'manual'>('camera');
    const [manualCode, setManualCode] = useState('');
    const [scanResult, setScanResult] = useState<ScanResult>(null);
    const [isCameraActive, setIsCameraActive] = useState(false);

    const stats = {
        total: 285,
        checkedIn: 156,
        remaining: 129,
    };

    const simulateScan = (code: string) => {
        // Simulate different scan results
        if (code === 'REG-001' || code === 'REG-002' || code === 'REG-003') {
            setScanResult({
                status: 'success',
                code: code,
                name: 'สมชาย ใจดี',
                ticketType: 'Thai Pharmacy',
                message: 'Check-in successful!',
            });
        } else if (code === 'REG-004') {
            setScanResult({
                status: 'duplicate',
                code: code,
                name: 'Dr. Smith',
                ticketType: 'Thai Pharmacy',
                message: 'Already checked in at 10:22',
            });
        } else {
            setScanResult({
                status: 'error',
                code: code,
                message: 'Invalid registration code',
            });
        }
    };

    const handleManualSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (manualCode.trim()) {
            simulateScan(manualCode.trim().toUpperCase());
            setManualCode('');
        }
    };

    const handleStartCamera = () => {
        setIsCameraActive(true);
        // In a real app, this would initialize the camera and QR scanner
        // For demo, we'll simulate a scan after 2 seconds
        setTimeout(() => {
            simulateScan('REG-001');
            setIsCameraActive(false);
        }, 2000);
    };

    const clearResult = () => {
        setScanResult(null);
    };

    return (
        <AdminLayout title="Check-in Scanner">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Scanner Area */}
                <div className="lg:col-span-2">
                    <div className="card">
                        {/* Mode Toggle */}
                        <div className="flex gap-2 mb-6">
                            <button
                                onClick={() => setScanMode('camera')}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors ${scanMode === 'camera'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                <IconCamera size={20} /> Camera Scan
                            </button>
                            <button
                                onClick={() => setScanMode('manual')}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors ${scanMode === 'manual'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                <IconKeyboard size={20} /> Manual Entry
                            </button>
                        </div>

                        {/* Camera Mode */}
                        {scanMode === 'camera' && !scanResult && (
                            <div className="relative">
                                <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden flex items-center justify-center">
                                    {isCameraActive ? (
                                        <div className="text-center text-white">
                                            <div className="w-48 h-48 border-4 border-white/50 rounded-xl mx-auto mb-4 flex items-center justify-center">
                                                <div className="animate-pulse text-blue-400">
                                                    <IconScan size={48} />
                                                </div>
                                            </div>
                                            <p className="text-lg">Scanning...</p>
                                            <p className="text-sm text-gray-400">Point the camera at a QR code</p>
                                        </div>
                                    ) : (
                                        <div className="text-center text-gray-400">
                                            <IconCamera size={64} className="mx-auto mb-4 opacity-50" />
                                            <p className="text-lg mb-4">Camera Ready</p>
                                            <button
                                                onClick={handleStartCamera}
                                                className="btn-primary"
                                            >
                                                Start Scanning
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Manual Mode */}
                        {scanMode === 'manual' && !scanResult && (
                            <div className="py-8">
                                <form onSubmit={handleManualSubmit} className="max-w-md mx-auto">
                                    <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                                        Enter Registration Code
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            className="input-field text-center text-xl font-mono uppercase tracking-wider"
                                            placeholder="REG-001"
                                            value={manualCode}
                                            onChange={(e) => setManualCode(e.target.value)}
                                            autoFocus
                                        />
                                        <button type="submit" className="btn-primary px-6">
                                            <IconCheck size={24} />
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-500 text-center mt-3">
                                        Or use a barcode scanner connected to your device
                                    </p>
                                </form>
                            </div>
                        )}

                        {/* Scan Result */}
                        {scanResult && (
                            <div className="py-8">
                                <div className={`max-w-md mx-auto rounded-2xl p-8 text-center ${scanResult.status === 'success'
                                        ? 'bg-green-50 border-2 border-green-200'
                                        : scanResult.status === 'duplicate'
                                            ? 'bg-yellow-50 border-2 border-yellow-200'
                                            : 'bg-red-50 border-2 border-red-200'
                                    }`}>
                                    <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${scanResult.status === 'success'
                                            ? 'bg-green-500'
                                            : scanResult.status === 'duplicate'
                                                ? 'bg-yellow-500'
                                                : 'bg-red-500'
                                        }`}>
                                        {scanResult.status === 'success' ? (
                                            <IconCheck size={40} className="text-white" />
                                        ) : scanResult.status === 'duplicate' ? (
                                            <IconAlertTriangle size={40} className="text-white" />
                                        ) : (
                                            <IconX size={40} className="text-white" />
                                        )}
                                    </div>

                                    <h3 className={`text-2xl font-bold mb-2 ${scanResult.status === 'success'
                                            ? 'text-green-700'
                                            : scanResult.status === 'duplicate'
                                                ? 'text-yellow-700'
                                                : 'text-red-700'
                                        }`}>
                                        {scanResult.status === 'success'
                                            ? 'Check-in Successful!'
                                            : scanResult.status === 'duplicate'
                                                ? 'Already Checked In'
                                                : 'Invalid Code'}
                                    </h3>
                                    <p className={`text-sm mb-4 ${scanResult.status === 'success'
                                            ? 'text-green-600'
                                            : scanResult.status === 'duplicate'
                                                ? 'text-yellow-600'
                                                : 'text-red-600'
                                        }`}>
                                        {scanResult.message}
                                    </p>

                                    {scanResult.name && (
                                        <div className="bg-white rounded-lg p-4 mb-4 text-left">
                                            <div className="flex items-center gap-3 mb-2">
                                                <IconUser size={18} className="text-gray-400" />
                                                <span className="font-medium text-gray-800">{scanResult.name}</span>
                                            </div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <IconTicket size={18} className="text-gray-400" />
                                                <span className="text-gray-600">{scanResult.ticketType}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <IconScan size={18} className="text-gray-400" />
                                                <span className="font-mono text-gray-600">{scanResult.code}</span>
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        onClick={clearResult}
                                        className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 mx-auto ${scanResult.status === 'success'
                                                ? 'bg-green-600 hover:bg-green-700 text-white'
                                                : scanResult.status === 'duplicate'
                                                    ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                                                    : 'bg-red-600 hover:bg-red-700 text-white'
                                            }`}
                                    >
                                        <IconRefresh size={18} /> Scan Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Stats */}
                    <div className="card">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <IconCalendarEvent size={20} className="text-blue-600" />
                            Today's Check-in
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Total Registered</span>
                                <span className="font-bold text-gray-800">{stats.total}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Checked In</span>
                                <span className="font-bold text-green-600">{stats.checkedIn}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Remaining</span>
                                <span className="font-bold text-yellow-600">{stats.remaining}</span>
                            </div>
                            <div className="pt-2">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-500">Progress</span>
                                    <span className="font-medium text-gray-700">{Math.round((stats.checkedIn / stats.total) * 100)}%</span>
                                </div>
                                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all"
                                        style={{ width: `${(stats.checkedIn / stats.total) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Check-ins */}
                    <div className="card">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Scans</h3>
                        <div className="space-y-3">
                            {mockRecentCheckins.map((checkin) => (
                                <div
                                    key={checkin.id}
                                    className={`flex items-center justify-between p-3 rounded-lg ${checkin.status === 'success'
                                            ? 'bg-green-50'
                                            : checkin.status === 'duplicate'
                                                ? 'bg-yellow-50'
                                                : 'bg-red-50'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${checkin.status === 'success'
                                                ? 'bg-green-500'
                                                : checkin.status === 'duplicate'
                                                    ? 'bg-yellow-500'
                                                    : 'bg-red-500'
                                            }`}>
                                            {checkin.status === 'success' ? (
                                                <IconCheck size={16} className="text-white" />
                                            ) : checkin.status === 'duplicate' ? (
                                                <IconAlertTriangle size={16} className="text-white" />
                                            ) : (
                                                <IconX size={16} className="text-white" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800 text-sm">{checkin.name}</p>
                                            <p className="text-xs text-gray-500 font-mono">{checkin.ticketCode}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-400">{checkin.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
