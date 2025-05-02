import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link, usePage } from '@inertiajs/react';


export default function Dashboard({  }) {
    const user = usePage().props.auth.user;
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl text-center font-semibold leading-tight text-gray-800">
                    Agent Dashboard
                </h2>
            }
        >
            <Head title="Agent Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 text-2xl font-semibold text-center bg-blue-50 rounded-lg shadow-sm transition transform hover:scale-105 hover:bg-blue-100">
                            Welcome, {user.name}!
                        </div>
                        <h2>THIS IS AGENT DASHBOARD BABY!!</h2>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
