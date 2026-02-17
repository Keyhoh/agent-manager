'use client';

import { useGetProjectsByProjectIdBacklogQuery } from '@/libs/api';
import { TaskCard } from '@/components/features/tasks';
import { Button, Link, Spinner } from '@/components/core';
import { use } from 'react';

export default function BacklogPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const { data: tasks, isLoading, error } = useGetProjectsByProjectIdBacklogQuery({ projectId: params.id });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-600">エラーが発生しました。再読み込みしてください。</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">バックログ</h1>
        <div className="flex gap-4">
          <Link href={`/projects/${params.id}`} variant="secondary">
            プロダクトに戻る
          </Link>
          <Link href={`/projects/${params.id}/backlog/tasks/new`} variant="primary">
            新規バックログアイテム作成
          </Link>
        </div>
      </div>

      {tasks && tasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">バックログアイテムがまだありません</p>
          <Link href={`/projects/${params.id}/backlog/tasks/new`} variant="primary">
            最初のバックログアイテムを作成
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks?.map((task) => (
            <TaskCard key={task.id} task={task} projectId={params.id} />
          ))}
        </div>
      )}
    </main>
  );
}
