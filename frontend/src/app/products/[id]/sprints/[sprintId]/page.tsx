'use client';

import { use, useState } from 'react';
import {
  useGetSprintsBySprintIdQuery,
  useGetSprintsBySprintIdBacklogItemsQuery,
  useGetReviewsQuery,
  usePostReviewsMutation,
} from '@/libs/api';
import { BacklogItemCard } from '@/components/features/backlog-items';
import { ReviewForm, ReviewCard } from '@/components/features/reviews';
import { Button, Link, Spinner } from '@/components/core';
import type { CreateReviewRequest } from '@/libs/api';

export default function SprintDetailPage(props: {
  params: Promise<{ id: string; sprintId: string }>;
}) {
  const params = use(props.params);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const {
    data: sprint,
    isLoading,
    error,
  } = useGetSprintsBySprintIdQuery({ sprintId: params.sprintId });
  const { data: backlogItems } = useGetSprintsBySprintIdBacklogItemsQuery({
    sprintId: params.sprintId,
  });
  const { data: reviews } = useGetReviewsQuery({ sprintId: params.sprintId });
  const [createReview, { isLoading: isCreatingReview }] =
    usePostReviewsMutation();

  const handleReviewSubmit = async (data: CreateReviewRequest) => {
    try {
      await createReview({ createReviewRequest: data }).unwrap();
      setShowReviewForm(false);
    } catch (error) {
      console.error('Failed to create review:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !sprint) {
    return (
      <main className="container mx-auto px-4 py-8">
        <p className="text-red-600">スプリントが見つかりませんでした。</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">スプリント詳細</h1>
        <Link href={`/products/${params.id}/sprints`} variant="secondary">
          一覧に戻る
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">スプリント情報</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  スプリント名
                </p>
                <p className="text-lg">{sprint.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">ゴール</p>
                <p className="text-lg">{sprint.goal || '未設定'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">ステータス</p>
                <p className="text-lg">{sprint.status}</p>
              </div>
              {sprint.endDate && (
                <div>
                  <p className="text-sm font-medium text-gray-500">終了日</p>
                  <p className="text-lg">
                    {new Date(sprint.endDate).toLocaleDateString('ja-JP')}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">
              スプリントバックログアイテム
            </h2>
            {backlogItems && backlogItems.length === 0 ? (
              <p className="text-gray-500">
                バックログアイテムが割り当てられていません
              </p>
            ) : (
              <div className="space-y-4">
                {backlogItems?.map((backlogItem) => (
                  <BacklogItemCard
                    key={backlogItem.id}
                    backlogItem={backlogItem}
                    productId={params.id}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">スプリントレビュー</h2>
              {!showReviewForm && sprint.status === 'COMPLETED' && (
                <Button
                  onClick={() => setShowReviewForm(true)}
                  variant="primary"
                  size="sm"
                >
                  レビューを追加
                </Button>
              )}
            </div>

            {sprint.status !== 'COMPLETED' && (
              <p className="text-sm text-gray-500 mb-4">
                スプリントが完了するとレビューを追加できます
              </p>
            )}

            {showReviewForm && (
              <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                <ReviewForm
                  sprintId={params.sprintId}
                  onSubmit={handleReviewSubmit}
                  onCancel={() => setShowReviewForm(false)}
                  isLoading={isCreatingReview}
                />
              </div>
            )}

            {reviews && reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">まだレビューがありません</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
