'use client';

import RoleGuard from '../../components/RoleGuard';

export default function CustomerOrdersPage() {
  return (
    <RoleGuard allowedRoles={['CUSTOMER']} fallbackPath="/">
      <div className="container">
        <h1>My Orders</h1>
        <p>View and track your orders from Handcrafted Haven artisans.</p>
        
        <div className="order-list">
          <p>Your orders will be displayed here.</p>
        </div>
      </div>
    </RoleGuard>
  );
}