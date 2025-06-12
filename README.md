# Handcrafted Haven

## Project Overview
Handcrafted Haven is an online marketplace designed to connect artisans and crafters with customers who appreciate handmade, unique items. Our platform provides a space for creators to showcase and sell their handcrafted products while offering buyers a curated shopping experience.

## Features
- **User Authentication**: Secure login and registration for both artisans and customers
- **Role-Based Access Control**: Different user roles (Customer, Artisan, Admin) with specific permissions and access rights
- **Artisan Profiles**: Dedicated spaces for creators to share their story and showcase their work
- **Product Listings**: Detailed product pages with descriptions, pricing, and high-quality images
- **Shopping Cart**: Easy-to-use cart functionality for a seamless shopping experience
- **Search and Filter**: Advanced search capabilities to help customers find specific items
- **Reviews and Ratings**: Feedback system to build trust in the marketplace
- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)

## Technology Stack
- **Frontend**: React.js, Next.js 15.3.2
- **Styling**: CSS Modules
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Linting**: ESLint

## Getting Started

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm or yarn package manager

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/handcraftedhaven.git
   cd handcraftedhaven
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Set up the database (see [Database Setup](#database-setup) section below).

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure
```
handcraftedhaven/
├── src/
│   ├── app/          # Next.js App Router components
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── styles/       # Global styles
│       └── global.css
├── prisma/           # Database setup
│   ├── schema.prisma # Database schema definition
│   └── seed.ts       # Database seeding script
├── docs/             # Documentation
│   └── database-setup.md # Database setup guide
├── public/           # Static assets
├── package.json      # Project dependencies and scripts
└── README.md         # Project documentation
```

## Authentication and Role-Based Access Control

Handcrafted Haven implements a comprehensive authentication system and role-based access control to secure the application and provide different functionality based on user roles.

### Authentication System

The authentication system uses a client-side approach with the following components:

- **AuthContext**: A React context that provides authentication state and methods throughout the application
- **Login/Register Pages**: User interfaces for authentication
- **API Routes**: Server endpoints for handling authentication requests

#### Authentication Flow

1. **Registration**: Users can register as either Customers or Artisans
2. **Login**: Users provide credentials which are validated against the database
3. **Session Management**: User data is stored in localStorage for persistence across page refreshes
4. **Logout**: Clears user data from the application state

#### Files Structure

```
src/
├── lib/
│   └── AuthContext.tsx    # Authentication context provider
├── app/
│   ├── login/
│   │   └── page.tsx       # Login page
│   ├── register/
│   │   └── page.tsx       # Registration page
│   └── api/auth/          # Authentication API routes
│       ├── login/
│       │   └── route.ts   # Login endpoint
│       ├── register/
│       │   └── route.ts   # Registration endpoint
│       └── logout/
│           └── route.ts   # Logout endpoint
```

### Role-Based Access Control

The application supports three user roles, each with different permissions:

1. **CUSTOMER**: Regular users who can browse products, make purchases, and view their orders
2. **ARTISAN**: Creators who can manage their products, fulfill orders, and maintain their profile
3. **ADMIN**: System administrators who can manage all users, products, and system settings

#### Role-Based Components

- **RoleGuard**: A higher-order component that restricts page access based on user roles
- **useRoleCheck**: A custom hook for checking user roles in components

#### Usage Examples

Protecting a route with RoleGuard:
```tsx
import RoleGuard from '../components/RoleGuard';

export default function AdminPage() {
  return (
    <RoleGuard allowedRoles={['ADMIN']} fallbackPath="/">
      <div>Admin content here</div>
    </RoleGuard>
  );
}
```

Using role check hooks in a component:
```tsx
import { useIsArtisan } from '../lib/useRoleCheck';

export default function MyComponent() {
  const { isArtisan, loading } = useIsArtisan();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {isArtisan ? <div>Artisan content</div> : <div>Regular content</div>}
    </div>
  );
}
```

## Database Setup

Handcrafted Haven uses PostgreSQL as the database and Prisma as the ORM. The database schema is designed to support all the features of the marketplace, including user authentication, product listings, shopping cart, and reviews.

### Quick Setup

1. Install required dependencies:
   ```bash
   npm install @prisma/client bcrypt
   npm install -D prisma @types/bcrypt
   ```

2. Set up your database connection in a `.env` file:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/handcraftedhaven?schema=public"
   ```

3. Create the database tables:
   ```bash
   npx prisma migrate dev --name init
   ```

4. Seed the database with initial data:
   ```bash
   npm run seed
   ```

For detailed information about the database structure, entity relationships, and complete setup instructions, please refer to the [Database Setup Documentation](./docs/database-setup.md).

## Development Workflow
1. Create a new branch for each feature or bug fix
2. Make your changes and test thoroughly
3. Submit a pull request for review
4. After approval, merge into the main branch

## Deployment
The application can be deployed using Vercel, which is optimized for Next.js applications:

```bash
npm run build
# or
yarn build
```

## Contributing
We welcome contributions to Handcrafted Haven! Please read our contributing guidelines before submitting pull requests.

## License
This project is licensed under the terms of the license included in the repository.

## Acknowledgements
- Next.js team for the excellent framework
- All contributors who have helped build and improve this platform
