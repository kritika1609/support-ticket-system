import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import AdminHeader from '@/Components/AdminHeader';
import { router } from '@inertiajs/react';

const AdminUsers = () => {
    const { users } = usePage().props;

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this user?")) {
            router.delete(route('admin.users.destroy', id));
        }
    };

    const handlePromote = (id) => {
        router.put(route('admin.users.promote', id));
    };


    return (
        <AuthenticatedLayout header={<AdminHeader />}>
            <Head title="View Users" />
            <div className="max-w-6xl mx-auto py-8">
                <h2 className="text-2xl text-center font-bold text-blue-800 mb-6">Registered Users</h2>
                <div className='flex justify-end items-center mb-4'>
                    <button
                        onClick={() => router.get(route('admin.users.trashed'))} // Placeholder for soft delete functionality
                        className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-sm"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-5 h-5"
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
                <table className="w-full border-collapse bg-white shadow-md rounded-lg">
                    <thead className="bg-blue-100 text-blue-700">
                        <tr>
                            <th className="p-4 text-left">Name</th>
                            <th className="p-4 text-left">Email</th>
                            <th className="p-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="border-t">
                                <td className="p-4">{user.name}</td>
                                <td className="p-4">{user.email}</td>
                                <td className="p-4 space-x-3">
                                    <button
                                        onClick={() => handlePromote(user.id)}
                                        className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                                    >
                                        Make Agent
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan="3" className="p-4 text-center text-gray-500">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
};

export default AdminUsers;
