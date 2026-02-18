'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import {
  useGetSprintsBySprintIdQuery,
  usePutSprintsBySprintIdMutation,
  useGetSprintsBySprintIdBacklogItemsQuery,
} from '@/libs/api';
import { SprintForm } from '@/components/features/sprints';
import { BacklogItemCard } from '@/components/features/backlog-items';
import { Button, Link, Spinner } from '@/components/core';
import type { UpdateSprintRequest } from '@/libs/api';

export default function SprintDetailPage(props: {
  params: Promise<{ id: string; sprintId: string }>;
}) {
  const params = use(props.params);
  const router = useRouter();
  const {
    data: sprint,
    isLoading,
    error,
  } = useGetSprintsBySprintIdQuery({ sprintId: params.sprintId });
  const { data: backlogItems } = useGetSprintsBySprintIdBacklogItemsQuery({
    sprintId: params.sprintId,
  });
  const [updateSprint, { isLoading: isUpdating }] =
    usePutSprintsBySprintIdMutation();

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
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">スプリント詳細</h1>
        <Link href={`/products/${params.id}/sprints`} variant="secondary">
          一覧に戻る
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
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
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">スプリントバックログアイテム</h2>
          {backlogItems && backlogItems.length === 0 ? (
            <p className="text-gray-500">バックログアイテムが割り当てられていません</p>
          ) : (
            <div className="space-y-4">
              {backlogItems?.map((backlogItem) => (
                <BacklogItemCard key={backlogItem.id} backlogItem={backlogItem} productId={params.id} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
