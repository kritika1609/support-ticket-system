import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UserHeader from '@/Components/UserHeader';

const ViewTickets = () => {
    // Ensure the tickets data is coming from the props
    const { tickets } = usePage().props; // This gets the tickets data from the props passed from the controller

    console.log(tickets); // Log the tickets to verify

    const [openDetails, setOpenDetails] = useState({}); // Track which ticket's details are open
    const [showAttachment, setShowAttachment] = useState({}); // Track which ticket's attachments to show

    // Toggle function to open/close details for each ticket
    const toggleDetails = (id) => {
        setOpenDetails((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    // Toggle function to show/hide attachment for each ticket
    const toggleAttachment = (id) => {
        setShowAttachment((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <AuthenticatedLayout
            header={
                <UserHeader />
            }
        >
            <Head title="View Tickets" />

            <div className="py-12 bg-blue-200 min-h-screen">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="rounded-lg bg-white p-6 shadow-md">
                        {tickets && tickets.length > 0 ? (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Title</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Priority</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {tickets.map((ticket) => (
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
                                                <td className="px-4 py-2">
                                                    <button
                                                        className="px-3 py-1 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition duration-200 text-sm font-semibold"
                                                        onClick={() => toggleDetails(ticket.id)}
                                                    >
                                                        {openDetails[ticket.id] ? 'Hide Details' : 'View Details'}
                                                    </button>

                                                    <button
                                                        className="ml-4 px-3 py-1 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition duration-200 text-sm font-semibold"
                                                        onClick={() => toggleAttachment(ticket.id)}
                                                    >
                                                        {showAttachment[ticket.id] ? 'Hide Attachment' : 'View Attachment'}
                                                    </button>
                                                </td>

                                            </tr>

                                            {/* Ticket details */}
                                            {openDetails[ticket.id] && (
                                                <tr className="bg-gray-50">
                                                    <td colSpan="4" className="p-4">
                                                        <div className="space-y-2 text-sm text-gray-800">
                                                            <p>
                                                                <strong>Description:</strong> {ticket.description}
                                                            </p>
                                                            <p>
                                                                <strong>Category:</strong>{' '}
                                                                {ticket.categories.map((category) => category.name).join(', ')}
                                                            </p>
                                                            <p>
                                                                <strong>Labels:</strong>{' '}
                                                                {ticket.labels.map((label) => label.name).join(', ')}
                                                            </p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}

                                            {/* Attachments */}
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

                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-center text-gray-600">No tickets available.</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ViewTickets;
