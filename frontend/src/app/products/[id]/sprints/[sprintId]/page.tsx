'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  useGetSprintsBySprintIdQuery,
  usePutSprintsBySprintIdMutation,
  useGetSprintsBySprintIdBacklogItemsQuery,
  useGetReviewsQuery,
  usePostReviewsMutation,
} from '@/libs/api';
import { SprintForm } from '@/components/features/sprints';
import { BacklogItemCard } from '@/components/features/backlog-items';
import { ReviewForm, ReviewCard } from '@/components/features/reviews';
import { Button, Link, Spinner } from '@/components/core';
import type { UpdateSprintRequest, CreateReviewRequest } from '@/libs/api';

export default function SprintDetailPage(props: {
  params: Promise<{ id: string; sprintId: string }>;
}) {
  const params = use(props.params);
  const router = useRouter();
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
  const [updateSprint, { isLoading: isUpdating }] =
    usePutSprintsBySprintIdMutation();
  const [createReview, { isLoading: isCreatingReview }] =
    usePostReviewsMutation();

  const handleSubmit = async (data: UpdateSprintRequest) => {
    try {
      await updateSprint({
        sprintId: params.sprintId,
        updateSprintRequest: data,
      }).unwrap();
      router.push(`/products/${params.id}/sprints`);
    } catch (error) {
      console.error('Failed to update sprint:', error);
    }
  };

  const handleReviewSubmit = async (data: CreateReviewRequest) => {
    try {
      await createReview({ createReviewRequest: data }).unwrap();
      setShowReviewForm(false);
    } catch (error) {
      console.error('Failed to create review:', error);
    }
  };

  const handleCancel = () => {
    router.back();
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
            <SprintForm
              productId={params.id}
              initialData={{
                name: sprint.name,
                goal: sprint.goal,
                status: sprint.status,
                endDate: sprint.endDate
                  ? new Date(sprint.endDate).toISOString().split('T')[0]
                  : undefined,
              }}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isLoading={isUpdating}
            />
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
