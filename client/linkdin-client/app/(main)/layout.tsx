import React from 'react';
import Navbar from '../components/navbar/Navbar';
import ProtectedRoute from './protectedRoute';

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div style={{ backgroundColor: '#f3f2ef', minHeight: '100vh', paddingBottom: '20px' }}>
            <ProtectedRoute>
            <Navbar />
            {children}
            </ProtectedRoute>
        </div>
    );
}
