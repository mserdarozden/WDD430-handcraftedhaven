'use client';

import RoleGuard from '../../../components/RoleGuard';

export default function AdminUsersPage() {
  // This component will be wrapped with RoleGuard to restrict access to admins only
  return (
    <RoleGuard allowedRoles={['ADMIN']} fallbackPath="/">
      <div className="container">
        <h1>User Management</h1>
        <p>Welcome to the admin user management dashboard. Here you can view, edit, and manage all users in the system.</p>
        
        {/* This is just a placeholder. In a real application, you would fetch and display users here */}
        <div className="user-list">
          <p>User list will be displayed here.</p>
        </div>
        
        <div className="action-buttons">
          <button className="cta-button">Add New User</button>
        </div>
      </div>
    </RoleGuard>
  );
}