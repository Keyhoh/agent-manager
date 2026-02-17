'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import {
  useGetTasksByTaskIdQuery,
  usePutTasksByTaskIdMutation,
  useDeleteTasksByTaskIdMutation,
} from '@/services/api';
import { TaskForm } from '@/components/features/tasks';
import { Button, Spinner } from '@/components/core';
import type { UpdateTaskRequest } from '@/services/api';

export default function TaskDetailPage(props: {
  params: Promise<{ id: string; taskId: string }>;
}) {
  const params = use(props.params);
  const router = useRouter();
  const { data: task, isLoading, error } = useGetTasksByTaskIdQuery({ taskId: params.taskId });
  const [updateTask, { isLoading: isUpdating }] = usePutTasksByTaskIdMutation();
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTasksByTaskIdMutation();

  const handleSubmit = async (data: UpdateTaskRequest) => {
    try {
      await updateTask({
        taskId: params.taskId,
        updateTaskRequest: data,
      }).unwrap();
      router.push(`/projects/${params.id}/backlog`);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDelete = async () => {
    if (!confirm('このタスクを削除してもよろしいですか?')) {
      return;
    }

    try {
      await deleteTask({ taskId: params.taskId }).unwrap();
      router.push(`/projects/${params.id}/backlog`);
    } catch (error) {
      console.error('Failed to delete task:', error);
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

  if (error || !task) {
    return (
      <main className="container mx-auto px-4 py-8">
        <p className="text-red-600">タスクが見つかりませんでした。</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">タスク編集</h1>
        <Button
          onClick={handleDelete}
          variant="danger"
          disabled={isDeleting || isUpdating}
        >
          {isDeleting ? '削除中...' : '削除'}
        </Button>
      </div>
      <TaskForm
        projectId={params.id}
        initialData={{
          title: task.title,
          description: task.description,
          priority: task.priority,
          status: task.status,
          storyPoint: task.storyPoint ?? undefined,
          assignedAgentId: task.assignedAgentId ?? undefined,
        }}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isUpdating}
      />
    </main>
  );
}
