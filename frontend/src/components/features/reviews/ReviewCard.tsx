'use client';

import { Review } from '@/libs/api';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const approvedColor = review.approved
    ? 'bg-green-100 text-green-800'
    : 'bg-yellow-100 text-yellow-800';
  const approvedText = review.approved ? '承認済み' : '未承認';

  return (
    <article className="border border-gray-200 rounded-lg p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="font-semibold text-gray-900">{review.reviewerId}</h4>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-yellow-500 text-lg">
              {'★'.repeat(review.rating ?? 0)}
              {'☆'.repeat(5 - (review.rating ?? 0))}
            </span>
            <span className="text-sm text-gray-600">
              ({review.rating ?? 0}/5)
            </span>
          </div>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${approvedColor}`}
        >
          {approvedText}
        </span>
      </div>

      {review.comment && (
        <p className="text-gray-700 text-sm whitespace-pre-wrap">
          {review.comment}
        </p>
      )}

      <div className="text-xs text-gray-500">
        {review.createdAt
          ? new Date(review.createdAt).toLocaleString('ja-JP')
          : ''}
      </div>
    </article>
  );
}
