import React from 'react'
import NavLink from './NavLink'
const UserHeader = () => {
    return (
        <h2 className="text-xl flex justify-center items-center font-semibold leading-tight text-center text-gray-800">
            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                <NavLink
                    href={route('dashboard')}
                    active={route().current('dashboard')}
                >
                    Dashboard
                </NavLink>
            </div>
            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                <NavLink
                    href={route('createticket')}
                    active={route().current('createticket')}
                >
                    Create Ticket
                </NavLink>
            </div>
            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                <NavLink
                    href={route('tickets.index')}
                    active={route().current('tickets.index')}
                >
                    View Tickets
                </NavLink>

            </div>
        </h2>
    )
}

export default UserHeader
