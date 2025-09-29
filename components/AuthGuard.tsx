'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import authService from '../app/services/authService';

// Dynamically import Material-UI components to avoid SSR issues
const Box = dynamic(() => import('@mui/material').then(mod => ({ default: mod.Box })), { ssr: false });
const CircularProgress = dynamic(() => import('@mui/material').then(mod => ({ default: mod.CircularProgress })), { ssr: false });
const Typography = dynamic(() => import('@mui/material').then(mod => ({ default: mod.Typography })), { ssr: false });

interface AuthGuardProps {
    children: React.ReactNode;
    currentTab?: number;
    onAddClick?: () => void;
    addButtonText?: string;
}

export default function AuthGuard({ children, currentTab, onAddClick, addButtonText }: AuthGuardProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const user = await authService.checkAuth();
                if (user) {
                    setIsAuthenticated(true);
                } else {
                    router.push('/admin/login');
                }
            } catch (error) {
                console.error('Auth check error:', error);
                router.push('/admin/login');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    const handleLogout = () => {
        authService.logout();
        router.push('/admin/login');
    };

    if (loading) {
        return (
            <Box className="min-h-screen flex items-center justify-center bg-gray-100">
                <Box className="text-center">
                    <CircularProgress size={60} className="mb-4" />
                    <Typography variant="h6" className="text-gray-600">
                        Verifying authentication...
                    </Typography>
                </Box>
            </Box>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="admin-layout">
            {/* Admin Header with Add Button and Logout */}
            <div className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Typography variant="h6" className="font-semibold text-gray-800">
                        Admin Dashboard
                    </Typography>
                    <span className="text-sm text-gray-500">|</span>
                    <Typography variant="body2" className="text-gray-600">
                        Marwah Travels
                    </Typography>
                </div>
                <div className="flex items-center space-x-3">
                    {onAddClick && addButtonText && (
                        <button
                            onClick={onAddClick}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            {addButtonText}
                        </button>
                    )}
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </div>
            {children}
        </div>
    );
}
