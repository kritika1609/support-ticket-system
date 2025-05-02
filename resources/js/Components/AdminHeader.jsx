import React from 'react'
import NavLink from './NavLink'


const AdminHeader = () => {
    return (
        <h2 className="text-xl flex justify-center items-center font-semibold leading-tight text-center text-gray-800">
            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                <NavLink
                    href={route('admin.dashboard')}
                    active={route().current('admin.dashboard')}
                >
                    Dashboard
                </NavLink>
            </div>

            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                <NavLink
                    href={route('admin.tickets')}
                    active={route().current('admin.tickets')}
                >
                    Tickets
                </NavLink>
            </div>

            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                <NavLink
                    href={route('admin.agents')}
                    active={route().current('admin.agents')}
                >
                    Agents
                </NavLink>
            </div>

            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                <NavLink
                    href={route('admin.users')}
                    active={route().current('admin.users')}
                >
                    Users
                </NavLink>
            </div>

        </h2>
    )
}

export default AdminHeader
