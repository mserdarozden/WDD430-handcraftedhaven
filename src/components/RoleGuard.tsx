'use client';

import { ReactNode } from 'react';
import { useAuth } from '../lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type RoleGuardProps = {
  children: ReactNode;
  allowedRoles: string[];
  fallbackPath?: string;
};

/**
 * A component that restricts access based on user roles
 * @param children - The content to render if the user has the required role
 * @param allowedRoles - An array of roles that are allowed to access the content
 * @param fallbackPath - The path to redirect to if the user doesn't have the required role (defaults to '/')
 */
export default function RoleGuard({ 
  children, 
  allowedRoles, 
  fallbackPath = '/' 
}: RoleGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait until authentication is checked
    if (!loading) {
      // If user is not logged in or doesn't have the required role, redirect
      if (!user || !allowedRoles.includes(user.role)) {
        router.push(fallbackPath);
      }
    }
  }, [user, loading, allowedRoles, fallbackPath, router]);

  // Show nothing while checking authentication or redirecting
  if (loading || !user || !allowedRoles.includes(user.role)) {
    return null;
  }

  // User has the required role, render the children
  return <>{children}</>;
}