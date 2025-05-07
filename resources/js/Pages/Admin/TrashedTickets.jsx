import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AdminHeader from '@/Components/AdminHeader';
import { Head } from '@inertiajs/react';
export default function TrashedTickets({ tickets }) {
    return (
        <AuthenticatedLayout
            header={
                <AdminHeader />
            }
        >
            <Head title="Trash Tickets" />
            <div className="p-6 bg-white rounded shadow">
                <h1 className="text-xl font-bold mb-4">Deleted Tickets</h1>
                {tickets.length === 0 ? (
                    <p>No deleted tickets found.</p>
                ) : (
                    <ul className="space-y-4">
                        {tickets.map(ticket => (
                            <li key={ticket.id} className="p-4 border rounded flex justify-between items-center">
                                <div>
                                    <p><strong>{ticket.title}</strong></p>
                                    <p className="text-sm text-gray-600">{ticket.description}</p>
                                </div>
                                <div className="space-x-2">
                                    <button
                                        onClick={() =>
                                            router.post(route('admin.tickets.restore', ticket.id))
                                        }
                                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                    >
                                        Restore
                                    </button>
                                    <button
                                        onClick={() =>
                                            router.delete(route('admin.tickets.forceDelete', ticket.id))
                                        }
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>



        </AuthenticatedLayout>
    );
}
