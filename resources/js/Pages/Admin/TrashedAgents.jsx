import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { usePage } from '@inertiajs/react';
import AdminHeader from '@/Components/AdminHeader';
import { Head } from '@inertiajs/react';
export default function TrashedAgents({  }) {
     const { agents = [] } = usePage().props;
    return (
        <AuthenticatedLayout
            header={
                <AdminHeader />
            }
        >
            <Head title="Trash Agents" />
            <div className="p-6 bg-white rounded shadow">
                <h1 className="text-xl font-bold mb-4">Deleted Agents</h1>
                {agents.length === 0 ? (
                    <p>No deleted Agents found.</p>
                ) : (
                    <ul className="space-y-4">
                        {agents.map(agent => (
                            <li key={agent.id} className="p-4 border rounded flex justify-between items-center">
                                <div>
                                    <p><strong>{agent.name}</strong></p>
                                    <p className="text-sm text-gray-600">{agent.email}</p>
                                </div>
                                <div className="space-x-2">
                                    <button
                                        onClick={() =>
                                            router.post(route('admin.agents.restore', agent.id))
                                        }
                                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                    >
                                        Restore
                                    </button>
                                    <button
                                        onClick={() =>
                                            router.delete(route('admin.agents.forceDelete', agent.id))
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
