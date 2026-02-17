'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import {
  useGetSprintsBySprintIdQuery,
  usePutSprintsBySprintIdMutation,
  useGetSprintsBySprintIdTasksQuery,
} from '@/services/api';
import { SprintForm } from '@/components/features/sprints';
import { TaskCard } from '@/components/features/tasks';
import { Button, Link, Spinner } from '@/components/core';
import type { UpdateSprintRequest } from '@/services/api';

export default function SprintDetailPage(props: {
  params: Promise<{ id: string; sprintId: string }>;
}) {
  const params = use(props.params);
  const router = useRouter();
  const { data: sprint, isLoading, error } = useGetSprintsBySprintIdQuery({ sprintId: params.sprintId });
  const { data: tasks } = useGetSprintsBySprintIdTasksQuery({ sprintId: params.sprintId });
  const [updateSprint, { isLoading: isUpdating }] = usePutSprintsBySprintIdMutation();

  const handleSubmit = async (data: UpdateSprintRequest) => {
    try {
      await updateSprint({
        sprintId: params.sprintId,
        updateSprintRequest: data,
      }).unwrap();
      router.push(`/projects/${params.id}/sprints`);
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
        <Link href={`/projects/${params.id}/sprints`} variant="secondary">
          一覧に戻る
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">スプリント情報</h2>
          <SprintForm
            projectId={params.id}
            initialData={{
              name: sprint.name,
              goal: sprint.goal,
              status: sprint.status,
              endDate: sprint.endDate ? new Date(sprint.endDate).toISOString().split('T')[0] : undefined,
            }}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isUpdating}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">スプリントタスク</h2>
          {tasks && tasks.length === 0 ? (
            <p className="text-gray-500">タスクが割り当てられていません</p>
          ) : (
            <div className="space-y-4">
              {tasks?.map((task) => (
                <TaskCard key={task.id} task={task} projectId={params.id} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
