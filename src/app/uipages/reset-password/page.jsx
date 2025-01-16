"use client";
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function ResetPassword() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate token and password before sending the request
        if (!token || !password) {
            setMessage('Missing token or password');
            return;
        }

        try {
            const response = await fetch('/api/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password }),
            });

            // Check if the response is ok
            if (!response.ok) {
                throw new Error('Failed to reset password');
            }

            // Try to parse the response as JSON
            const data = await response.json();

            // Handle success or error based on the response data
            if (data.success) {
                setMessage('Password reset successful');
                router.push('/uipages/LoginPage');
            } else {
                setMessage(data.message || 'Error resetting password');
            }
        } catch (error) {
            // Handle errors like network failure or invalid JSON
            setMessage(error.message || 'An error occurred');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="password"
                        placeholder="Enter your new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 transition duration-300"
                    >
                        Reset Password
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-gray-600">{message}</p>}
            </div>
        </div>
    );
}
