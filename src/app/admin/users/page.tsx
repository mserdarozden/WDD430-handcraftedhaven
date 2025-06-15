'use client';

import RoleGuard from '../../../components/RoleGuard';

export default function AdminUsersPage() {
  
  return (
    <RoleGuard allowedRoles={['ADMIN']} fallbackPath="/">
      <div className="container">
        <h1>User Management</h1>
        <p>Welcome to the admin user management dashboard. Here you can view, edit, and manage all users in the system.</p>
        

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