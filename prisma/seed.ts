import { PrismaClient, UserRole } from '@prisma/client';
 import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // Clear existing data
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.productCategory.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.artisanProfile.deleteMany();
  await prisma.user.deleteMany();

  console.log('Existing data cleared');

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Jewelry',
        description: 'Handcrafted jewelry including necklaces, bracelets, and earrings',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Pottery',
        description: 'Handmade ceramic items including mugs, plates, and decorative pieces',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Textiles',
        description: 'Handwoven and hand-sewn textiles including blankets, scarves, and clothing',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Woodworking',
        description: 'Hand-carved wooden items including furniture, utensils, and decorative pieces',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Art',
        description: 'Original artwork including paintings, prints, and sculptures',
      },
    }),
  ]);

  console.log('Categories created:', categories.length);

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@handcraftedhaven.com',
      password: adminPassword,
      name: 'Admin User',
      role: UserRole.ADMIN,
    },
  });

  console.log('Admin user created');

  // Create artisan users with profiles
  const artisanPassword = await bcrypt.hash('artisan123', 10);
  const artisans = await Promise.all([
    prisma.user.create({
      data: {
        email: 'emma@handcraftedhaven.com',
        password: artisanPassword,
        name: 'Emma Johnson',
        role: UserRole.ARTISAN,
        artisanProfile: {
          create: {
            bio: 'I\'ve been creating handmade jewelry for over 10 years, specializing in silver and gemstone pieces.',
            shopName: 'Emma\'s Elegant Jewelry',
            location: 'Portland, OR',
            website: 'www.emmasjewelry.com',
            socialMedia: {
              instagram: '@emmasjewelry',
              facebook: 'EmmasJewelry',
            },
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        email: 'michael@handcraftedhaven.com',
        password: artisanPassword,
        name: 'Michael Chen',
        role: UserRole.ARTISAN,
        artisanProfile: {
          create: {
            bio: 'I create functional pottery inspired by traditional Japanese techniques with a modern twist.',
            shopName: 'Chen Ceramics',
            location: 'Seattle, WA',
            website: 'www.chenceramics.com',
            socialMedia: {
              instagram: '@chenceramics',
              pinterest: 'ChenCeramics',
            },
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        email: 'sophia@handcraftedhaven.com',
        password: artisanPassword,
        name: 'Sophia Martinez',
        role: UserRole.ARTISAN,
        artisanProfile: {
          create: {
            bio: 'I create handwoven textiles using traditional techniques passed down through generations.',
            shopName: 'Sophia\'s Textiles',
            location: 'Santa Fe, NM',
            website: 'www.sophiastextiles.com',
            socialMedia: {
              instagram: '@sophiastextiles',
              etsy: 'SophiasTextiles',
            },
          },
        },
      },
    }),
  ]);

  console.log('Artisan users created:', artisans.length);

  // Create customer users
  const customerPassword = await bcrypt.hash('customer123', 10);
  const customers = await Promise.all([
    prisma.user.create({
      data: {
        email: 'alex@example.com',
        password: customerPassword,
        name: 'Alex Thompson',
        role: UserRole.CUSTOMER,
      },
    }),
    prisma.user.create({
      data: {
        email: 'jamie@example.com',
        password: customerPassword,
        name: 'Jamie Wilson',
        role: UserRole.CUSTOMER,
      },
    }),
  ]);

  console.log('Customer users created:', customers.length);

  // Create products for each artisan
  // Emma's Jewelry
  const emmaProducts = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Silver Moonstone Necklace',
        description: 'Handcrafted silver pendant with a genuine moonstone, on an 18-inch sterling silver chain.',
        price: 89.99,
        inventory: 15,
        images: [
          'https://example.com/images/moonstone-necklace-1.jpg',
          'https://example.com/images/moonstone-necklace-2.jpg',
        ],
        artisanId: artisans[0].id,
        categories: {
          create: [
            { categoryId: categories[0].id }, // Jewelry
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Copper Wire Wrapped Earrings',
        description: 'Elegant earrings handcrafted with copper wire and small turquoise beads.',
        price: 45.00,
        inventory: 20,
        images: [
          'https://example.com/images/copper-earrings-1.jpg',
        ],
        artisanId: artisans[0].id,
        categories: {
          create: [
            { categoryId: categories[0].id }, // Jewelry
          ],
        },
      },
    }),
  ]);

  // Michael's Pottery
  const michaelProducts = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Ceramic Tea Set',
        description: 'Handcrafted 5-piece ceramic tea set with a teapot and four cups in a blue glaze finish.',
        price: 120.00,
        inventory: 8,
        images: [
          'https://example.com/images/tea-set-1.jpg',
          'https://example.com/images/tea-set-2.jpg',
        ],
        artisanId: artisans[1].id,
        categories: {
          create: [
            { categoryId: categories[1].id }, // Pottery
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Decorative Ceramic Vase',
        description: 'Tall ceramic vase with a unique textured surface, perfect for fresh or dried flowers.',
        price: 65.00,
        inventory: 12,
        images: [
          'https://example.com/images/ceramic-vase-1.jpg',
        ],
        artisanId: artisans[1].id,
        categories: {
          create: [
            { categoryId: categories[1].id }, // Pottery
            { categoryId: categories[4].id }, // Art
          ],
        },
      },
    }),
  ]);

  // Sophia's Textiles
  const sophiaProducts = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Hand-Woven Wool Blanket',
        description: 'Warm and cozy blanket hand-woven from 100% natural wool with traditional patterns.',
        price: 189.99,
        inventory: 5,
        images: [
          'https://example.com/images/wool-blanket-1.jpg',
          'https://example.com/images/wool-blanket-2.jpg',
        ],
        artisanId: artisans[2].id,
        categories: {
          create: [
            { categoryId: categories[2].id }, // Textiles
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Embroidered Table Runner',
        description: 'Beautiful hand-embroidered table runner with floral motifs, perfect for special occasions.',
        price: 55.00,
        inventory: 15,
        images: [
          'https://example.com/images/table-runner-1.jpg',
        ],
        artisanId: artisans[2].id,
        categories: {
          create: [
            { categoryId: categories[2].id }, // Textiles
          ],
        },
      },
    }),
  ]);

  console.log('Products created:', emmaProducts.length + michaelProducts.length + sophiaProducts.length);

  // Create reviews for products
  const reviews = await Promise.all([
    prisma.review.create({
      data: {
        rating: 5,
        comment: 'This necklace is absolutely beautiful! The craftsmanship is exceptional.',
        userId: customers[0].id,
        productId: emmaProducts[0].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 4,
        comment: 'Love my new tea set! The glaze is even more beautiful in person.',
        userId: customers[1].id,
        productId: michaelProducts[0].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 5,
        comment: 'This blanket is so warm and the colors are vibrant. Worth every penny!',
        userId: customers[0].id,
        productId: sophiaProducts[0].id,
      },
    }),
  ]);

  console.log('Reviews created:', reviews.length);

  // Create an order for a customer
  const order = await prisma.order.create({
    data: {
      userId: customers[0].id,
      status: 'DELIVERED',
      totalAmount: 209.99,
      shippingAddress: '123 Main St, Portland, OR 97201',
      paymentMethod: 'Credit Card',
      orderItems: {
        create: [
          {
            productId: emmaProducts[0].id,
            quantity: 1,
            priceAtPurchase: 89.99,
          },
          {
            productId: michaelProducts[1].id,
            quantity: 1,
            priceAtPurchase: 65.00,
          },
          {
            productId: sophiaProducts[1].id,
            quantity: 1,
            priceAtPurchase: 55.00,
          },
        ],
      },
    },
  });

  console.log('Order created with ID:', order.id);

  // Create cart items for a customer
  const cartItems = await Promise.all([
    prisma.cartItem.create({
      data: {
        userId: customers[1].id,
        productId: emmaProducts[1].id,
        quantity: 1,
      },
    }),
    prisma.cartItem.create({
      data: {
        userId: customers[1].id,
        productId: sophiaProducts[0].id,
        quantity: 1,
      },
    }),
  ]);

  console.log('Cart items created:', cartItems.length);

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during database seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });