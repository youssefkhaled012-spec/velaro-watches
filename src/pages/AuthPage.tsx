import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';

export const AuthPage: React.FC = () => {
    const { login, register } = useAuth();
    const { setActivePage } = useShop();

    const [mode, setMode] = useState<'login' | 'register'>('login');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setError('');
        setSuccess('');

        if (!email || !password) {
            setError('Please enter your email and password.');
            return;
        }

        if (mode === 'register') {
            if (password.length < 6) {
                setError('Password must be at least 6 characters.');
                return;
            }

            if (password !== confirmPassword) {
                setError('Passwords do not match.');
                return;
            }
        }

        try {
            setLoading(true);

            if (mode === 'register') {
                await register(email.trim(), password);

                setSuccess(
                    'Account created successfully. You are now signed in.'
                );
            } else {
                await login(email.trim(), password);

                setSuccess('Signed in successfully.');
            }

            setTimeout(() => {
                setActivePage('account');
            }, 500);

        } catch (err: any) {
            console.error(err);

            const code = err?.code || '';

            if (code === 'auth/email-already-in-use') {
                setError('An account already exists with this email.');
            } else if (code === 'auth/invalid-email') {
                setError('Please enter a valid email address.');
            } else if (code === 'auth/weak-password') {
                setError('Password must be at least 6 characters.');
            } else if (
                code === 'auth/invalid-credential' ||
                code === 'auth/wrong-password' ||
                code === 'auth/user-not-found'
            ) {
                setError('Incorrect email or password.');
            } else if (code === 'auth/too-many-requests') {
                setError(
                    'Too many attempts. Please wait a moment and try again.'
                );
            } else {
                setError(
                    'Something went wrong. Please try again.'
                );
            }

        } finally {
            setLoading(false);
        }
    };

    const switchMode = () => {
        setMode((current) =>
            current === 'login' ? 'register' : 'login'
        );

        setError('');
        setSuccess('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="min-h-screen bg-[#080808] text-[#F5F5F5] flex items-center justify-center px-6 py-32">

            <div className="w-full max-w-md">

                <div className="text-center mb-10">

                    <p className="text-[10px] uppercase tracking-[0.35em] text-[#C6A15B] mb-3">
                        VELARO PRIVATE CLIENT
                    </p>

                    <h1 className="font-serif text-5xl">
                        {mode === 'login'
                            ? 'Welcome Back'
                            : 'Create Account'}
                    </h1>

                    <p className="text-sm text-[#A5A5A5] mt-4">
                        {mode === 'login'
                            ? 'Sign in to access your VELARO account.'
                            : 'Create your VELARO account.'}
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="border border-white/10 bg-[#111111] p-7 sm:p-9"
                >

                    <div className="mb-5">

                        <label className="block text-[10px] uppercase tracking-[0.2em] text-[#A5A5A5] mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="you@example.com"
                            autoComplete="email"
                            className="w-full bg-[#080808] border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-[#C6A15B]"
                        />

                    </div>

                    <div className="mb-5">

                        <label className="block text-[10px] uppercase tracking-[0.2em] text-[#A5A5A5] mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Enter your password"
                            autoComplete={
                                mode === 'login'
                                    ? 'current-password'
                                    : 'new-password'
                            }
                            className="w-full bg-[#080808] border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-[#C6A15B]"
                        />

                    </div>

                    {mode === 'register' && (

                        <div className="mb-5">

                            <label className="block text-[10px] uppercase tracking-[0.2em] text-[#A5A5A5] mb-2">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                placeholder="Confirm your password"
                                autoComplete="new-password"
                                className="w-full bg-[#080808] border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-[#C6A15B]"
                            />

                        </div>

                    )}

                    {error && (

                        <div className="mb-5 border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-300">
                            {error}
                        </div>

                    )}

                    {success && (

                        <div className="mb-5 border border-green-500/30 bg-green-500/10 px-4 py-3 text-xs text-green-300">
                            {success}
                        </div>

                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#C6A15B] text-[#080808] py-3.5 text-xs uppercase tracking-[0.22em] font-semibold hover:bg-[#F5F5F5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading
                            ? 'PLEASE WAIT...'
                            : mode === 'login'
                                ? 'SIGN IN'
                                : 'CREATE ACCOUNT'}
                    </button>

                    <div className="text-center mt-6">

                        <p className="text-xs text-[#A5A5A5]">
                            {mode === 'login'
                                ? "Don't have an account?"
                                : 'Already have an account?'}
                        </p>

                        <button
                            type="button"
                            onClick={switchMode}
                            className="mt-2 text-xs uppercase tracking-widest text-[#C6A15B] hover:text-white"
                        >
                            {mode === 'login'
                                ? 'CREATE ACCOUNT'
                                : 'SIGN IN'}
                        </button>

                    </div>

                </form>

                <button
                    type="button"
                    onClick={() => setActivePage('home')}
                    className="block mx-auto mt-7 text-[10px] uppercase tracking-widest text-[#A5A5A5] hover:text-[#C6A15B]"
                >
                    RETURN TO HOME
                </button>

            </div>

        </div>
    );
};