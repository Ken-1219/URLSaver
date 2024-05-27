'use client'

import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/app/firebaseConfig';
import { useRouter } from 'next/navigation';

const Signup = () => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loading, setLoading] = useState(false);

    const checkError = (error) => {
        if (!email && !password) {
            setEmailError(true);
            setPasswordError(true);
            setError('Email and Password are required.')
            return;
        }

        if (!email) {
            setEmailError(true);
            setError('Email is required.')
            return;
        }
        else {
            setEmailError(false);
        }

        if (!password) {
            setPasswordError(true);
            setError('Password is required.')
            return;
        }
        else {
            setPasswordError(false);
        }

        const errorCode = error.code;
        let errorMessage = error.message;

        switch (errorCode) {
            case 'auth/email-already-in-use':
                setEmailError(true);
                errorMessage = 'The email address is already in use.';
                break;
            case 'auth/invalid-email':
                setEmailError(true);
                errorMessage = 'Invalid email address.';
                break;
            default:
                errorMessage = 'An error occurred. Please try again.';
        }
        setError(errorMessage);
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user;
            console.log(user);
            if (user) {
                router.push('/');
            }
        }
        catch (err) {
            checkError(err);
        }
        finally {
            setLoading(false);
        }
    };

    const handleLoginRedirect = () => {
        router.push('/login');
    };


    return (
        <main className="h-[30rem] w-[30rem] bg-gray-100 flex items-center justify-center">

            <div className="flex flex-col items-center justify-center text-gray-500  bg-gray-100">
                <form className="bg-white p-8 rounded-lg shadow-md w-96" onSubmit={handleSignup}>
                    <h1 className="text-3xl text-center font-bold mb-6 text-gray-900">Signup</h1>
                    <input
                        type="email"
                        className={`w-full p-2 mb-4 border border-gray-300 rounded  ${emailError ? 'placeholder-red-500 border-red-500 text-red-500' : ''}`}
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        className={`w-full p-2 mb-4 border border-gray-300 rounded  ${passwordError ? 'placeholder-red-500 border-red-500 text-red-500' : ''}`}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="w-full p-2 bg-gray-900 text-white rounded hover:bg-blue-600" disabled={loading}>
                        {loading ? 'Signing in...' : 'Signup'}
                    </button>
                    {error && <p className="text-red-500 text-center my-4 mx-auto">{error}</p>}
                    <p className=" text-center my-4 text-gray-500">Already have an account?
                        <button type="button" className="text-blue-500 mx-2" onClick={handleLoginRedirect}>Login</button>
                    </p>
                </form>
            </div>
        </main>
    );
};

export default Signup;
