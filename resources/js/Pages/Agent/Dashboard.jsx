import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard() {
    const { auth, tickets } = usePage().props;
    const user = auth.user;
    const [openDetails, setOpenDetails] = useState({});
    const [showAttachment, setShowAttachment] = useState({}); // Track which ticket's attachments to show
    const [priority, setPriority] = useState(""); // Empty for all options, or you can set default value
    const [statusFilter, setStatusFilter] = useState(""); // Empty for all statuses


    const toggleDetails = (ticketId) => {
        setOpenDetails(prev => ({ ...prev, [ticketId]: !prev[ticketId] }));
    };

    const handleCloseTicket = (ticketId) => {
        if (confirm('Are you sure you want to close this ticket?')) {
            router.put(route('agent.tickets.close', { ticket: ticketId }));
        }
    };
    // Toggle function to show/hide attachment for each ticket
    const toggleAttachment = (id) => {
        setShowAttachment((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Agent Dashboard" />
            <div className="py-4">
                <div className="bg-blue-100 w-1/2 mt-4 m-auto text-center shadow-md rounded-xl p-6 text-gray-800 text-lg font-semibold transition-transform duration-300 hover:scale-105">
                    Welcome, {user.name}!
                </div>
            </div>
            <div className="flex items-center justify-center gap-4 m-6">
                {/* Priority Filter */}
                <div className="relative">
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="border px-3 py-2 rounded shadow-sm focus:ring focus:ring-blue-200 appearance-none pr-8"
                    >
                        <option value="">All Priorities</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>

                {/* Status Filter */}
                <div className="relative">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border px-3 py-2 rounded shadow-sm focus:ring focus:ring-blue-200 appearance-none pr-8"
                    >
                        <option value="">All Statuses</option>
                        <option value="closed">Closed Only</option>
                        <option value="not_closed">Not Closed</option>
                    </select>

                </div>

                {/* Apply Filter Button */}
                <button
                    onClick={() => {
                        router.get(route('agent.dashboard'), {
                            ...(priority && { priority }),
                            ...(statusFilter && { status_filter: statusFilter }),
                        });
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow-sm"
                >
                    Apply
                </button>

                {/* Reset Button */}
                <button
                    onClick={() => router.get(route('agent.dashboard'))}
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 shadow-sm"
                >
                    Reset
                </button>
            </div>


            <div className="py-6 bg-blue-200 min-h-screen">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
                    <div className="rounded-lg bg-white p-6 shadow-md">
                        {tickets && tickets.length > 0 ? (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-sm font-semibold">Title</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold">Priority</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold">Status</th>
                                        <th className="px-4 py-2 text-center text-sm font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {tickets.map(ticket => (
                                        <React.Fragment key={ticket.id}>
                                            <tr className="hover:bg-gray-50">
                                                <td className="px-4 py-2">{ticket.title}</td>
                                                <td className="px-4 py-2">{ticket.priority}</td>
                                                <td className="px-4 py-2">
                                                    <span
                                                        className={`inline-block whitespace-nowrap rounded-full px-3 py-1 text-sm font-medium ${ticket.status ===
                                                            'open'
                                                            ? 'bg-green-100 text-green-700'
                                                            : ticket.status ===
                                                                'in_progress'
                                                                ? 'bg-blue-100 text-blue-700'
                                                                : ticket.status ===
                                                                    'closed'
                                                                    ? 'bg-gray-200 text-gray-800'
                                                                    : 'bg-yellow-100 text-yellow-700'
                                                            }`}
                                                    >
                                                        {ticket.status.replace(
                                                            '_',
                                                            ' ',
                                                        )}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-2 flex space-x-2 justify-center">
                                                    <button
                                                        className="px-3 py-1 text-sm font-semibold bg-blue-600 text-white rounded hover:bg-blue-700"
                                                        onClick={() => toggleDetails(ticket.id)}
                                                    >
                                                        {openDetails[ticket.id] ? 'Hide' : 'Details'}
                                                    </button>
                                                    <button
                                                        className="ml-4 px-3 py-1 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition duration-200 text-sm font-semibold"
                                                        onClick={() => toggleAttachment(ticket.id)}
                                                    >
                                                        {showAttachment[ticket.id] ? 'Hide Attachment' : 'Attachment'}
                                                    </button>
                                                    {ticket.status !== 'closed' && (
                                                        <button
                                                            onClick={() => {
                                                                if (confirm("Close this ticket?")) {
                                                                    router.put(route('agent.tickets.close', { ticket: ticket.id }), {}, {
                                                                        preserveScroll: true,
                                                                        onSuccess: () => {
                                                                            toast.success('Ticket closed!');
                                                                        }
                                                                    });
                                                                }
                                                            }}
                                                            className="ml-2 px-3 py-1 rounded-lg text-white bg-red-600 hover:bg-red-700 transition duration-200 text-sm font-semibold"
                                                        >
                                                            Close Ticket
                                                        </button>

                                                    )}
                                                </td>
                                            </tr>
                                            {showAttachment[ticket.id] && ticket.attachments.length > 0 && (
                                                <tr className="bg-gray-50">
                                                    <td colSpan="4" className="p-4">
                                                        <div className="space-y-2 text-sm text-gray-800">
                                                            <p>
                                                                <strong>Attachment:</strong>
                                                            </p>
                                                            <div className="flex flex-wrap gap-4">
                                                                {ticket.attachments.map((attachment) => (
                                                                    <div key={attachment.id} className="w-32 h-32 overflow-hidden rounded border border-gray-300 shadow">
                                                                        <a
                                                                            href={`/storage/${attachment.file_path}`}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                        >
                                                                            <img
                                                                                src={`/storage/${attachment.file_path}`}
                                                                                alt="Attachment"
                                                                                className="object-cover w-full h-full"
                                                                            />
                                                                        </a>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                            {openDetails[ticket.id] && (
                                                <tr className="bg-gray-50">
                                                    <td colSpan="4" className="p-4 text-sm text-gray-800">
                                                        <p><strong>Description:</strong> {ticket.description}</p>
                                                        <p><strong>Category:</strong> {ticket.categories?.map(cat => cat.name).join(', ')}</p>
                                                        <p><strong>Labels:</strong> {ticket.labels?.map(label => label.name).join(', ')}</p>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-center text-gray-600">No tickets assigned to you yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
