'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import {
  useGetBacklogItemsByBacklogItemIdQuery,
  usePutBacklogItemsByBacklogItemIdMutation,
  useDeleteBacklogItemsByBacklogItemIdMutation,
} from '@/libs/api';
import { BacklogItemForm } from '@/components/features/backlog-items';
import { Button, Spinner } from '@/components/core';
import type { UpdateBacklogItemRequest } from '@/libs/api';

export default function BacklogItemDetailPage(props: {
  params: Promise<{ id: string; backlogId: string }>;
}) {
  const params = use(props.params);
  const router = useRouter();
  const {
    data: backlogItem,
    isLoading,
    error,
  } = useGetBacklogItemsByBacklogItemIdQuery({
    backlogItemId: params.backlogId,
  });
  const [updateBacklogItem, { isLoading: isUpdating }] =
    usePutBacklogItemsByBacklogItemIdMutation();
  const [deleteBacklogItem, { isLoading: isDeleting }] =
    useDeleteBacklogItemsByBacklogItemIdMutation();

  const handleSubmit = async (data: UpdateBacklogItemRequest) => {
    try {
      await updateBacklogItem({
        backlogItemId: params.backlogId,
        updateBacklogItemRequest: data,
      }).unwrap();
      router.push(`/products/${params.id}/backlogs`);
    } catch (error) {
      console.error('Failed to update backlog item:', error);
    }
  };

  const handleDelete = async () => {
    if (!confirm('このバックログアイテムを削除してもよろしいですか?')) {
      return;
    }

    try {
      await deleteBacklogItem({ backlogItemId: params.backlogId }).unwrap();
      router.push(`/products/${params.id}/backlogs`);
    } catch (error) {
      console.error('Failed to delete backlog item:', error);
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

  if (error || !backlogItem) {
    return (
      <main className="container mx-auto px-4 py-8">
        <p className="text-red-600">
          バックログアイテムが見つかりませんでした。
        </p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">バックログアイテム編集</h1>
        <Button
          onClick={handleDelete}
          variant="danger"
          disabled={isDeleting || isUpdating}
        >
          {isDeleting ? '削除中...' : '削除'}
        </Button>
      </div>
      <BacklogItemForm
        productId={params.id}
        initialData={{
          title: backlogItem.title,
          description: backlogItem.description,
          priority: backlogItem.priority,
          status: backlogItem.status,
          storyPoint: backlogItem.storyPoint ?? undefined,
          assignedAgentId: backlogItem.assignedAgentId ?? undefined,
        }}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isUpdating}
      />
    </main>
  );
}
