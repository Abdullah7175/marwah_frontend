'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import authService from '../../services/authService';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = authService.getToken();
        if (!token) {
          router.push('/admin/login');
          return;
        }

        const user = await authService.checkAuth();
        if (!user) {
          router.push('/admin/login');
        }
      } catch (error) {
        console.error('Dashboard layout auth check failed:', error);
        authService.logout();
        router.push('/admin/login');
      }
    };

    checkAuth();
  }, [router]);

  return <>{children}</>;
}
