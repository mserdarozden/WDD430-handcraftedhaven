'use client';

import RoleGuard from '../../components/RoleGuard';

export default function CustomerOrdersPage() {
  // This component will be wrapped with RoleGuard to restrict access to customers only
  return (
    <RoleGuard allowedRoles={['CUSTOMER']} fallbackPath="/">
      <div className="container">
        <h1>My Orders</h1>
        <p>View and track your orders from Handcrafted Haven artisans.</p>
        
        {/* This is just a placeholder. In a real application, you would fetch and display the customer's orders here */}
        <div className="order-list">
          <p>Your orders will be displayed here.</p>
        </div>
      </div>
    </RoleGuard>
  );
}