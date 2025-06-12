'use client';

import { useAuth } from './AuthContext';

/**
 * A custom hook that checks if the current user has one of the specified roles
 * @param allowedRoles - An array of roles to check against
 * @returns An object containing hasRole (boolean) and loading (boolean)
 */
export function useRoleCheck(allowedRoles: string[]) {
  const { user, loading } = useAuth();

  // Check if the user has one of the allowed roles
  const hasRole = user ? allowedRoles.includes(user.role) : false;

  return { hasRole, loading };
}

/**
 * A custom hook that checks if the current user is an artisan
 * @returns An object containing isArtisan (boolean) and loading (boolean)
 */
export function useIsArtisan() {
  const { hasRole, loading } = useRoleCheck(['ARTISAN']);
  return { isArtisan: hasRole, loading };
}

/**
 * A custom hook that checks if the current user is a customer
 * @returns An object containing isCustomer (boolean) and loading (boolean)
 */
export function useIsCustomer() {
  const { hasRole, loading } = useRoleCheck(['CUSTOMER']);
  return { isCustomer: hasRole, loading };
}

/**
 * A custom hook that checks if the current user is an admin
 * @returns An object containing isAdmin (boolean) and loading (boolean)
 */
export function useIsAdmin() {
  const { hasRole, loading } = useRoleCheck(['ADMIN']);
  return { isAdmin: hasRole, loading };
}