import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UserHeader from '@/Components/UserHeader';
import { usePage } from '@inertiajs/react';

export default function Dashboard() {
    const user = usePage().props.auth.user;
    return (
        <AuthenticatedLayout
            header={
                <UserHeader />
            }
        >
            <Head title="Dashboard" />

            <div className="bg-blue-100 w-1/2 mt-4 m-auto text-center shadow-md rounded-xl p-6 text-gray-800 text-lg font-semibold transition-transform duration-300 hover:scale-105">
                Welcome! {user.name}
            </div>

            <section className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 px-6 py-20 max-w-7xl mx-auto">
                <div className="w-full lg:w-1/2 flex justify-center">
                    <img
                        src="/images/userdash1.png"
                        alt="Support dashboard"
                        className="rounded-2xl w-[70%] transition-transform hover:scale-105"
                    />
                </div>
                <div className="w-full lg:w-1/2 text-center lg:text-left space-y-2">
                    <h2 className="text-lg text-blue-500 font-semibold">Raise issues, resolve faster.</h2>
                    <h2 className="text-4xl font-extrabold text-blue-800">Create Tickets Effortlessly.</h2>
                    <h2 className="text-4xl font-extrabold text-blue-700">Structured. Simple. Swift.</h2>
                    <p className="text-gray-600 text-md mt-4">
                        Users can log their issues with just a few clicks. Add categories, attach files, and ensure your query reaches the right hands—instantly.
                    </p>
                </div>

            </section>

            <section className="flex flex-col lg:flex-row items-center justify-between gap-12 px-6 py-20 max-w-7xl mx-auto rounded-t-3xl">
                <div className="w-full lg:w-1/2 text-center lg:text-left space-y-2 flex justify-center ">
                    <div className="max-w-lg">
                        <h2 className="text-lg text-blue-500 font-semibold">Clarity at a glance.</h2>
                        <h2 className="text-4xl font-extrabold text-blue-800">View. Track. Understand.</h2>
                        <h2 className="text-4xl font-extrabold text-blue-700">Every ticket, right where you need it.</h2>
                        <p className="text-gray-600 text-md mt-4">
                            Access all submitted tickets in an organized layout. Monitor status, read details, and stay in sync with your team's progress.
                        </p>
                    </div>


                </div>

                <div className="w-full lg:w-1/2 flex justify-center">
                    <img
                        src="/images/userdash2.png"
                        alt="Team collaboration"
                        className="rounded-2xl w-[70%] transition-transform hover:scale-105"
                    />
                </div>
            </section>

        </AuthenticatedLayout>
    );
}
