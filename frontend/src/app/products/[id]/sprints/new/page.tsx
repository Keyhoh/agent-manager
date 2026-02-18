'use client';

import { useRouter } from 'next/navigation';
import { usePostSprintsMutation } from '@/libs/api';
import { SprintForm } from '@/components/features/sprints';
import type { CreateSprintRequest, UpdateSprintRequest } from '@/libs/api';
import { use } from 'react';

export default function NewSprintPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = use(props.params);
  const router = useRouter();
  const [createSprint, { isLoading }] = usePostSprintsMutation();

  const handleSubmit = async (
    data: CreateSprintRequest | UpdateSprintRequest,
  ) => {
    try {
      await createSprint({
        createSprintRequest: data as CreateSprintRequest,
      }).unwrap();
      router.push(`/products/${params.id}/sprints`);
    } catch (error) {
      console.error('Failed to create sprint:', error);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">新規スプリント作成</h1>
      <SprintForm
        productId={params.id}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </main>
  );
}
