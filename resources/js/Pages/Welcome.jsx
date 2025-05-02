import { Head, Link } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import ApplicationLogo from '@/Components/ApplicationLogo';


export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-white text-black flex flex-col justify-between">
                {/* Header */}
                <header className="w-full flex items-center justify-between px-6 py-4 shadow-sm bg-white">
                    <div className="flex items-center">
                        <ApplicationLogo />
                    </div>
                    <nav className="flex items-center gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <main className="flex-grow bg-gradient-to-b from-white via-blue-50 to-white">
                    
                    <section className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 px-6 py-20 max-w-7xl mx-auto">
                        <div className="w-full lg:w-1/2 flex justify-center">
                            <img
                                src="/images/welcome1.png"
                                alt="Support dashboard"
                                className="rounded-2xl w-[70%] shadow-xl border-4 border-blue-100 transition-transform hover:scale-105"
                            />
                        </div>
                        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-2">
                            <h2 className="text-lg text-blue-500 font-semibold">Integrated ticketing, effortless support.</h2>
                            <h2 className="text-4xl font-extrabold text-blue-800">Track. Prioritize. Resolve.</h2>
                            <h2 className="text-4xl font-extrabold text-blue-700">All in one powerful system.</h2>
                            <p className="text-gray-600 text-md mt-4">Stay organized, assign agents, and never miss a user request again.</p>
                        </div>
                    </section>

                 
                    <section className="flex flex-col lg:flex-row items-center justify-between gap-12 px-6 py-20 max-w-7xl mx-auto bg-white rounded-t-3xl">
                        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-2 flex justify-center ">
                            <div className="max-w-lg">
                                <h2 className="text-lg text-blue-500 font-semibold">Teamwork that speaks volumes.</h2>
                                <h2 className="text-4xl font-extrabold text-blue-800">Assign. Discuss. Deliver.</h2>
                                <h2 className="text-4xl font-extrabold text-blue-700">Support powered by collab.</h2>
                                <p className="text-gray-600 text-md mt-4">Leave notes, sync in real time, and solve problems together.</p>
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2 flex justify-center">
                            <img
                                src="/images/welcome2.png"
                                alt="Team collaboration"
                                className="rounded-2xl w-[70%] shadow-xl border-4 border-blue-100 transition-transform hover:scale-105"
                            />
                        </div>
                    </section>
                </main>




                {/* Footer */}
                <Footer />
            </div>
        </>
    );

}
