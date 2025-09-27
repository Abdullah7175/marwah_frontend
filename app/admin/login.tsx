'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { IconLock, IconMail, IconUser } from '@tabler/icons-react';
import authService from '../services/authService';

// Dynamically import Material-UI components to avoid SSR issues
const Box = dynamic(() => import('@mui/material').then(mod => ({ default: mod.Box })), { ssr: false });
const Card = dynamic(() => import('@mui/material').then(mod => ({ default: mod.Card })), { ssr: false });
const CardContent = dynamic(() => import('@mui/material').then(mod => ({ default: mod.CardContent })), { ssr: false });
const TextField = dynamic(() => import('@mui/material').then(mod => ({ default: mod.TextField })), { ssr: false });
const Button = dynamic(() => import('@mui/material').then(mod => ({ default: mod.Button })), { ssr: false });
const Typography = dynamic(() => import('@mui/material').then(mod => ({ default: mod.Typography })), { ssr: false });
const Alert = dynamic(() => import('@mui/material').then(mod => ({ default: mod.Alert })), { ssr: false });
const CircularProgress = dynamic(() => import('@mui/material').then(mod => ({ default: mod.CircularProgress })), { ssr: false });
const Container = dynamic(() => import('@mui/material').then(mod => ({ default: mod.Container })), { ssr: false });

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    // Check if user is already logged in
    useEffect(() => {
        setMounted(true);
        if (authService.isLoggedIn()) {
            router.push('/pages/dashboard');
        }
    }, [router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const userData = await authService.login(email, password);
            router.push('/pages/dashboard');
        } catch (err: any) {
            console.error('Login error:', err);
            setError(err.message || 'Login failed. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!mounted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <Container maxWidth="sm">
                <Card className="shadow-2xl">
                    <CardContent className="p-8">
                        <Box className="text-center mb-8">
                            <IconUser size={60} className="mx-auto text-blue-600 mb-4" />
                            <Typography variant="h4" className="font-bold text-gray-800 mb-2">
                                Admin Login
                            </Typography>
                            <Typography variant="body1" className="text-gray-600">
                                Access your admin dashboard
                            </Typography>
                        </Box>

                        <form onSubmit={handleLogin} className="space-y-6">
                            {error && (
                                <Alert severity="error" className="mb-4">
                                    {error}
                                </Alert>
                            )}

                            <TextField
                                fullWidth
                                label="Email Address"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                                InputProps={{
                                    startAdornment: <IconMail size={20} className="mr-2 text-gray-400" />
                                }}
                                className="mb-4"
                            />

                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading}
                                InputProps={{
                                    startAdornment: <IconLock size={20} className="mr-2 text-gray-400" />
                                }}
                                className="mb-6"
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                disabled={loading}
                                className="bg-blue-600 hover:bg-blue-700 py-3 text-lg font-semibold"
                            >
                                {loading ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    'Login to Dashboard'
                                )}
                            </Button>
                        </form>

                    </CardContent>
                </Card>
            </Container>
        </div>
    );
}