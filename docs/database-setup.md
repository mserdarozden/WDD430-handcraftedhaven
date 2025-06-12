# Database Setup for Handcrafted Haven

This document outlines the database structure for the Handcrafted Haven marketplace and provides instructions for setting up and seeding the database.

## Database Structure

Handcrafted Haven uses a relational database with the following entity structure:

### Entity Relationship Diagram

```
┌─────────┐       ┌───────────────┐       ┌─────────┐
│  User   │───1:1─┤ArtisanProfile │       │Category │
└─────────┘       └───────────────┘       └─────────┘
     │                                         │
     │                                         │
     │1:N                                      │M:N
     │                  ┌─────────┐            │
     └──────────────────┤ Product ├────────────┘
     │                  └─────────┘
     │                       │
     │                       │1:N
     │                       │
┌────┴────┐             ┌────┴────┐        ┌─────────┐
│  Order  │─────1:N─────┤OrderItem │       │ Review  │
└─────────┘             └─────────┘        └─────────┘
     │                                          │
     │                                          │
     │1:N                                       │N:1
┌────┴────┐                                     │
│CartItem │─────────────────────────────────────┘
└─────────┘
```

### Entities

1. **User**
   - Represents both customers and artisans
   - Contains authentication information and basic user details
   - Distinguished by role (CUSTOMER, ARTISAN, ADMIN)

2. **ArtisanProfile**
   - Extended information for artisan users
   - Contains shop details, bio, location, and social media links
   - One-to-one relationship with User (only for artisans)

3. **Category**
   - Product categories (e.g., Jewelry, Pottery, Textiles)
   - Many-to-many relationship with Products

4. **Product**
   - Items listed by artisans
   - Contains details like name, description, price, inventory
   - Belongs to an artisan
   - Can have multiple categories

5. **Order**
   - Customer purchases
   - Contains order status, shipping, and payment information
   - Belongs to a customer

6. **OrderItem**
   - Individual products within an order
   - Contains quantity and price at time of purchase
   - Many-to-one relationship with Order and Product

7. **CartItem**
   - Items in a customer's shopping cart
   - Contains product and quantity
   - Belongs to a customer

8. **Review**
   - Customer reviews for products
   - Contains rating and comments
   - Belongs to a customer and a product

## Setup Instructions

### Prerequisites

- Node.js (version 18 or higher)
- PostgreSQL database

### Installation

1. Install Prisma CLI globally:
   ```bash
   npm install -g prisma
   ```

2. Install required dependencies:
   ```bash
   npm install @prisma/client bcrypt
   npm install -D prisma @types/bcrypt
   ```

3. Set up your database connection by creating a `.env` file in the project root:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/handcraftedhaven?schema=public"
   ```
   Replace `username`, `password` with your PostgreSQL credentials.

4. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

5. Create the database tables:
   ```bash
   npx prisma migrate dev --name init
   ```

### Database Seeding

To populate the database with initial data:

1. Add the seed script to your package.json:
   ```json
   "scripts": {
     "seed": "ts-node prisma/seed.ts"
   }
   ```

2. Run the seed script:
   ```bash
   npm run seed
   ```

This will create:
- Product categories
- Admin user
- Sample artisan users with profiles
- Sample customer users
- Sample products with categories
- Sample reviews
- Sample orders and cart items

### Default User Credentials

After seeding, you can log in with these credentials:

- **Admin**:
  - Email: admin@handcraftedhaven.com
  - Password: admin123

- **Artisans**:
  - Email: emma@handcraftedhaven.com
  - Password: artisan123

- **Customers**:
  - Email: alex@example.com
  - Password: customer123

## Database Schema

The complete database schema is defined in `prisma/schema.prisma`. This file contains all model definitions, relationships, and field types using Prisma's schema language.

## Seeding Logic

The database seeding logic is contained in `prisma/seed.ts`. This file:

1. Clears any existing data
2. Creates categories
3. Creates users (admin, artisans, customers)
4. Creates products with appropriate categories
5. Creates reviews, orders, and cart items

You can modify this file to add more seed data or change the existing data as needed.