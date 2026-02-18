'use client';

import { useRouter } from 'next/navigation';
import { usePostBacklogItemsMutation } from '@/libs/api';
import { BacklogItemForm } from '@/components/features/backlog-items';
import type { CreateBacklogItemRequest, UpdateBacklogItemRequest } from '@/libs/api';
import { use } from 'react';

export default function NewBacklogItemPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = use(props.params);
  const router = useRouter();
  const [createBacklogItem, { isLoading }] = usePostBacklogItemsMutation();

  const handleSubmit = async (data: CreateBacklogItemRequest | UpdateBacklogItemRequest) => {
    try {
      await createBacklogItem({
        createBacklogItemRequest: data as CreateBacklogItemRequest,
      }).unwrap();
      router.push(`/products/${params.id}/backlog`);
    } catch (error) {
      console.error('Failed to create backlog item:', error);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">新規バックログアイテム作成</h1>
      <BacklogItemForm
        productId={params.id}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </main>
  );
}
