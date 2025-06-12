'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthContext';

type Review = {
  id: string;
  rating: number;
  comment: string;
  userName: string;
  createdAt: string;
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();

  const [product, setProduct] = useState<any>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    fetch(`/api/products/${id}`).then(res => res.json()).then(setProduct);
    fetch(`/api/products/${id}/reviews`).then(res => res.json()).then(setReviews);
  }, [id]);

  const submitReview = async () => {
    if (!user) {
      alert('You must be logged in to submit a review.');
      return;
    }

    const res = await fetch(`/api/products/${id}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating, comment, userId: user.id }),
    });

    if (res.status === 409) {
      alert('You already submitted a review for this product.');
      return;
    }

    if (res.ok) {
      const newReview = await res.json();
      setReviews((prev) => [newReview, ...prev]);
      setComment('');
      setRating(5);
    } else {
      alert('Error submitting review.');
    }
  };

  if (!product) return <p>Loading...</p>;
  const categoryNames = product.categories.map((c: { category: { name: string } }) => c.category.name);
  return (
    <main>
      <div className="product-detail-wrapper">
        {/* Top section: product info */}
        <div className="product-detail-top">
          <div className="product-detail-image">
           <img
            //src={product.images[0] || '/placeholder.jpg'}
            src={'/placeholder.svg'}
            alt={product.name}
          />
          </div>
          <div className="product-detail-content">
            <h1>{product.name}</h1>
            <p className="product-description">{product.description}</p>
            <p className="price">${product.price}</p>
            <p className="artisan-name">by {product.artisan.name}</p>
            <p className="product-categories">
              Categories: {categoryNames.join(', ')}
            </p>
          </div>
        </div>

        {/* Review Form */}
        {user && (
          <div className="review-form">
            <h2>Leave a Review</h2>
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>{r} Star{r > 1 && 's'}</option>
              ))}
            </select>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment..."
            />
            <button onClick={submitReview} className="cta-button">Submit</button>
          </div>
        )}

        {/* Reviews List */}
        <div className="review-list">
          <h3>Reviews</h3>
          {reviews.length === 0 && <p>No reviews yet.</p>}
          {reviews.map((r) => (
            <div key={r.id} className="review-card">
              <strong>{r.userName}</strong> — {r.rating}⭐
              <p>{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
