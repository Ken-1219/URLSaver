'use client'


import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

function SaveIcon(props) {
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
            <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
            <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
            <path d="M7 3v4a1 1 0 0 0 1 1h7" />
        </svg>
    );
}

function ActivePage() {
    const [currentURL, setCurrentURL] = useState('');


    useEffect(() => {
        if (typeof chrome !== 'undefined' && chrome.tabs) {
            console.log(chrome);
            chrome.tabs.query({}, (result) => {
                console.log(result);
                setCurrentURL(result);
            });
        }
    }, []);

    const handleSave = async () => {

        const api = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/add`;
        console.log(api);
        try {
            const response = await fetch(api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url: currentURL })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('URL saved:', data);
        } catch (error) {
            console.error('Error saving URL:', error);
        }
    };

    return (
        <main className="flex-1 p-6 space-y-4">
            <Navbar title="URL Saver" buttonName="View Saved" />
            <div className="flex items-center justify-between">
                <p className="text-gray-400 px-6">Current Page URL:</p>
                <button className="flex items-center gap-2 text-primary px-6" size="sm" variant="ghost" onClick={handleSave}>
                    <SaveIcon className="w-4 h-4" />
                    Save
                </button>
            </div>
            <div className="bg-gray-900 rounded-md p-4">
                <p className="font-mono text-sm text-gray-400 line-clamp-2">
                    {currentURL || 'https://example.com'}
                </p>
            </div>
        </main>
    );
}

export default ActivePage;
