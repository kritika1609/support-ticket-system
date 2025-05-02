import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import AdminHeader from '@/Components/AdminHeader';

export default function Dashboard() {
    const user = usePage().props.auth.user;
    return (
        <AuthenticatedLayout
            header={
                <AdminHeader/>
            }
        >
            <Head title="Dashboard" />

            <div className="bg-blue-100 w-1/2 mt-4 m-auto text-center shadow-md rounded-xl p-6 text-gray-800 text-lg font-semibold transition-transform duration-300 hover:scale-105">
                Welcome ADMIN {user.name} !
            </div>


        </AuthenticatedLayout>
    );
}
