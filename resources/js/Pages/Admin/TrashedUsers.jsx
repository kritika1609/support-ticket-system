import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { usePage } from '@inertiajs/react';
import AdminHeader from '@/Components/AdminHeader';
import { Head } from '@inertiajs/react';
export default function TrashedUsers({  }) {
     const { users = [] } = usePage().props;
    return (
        <AuthenticatedLayout
            header={
                <AdminHeader />
            }
        >
            <Head title="Trash Users" />
            <div className="p-6 bg-white rounded shadow">
                <h1 className="text-xl font-bold mb-4">Deleted Users</h1>
                {users.length === 0 ? (
                    <p>No deleted Users found.</p>
                ) : (
                    <ul className="space-y-4">
                        {users.map(user => (
                            <li key={user.id} className="p-4 border rounded flex justify-between items-center">
                                <div>
                                    <p><strong>{user.name}</strong></p>
                                    <p className="text-sm text-gray-600">{user.email}</p>
                                </div>
                                <div className="space-x-2">
                                    <button
                                        onClick={() =>
                                            router.post(route('admin.users.restore', user.id))
                                        }
                                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                    >
                                        Restore
                                    </button>
                                    <button
                                        onClick={() =>
                                            router.delete(route('admin.users.forceDelete', user.id))
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
