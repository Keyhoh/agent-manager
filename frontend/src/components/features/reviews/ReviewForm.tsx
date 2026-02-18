'use client';

import { FormEvent, useState } from 'react';
import { Button, Label, TextArea } from '@/components/core';
import type { CreateReviewRequest } from '@/libs/api';

interface ReviewFormProps {
  sprintId: string;
  onSubmit: (data: CreateReviewRequest) => Promise<void> | void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ReviewForm({
  sprintId,
  onSubmit,
  onCancel,
  isLoading,
}: ReviewFormProps) {
  const [reviewerId, setReviewerId] = useState('');
  const [rating, setRating] = useState<number>(3);
  const [comment, setComment] = useState('');
  const [approved, setApproved] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!reviewerId.trim()) {
      newErrors.reviewerId = 'レビュアー名を入力してください';
    }
    if (rating < 1 || rating > 5) {
      newErrors.rating = '評価は1~5の範囲で入力してください';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const data: CreateReviewRequest = {
      sprintId,
      reviewerId,
      rating,
      comment: comment || undefined,
      approved,
    };

    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="reviewerId">レビュアー名</Label>
        <input
          id="reviewerId"
          type="text"
          value={reviewerId}
          onChange={(e) => setReviewerId(e.target.value)}
          disabled={isLoading}
          placeholder="あなたの名前"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50"
        />
        {errors.reviewerId && (
          <p className="mt-1 text-sm text-red-600">{errors.reviewerId}</p>
        )}
      </div>

      <div>
        <Label htmlFor="rating">評価 (1-5)</Label>
        <div className="flex items-center gap-4 mt-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <label
              key={value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="rating"
                value={value}
                checked={rating === value}
                onChange={(e) => setRating(Number(e.target.value))}
                disabled={isLoading}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-2xl">{'★'.repeat(value)}</span>
            </label>
          ))}
        </div>
        {errors.rating && (
          <p className="mt-1 text-sm text-red-600">{errors.rating}</p>
        )}
      </div>

      <div>
        <Label htmlFor="comment">コメント（任意）</Label>
        <TextArea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          disabled={isLoading}
          placeholder="スプリントの成果物に対するフィードバックを入力してください"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="approved"
          type="checkbox"
          checked={approved}
          onChange={(e) => setApproved(e.target.checked)}
          disabled={isLoading}
          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
        />
        <Label htmlFor="approved" className="mb-0">
          このスプリントの成果物を承認する
        </Label>
      </div>

      <div className="flex gap-4 pt-4">
        <Button type="submit" disabled={isLoading} variant="primary">
          {isLoading ? 'レビュー送信中...' : 'レビューを送信'}
        </Button>
        <Button
          type="button"
          onClick={onCancel}
          variant="secondary"
          disabled={isLoading}
        >
          キャンセル
        </Button>
      </div>
    </form>
  );
}
