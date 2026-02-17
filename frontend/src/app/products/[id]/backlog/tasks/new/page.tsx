'use client';

import { useRouter } from 'next/navigation';
import { usePostTasksMutation } from '@/libs/api';
import { TaskForm } from '@/components/features/tasks';
import type { CreateTaskRequest, UpdateTaskRequest } from '@/libs/api';
import { use } from 'react';

export default function NewTaskPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const router = useRouter();
  const [createTask, { isLoading }] = usePostTasksMutation();

  const handleSubmit = async (data: CreateTaskRequest | UpdateTaskRequest) => {
    try {
      await createTask({ createTaskRequest: data as CreateTaskRequest }).unwrap();
      router.push(`/projects/${params.id}/backlog`);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">新規バックログアイテム作成</h1>
      <TaskForm
        projectId={params.id}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </main>
  );
}
