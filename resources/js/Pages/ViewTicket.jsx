import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UserHeader from '@/Components/UserHeader';
import { router } from '@inertiajs/react';

const ViewTicket = () => {
    // Ensure the tickets data is coming from the props
    const { tickets, successMessage } = usePage().props; // This gets the tickets data from the props passed from the controller


    const [openDetails, setOpenDetails] = useState({}); // Track which ticket's details are open
    const [showAttachment, setShowAttachment] = useState({}); // Track which ticket's attachments to show
    const [message, setMessage] = useState(successMessage || "");  // Initialize with props message or default empty string
    const [comment, setComment] = useState("");  // Track the comment input

    // Toggle function to open/close details for each ticket
    const toggleDetails = (id) => {
        setOpenDetails((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    // Toggle function to show/hide attachment for each ticket
    const toggleAttachment = (id) => {
        setShowAttachment((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    // Handle comment submission
    const handleCommentSubmit = (e, ticketId) => {
        e.preventDefault();

        // Create FormData to handle the comment submission
        const formData = new FormData();
        formData.append('comment', comment);
        formData.append('ticket_id', ticketId);
        router.post('/comments/store', formData, {
            onSuccess: () => {
                setComment("");  // Clear textarea
                setMessage(successMessage);
            },
            // Submit the comment using Inertia
            onError: (errors) => {
                console.log('Error:', errors);  // Log any errors in the form submission
            },
        });
    }
    return (
        <AuthenticatedLayout
            header={<UserHeader />}
        >
            <Head title="View Tickets" />
            {message && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{message}</span>
                    <span
                        className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
                        onClick={() => setMessage("")}
                    >
                        <svg className="fill-current h-6 w-6 text-green-700" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <title>Close</title>
                            <path d="M14.348 5.652a1 1 0 00-1.414-1.414L10 7.172 7.066 4.238a1 1 0 10-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 12.828l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934z" />
                        </svg>
                    </span>
                </div>
            )}


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
                                                            {ticket.comments && ticket.comments.length > 0 && (
                                                                <div className="mt-4 border-t pt-2">
                                                                    <h4 className="font-semibold text-gray-700 mb-2">Comments:</h4>
                                                                    <ul className="space-y-2">
                                                                        {ticket.comments.map((comment) => (
                                                                            <li key={comment.id} className="bg-gray-100 p-2 rounded shadow-sm">
                                                                                <p className="text-sm text-gray-800">{comment.comment}</p>
                                                                                <p className="text-xs text-gray-500">— {comment.user?.name || 'Unknown'} | {new Date(comment.created_at).toLocaleString()}</p>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}

                                                            {/* Comment Form */}
                                                            <div className="mt-4">
                                                                <form>
                                                                    <label htmlFor={`comment-${ticket.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                                                                        Add Comment:
                                                                    </label>
                                                                    <textarea
                                                                        name="comment"
                                                                        id={`comment-${ticket.id}`}
                                                                        rows="2"
                                                                        className="w-full p-2 border border-gray-300 rounded mb-2"
                                                                        placeholder="Type your comment..."
                                                                        value={comment}
                                                                        onChange={(e) => setComment(e.target.value)}
                                                                        required
                                                                    ></textarea>
                                                                    <button
                                                                        type="submit"
                                                                        onClick={(e) => handleCommentSubmit(e, ticket.id)}
                                                                        className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 text-sm"
                                                                    >
                                                                        Submit
                                                                    </button>
                                                                </form>
                                                            </div>
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

export default ViewTicket;
