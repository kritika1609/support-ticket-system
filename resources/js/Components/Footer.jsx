import ApplicationLogo from './ApplicationLogo';
export default function Footer({}) {
    return (
        <>
            <footer className="mt-20 bg-blue-50 px-4 py-10">
                <div className="mx-auto flex max-w-7xl flex-col items-center space-y-4">
                    {/* Logo centered */}
                    <div className="flex items-center justify-center">
                        <ApplicationLogo className="h-10 w-auto text-blue-600" />
                    </div>

                    {/* Footer text */}
                    <p className="text-sm text-gray-600 transition-colors duration-300 hover:text-blue-700">
                        © {new Date().getFullYear()} Support Ticket System. All rights
                        reserved.
                    </p>
                </div>
            </footer>
        </>
    );
}
