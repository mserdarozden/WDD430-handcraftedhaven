'use client';

import RoleGuard from '../../../components/RoleGuard';

export default function ArtisanProductsPage() {
  // This component will be wrapped with RoleGuard to restrict access to artisans only
  return (
    <RoleGuard allowedRoles={['ARTISAN']} fallbackPath="/">
      <div className="container">
        <h1>My Products</h1>
        <p>Welcome to your product management dashboard. Here you can add, edit, and manage your handcrafted products.</p>

        {/* This is just a placeholder. In a real application, you would fetch and display the artisan's products here */}
        <div className="product-list">
          <p>Your products will be displayed here.</p>
        </div>

        <div className="action-buttons">
          <button className="cta-button">Add New Product</button>
        </div>
      </div>
    </RoleGuard>
  );
}
