import React from 'react';
import { auth } from '@/app/firebaseConfig';
import { useRouter } from 'next/navigation';

function BookmarkIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
        </svg>
    );
}

function Navbar({title, buttonName}) {
    const router = useRouter();
    const handleLogout = () => {
        auth.signOut();
        router.push('/login');
    };

    const handleButtonClick = () => {
        if(title === 'Saved URLs'){
            router.push('/');
        }
        else{
            router.push('/saved');
        }
    };

    return (
        <header className="bg-gray-100 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <BookmarkIcon className="w-6 h-6 text-primary" />
                <h1 className="text-lg font-semibold">{title}</h1>
            </div>
            <div className='flex items-center gap-4'>
                <button
                    className="text-sm font-medium text-primary hover:underline"
                    onClick={handleButtonClick}
                >
                    {buttonName}
                </button>
                <button
                    className="text-sm font-medium text-primary hover:underline"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </header>
    );
}

export default Navbar;
