import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div>
          <h1>Welcome to Handcrafted Haven</h1>
          <p>
            Discover unique, artisan-made products and support creators who craft with heart and soul.
          </p>
          <Link href="/products" className="cta-button">
            Start Exploring
          </Link>
        </div>
      </section>

      <main>
        <section>
          <h2>Explore Handcrafted Collections</h2>
          <p>
            Handcrafted Haven is an innovative web application that aims to provide a platform for artisans and crafters to showcase and sell their unique handcrafted items. It serves as a virtual marketplace, connecting talented creators with potential customers who appreciate the beauty and quality of handmade products. The application focuses on fostering a sense of community, supporting local artisans, and promoting sustainable consumption.
          </p>
          <p>
            Handcrafted Haven aims to revolutionize the way handcrafted items are discovered, appreciated, and acquired. By providing a digital platform for artisans to showcase their creativity and connect with a broader audience, the web application fosters a thriving community of passionate creators and conscious consumers. With its user-friendly features, secure e-commerce capabilities, and emphasis on customization and community engagement, Handcrafted Haven is set to become the go-to destination for those seeking unique, handcrafted treasures.
          </p>

        </section>
      </main>
    </>
  );
}
