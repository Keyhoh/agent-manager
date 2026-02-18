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

      {/* AI管理への移行予定の警告 */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>注意:</strong> 将来的には、スプリントの作成・計画はAI
              Scrum
              Masterが自動的に行います。現在は開発中のため、手動で作成できますが、本来は人間が直接操作すべき機能ではありません。
            </p>
          </div>
        </div>
      </div>

      <SprintForm
        productId={params.id}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </main>
  );
}
