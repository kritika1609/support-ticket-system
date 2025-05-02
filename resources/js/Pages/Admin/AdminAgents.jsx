import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import AdminHeader from '@/Components/AdminHeader';

const AdminAgents = () => {
    const { agents = [] } = usePage().props;

    return (
        <AuthenticatedLayout header={<AdminHeader />}>
            <Head title="View Agents" />
            <div className="max-w-6xl mx-auto py-8">
                <h2 className="text-2xl text-center font-bold text-blue-800 mb-6">Agents</h2>
                <table className="w-full border-collapse bg-white shadow-md rounded-lg">
                    <thead className="bg-blue-100 text-blue-700">
                        <tr>
                            <th className="p-4 text-left">Name</th>
                            <th className="p-4 text-left">Email</th>
                            <th className="p-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {agents.map(agent => (
                            <tr key={agent.id} className="border-t">
                                <td className="p-4">{agent.name}</td>
                                <td className="p-4">{agent.email}</td>
                                <td className="p-4 space-x-3">
                                    <button
                                        onClick={() => {
                                            if (confirm("Are you sure you want to remove this agent?")) {
                                                router.delete(route('admin.agents.destroy', agent.id));
                                            }
                                        }}
                                        className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                                    >
                                        Remove Agent
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {agents.length === 0 && (
                            <tr>
                                <td colSpan="3" className="p-4 text-center text-gray-500">
                                    No Agents found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
};

export default AdminAgents;
