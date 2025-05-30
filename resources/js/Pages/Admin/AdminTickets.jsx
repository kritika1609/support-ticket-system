import AdminHeader from '@/Components/AdminHeader';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head, router, usePage } from '@inertiajs/react';
import React, { useState } from 'react';

const AdminTickets = () => {
    // Ensure the tickets data is coming from the props
    const { tickets = {}, agents = [], filters = {} } = usePage().props;
    // This gets the tickets data from the props passed from the controller

    console.log(tickets); // Log the tickets to verify

    const [openDetails, setOpenDetails] = useState({}); // Track which ticket's details are open
    const [showAttachment, setShowAttachment] = useState({}); // Track which ticket's attachments to show
    const [assignModal, setAssignModal] = useState({
        open: false,
        ticketId: null,
    });
    const [selectedAgent, setSelectedAgent] = useState('');
    const [search, setSearch] = useState(filters.search || '');
    const [sortBy, setSortBy] = useState(filters.sort_by || '');

    // Toggle function to open/close details for each ticket
    const toggleDetails = (id) => {
        setOpenDetails((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    // Toggle function to show/hide attachment for each ticket
    const toggleAttachment = (id) => {
        setShowAttachment((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleAssignAgent = async () => {
        if (!selectedAgent) return alert('Please select an agent.');

        try {
            await Inertia.post(
                `/admin/tickets/${assignModal.ticketId}/assign`,
                {
                    agent_id: selectedAgent,
                },
            );
        } catch (error) {
            console.error(error);
            alert('Something went wrong while assigning the agent.');
        }
    };

    return (
        <AuthenticatedLayout header={<AdminHeader />}>
            <Head title="View Tickets" />
            <div className="m-6 flex items-center justify-center gap-4">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by user name..."
                    className="rounded border px-3 py-2 shadow-sm focus:ring focus:ring-blue-200"
                />
                <div className="relative">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="appearance-none rounded border px-3 py-2 pr-8 shadow-sm focus:ring focus:ring-blue-200"
                    >
                        <option value="">Sort by</option>
                        <option value="status">Status</option>
                        <option value="priority">Priority</option>
                        <option value="agent">Assigned</option>
                        <option value="recent">Recent</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
                </div>
                <button
                    onClick={() => {
                        router.get(route('admin.tickets'), {
                            ...(search && { search }),
                            ...(sortBy && { sort_by: sortBy }),
                        });
                    }}
                    className="rounded bg-blue-600 px-4 py-2 text-white shadow-sm hover:bg-blue-700"
                >
                    Apply
                </button>
                <button
                    onClick={() => router.get(route('admin.tickets'))}
                    className="ml-2 rounded bg-gray-300 px-4 py-2 shadow-sm hover:bg-gray-400"
                >
                    Reset
                </button>
                <button
                    onClick={() => router.get(route('admin.tickets.trashed'))} // Placeholder for soft delete functionality
                    className="ml-2 rounded-full bg-red-600 p-2 text-white shadow-sm hover:bg-red-700"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-5 w-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-2 14H7L5 7M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-6 0h6"
                        />
                    </svg>
                </button>
            </div>

            <div className="min-h-screen bg-blue-200 py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="rounded-lg bg-white p-6 shadow-md">
                        {tickets && tickets.data && tickets.data.length > 0 ? (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                                            User
                                        </th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                                            Title
                                        </th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                                            Priority
                                        </th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                                            Status
                                        </th>
                                        <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {tickets.data.map((ticket) => (
                                        <React.Fragment key={ticket.id}>
                                            <tr className="hover:bg-gray-50">
                                                <td className="px-4 py-2">
                                                    {ticket.user?.name ?? 'N/A'}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {ticket.title}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {ticket.priority}
                                                </td>
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
                                                <td className="flex space-x-2 px-4 py-2">
                                                    <button
                                                        className="rounded-lg bg-blue-600 px-3 py-1 text-sm font-semibold text-white transition duration-200 hover:bg-blue-700"
                                                        onClick={() =>
                                                            toggleDetails(
                                                                ticket.id,
                                                            )
                                                        }
                                                    >
                                                        {openDetails[ticket.id]
                                                            ? 'Hide'
                                                            : 'Details'}
                                                    </button>

                                                    <button
                                                        className="ml-4 rounded-lg bg-indigo-600 px-3 py-1 text-sm font-semibold text-white transition duration-200 hover:bg-indigo-700"
                                                        onClick={() =>
                                                            toggleAttachment(
                                                                ticket.id,
                                                            )
                                                        }
                                                    >
                                                        {showAttachment[
                                                            ticket.id
                                                        ]
                                                            ? 'Hide Attachment'
                                                            : 'Attachment'}
                                                    </button>
                                                    <button
                                                        className="ml-4 rounded-lg bg-green-600 px-3 py-1 text-sm font-semibold text-white transition duration-200 hover:bg-green-700"
                                                        onClick={() =>
                                                            setAssignModal({
                                                                open: true,
                                                                ticketId:
                                                                    ticket.id,
                                                            })
                                                        }
                                                    >
                                                        {ticket.agent_id
                                                            ? 'Change Agent'
                                                            : 'Assign Agent'}
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            if (
                                                                confirm(
                                                                    'Are you sure you want to soft delete this ticket?',
                                                                )
                                                            ) {
                                                                console.log(
                                                                    'Ticket ID being deleted: ',
                                                                    ticket.id,
                                                                );
                                                                router.delete(
                                                                    route(
                                                                        'admin.tickets.destroy',
                                                                        {
                                                                            ticket: ticket.id,
                                                                        },
                                                                    ),
                                                                );
                                                            }
                                                        }}
                                                        className="ml-2 rounded-full bg-red-600 p-2 text-white shadow-sm hover:bg-red-700"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                            className="h-5 w-5"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M19 7l-2 14H7L5 7M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-6 0h6"
                                                            />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>

                                            {/* Ticket details */}
                                            {openDetails[ticket.id] && (
                                                <tr className="bg-gray-50">
                                                    <td
                                                        colSpan="4"
                                                        className="p-4"
                                                    >
                                                        <div className="space-y-2 text-sm text-gray-800">
                                                            <p>
                                                                <strong>
                                                                    Description:
                                                                </strong>{' '}
                                                                {
                                                                    ticket.description
                                                                }
                                                            </p>
                                                            <p>
                                                                <strong>
                                                                    Category:
                                                                </strong>{' '}
                                                                {ticket.categories
                                                                    .map(
                                                                        (
                                                                            category,
                                                                        ) =>
                                                                            category.name,
                                                                    )
                                                                    .join(', ')}
                                                            </p>
                                                            <p>
                                                                <strong>
                                                                    Labels:
                                                                </strong>{' '}
                                                                {ticket.labels
                                                                    .map(
                                                                        (
                                                                            label,
                                                                        ) =>
                                                                            label.name,
                                                                    )
                                                                    .join(', ')}
                                                            </p>

                                                            {ticket.agent && (
                                                                <p>
                                                                    <strong>
                                                                        Agent
                                                                        Assigned:
                                                                    </strong>{' '}
                                                                    {
                                                                        ticket
                                                                            .agent
                                                                            .name
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}

                                            {/* Attachments */}
                                            {showAttachment[ticket.id] &&
                                                ticket.attachments.length >
                                                0 && (
                                                    <tr className="bg-gray-50">
                                                        <td
                                                            colSpan="4"
                                                            className="p-4"
                                                        >
                                                            <div className="space-y-2 text-sm text-gray-800">
                                                                <p>
                                                                    <strong>
                                                                        Attachment:
                                                                    </strong>
                                                                </p>
                                                                <div className="flex flex-wrap gap-4">
                                                                    {ticket.attachments.map(
                                                                        (
                                                                            attachment,
                                                                        ) => (
                                                                            <div
                                                                                key={
                                                                                    attachment.id
                                                                                }
                                                                                className="h-32 w-32 overflow-hidden rounded border border-gray-300 shadow"
                                                                            >
                                                                                <a
                                                                                    href={`/storage/${attachment.file_path}`}
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                >
                                                                                    <img
                                                                                        src={`/storage/${attachment.file_path}`}
                                                                                        alt="Attachment"
                                                                                        className="h-full w-full object-cover"
                                                                                    />
                                                                                </a>
                                                                            </div>
                                                                        ),
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            {assignModal.open && (
                                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                                                    <div className="w-96 rounded-lg bg-white p-6 shadow-md">
                                                        <h2 className="mb-4 text-lg font-semibold">
                                                            Assign Agent
                                                        </h2>
                                                        <select
                                                            value={
                                                                selectedAgent
                                                            }
                                                            onChange={(e) =>
                                                                setSelectedAgent(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="mt-2 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:ring focus:ring-blue-200"
                                                        >
                                                            <option value="">
                                                                -- Select Agent
                                                                --
                                                            </option>
                                                            {agents.map(
                                                                (agent) => (
                                                                    <option
                                                                        key={
                                                                            agent.id
                                                                        }
                                                                        value={
                                                                            agent.id
                                                                        }
                                                                    >
                                                                        {
                                                                            agent.name
                                                                        }
                                                                    </option>
                                                                ),
                                                            )}
                                                        </select>

                                                        <div className="flex justify-end gap-4">
                                                            <button
                                                                className="rounded bg-gray-300 px-4 py-2"
                                                                onClick={() =>
                                                                    setAssignModal(
                                                                        {
                                                                            open: false,
                                                                            ticketId:
                                                                                null,
                                                                        },
                                                                    )
                                                                }
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button
                                                                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                                                onClick={
                                                                    handleAssignAgent
                                                                }
                                                            >
                                                                Assign
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-center text-gray-600">
                                No tickets available.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default AdminTickets;
