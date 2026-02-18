'use client';

import { use } from 'react';
import { useGetBacklogItemsByBacklogItemIdQuery } from '@/libs/api';
import { Link, Spinner } from '@/components/core';

export default function BacklogDetailPage(props: {
  params: Promise<{ id: string; backlogId: string }>;
}) {
  const params = use(props.params);

  const {
    data: backlogItem,
    isLoading,
    error,
  } = useGetBacklogItemsByBacklogItemIdQuery({
    backlogItemId: params.backlogId,
  });

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

  const priorityLabels: Record<string, string> = {
    LOW: '低',
    MEDIUM: '中',
    HIGH: '高',
    CRITICAL: '最重要',
  };

  const priorityColors: Record<string, string> = {
    LOW: 'bg-gray-100 text-gray-800',
    MEDIUM: 'bg-blue-100 text-blue-800',
    HIGH: 'bg-orange-100 text-orange-800',
    CRITICAL: 'bg-red-100 text-red-800',
  };

  const statusLabels: Record<string, string> = {
    BACKLOG: 'バックログ',
    SPRINT_BACKLOG: 'スプリントバックログ',
    IN_PROGRESS: '進行中',
    REVIEW: 'レビュー中',
    DONE: '完了',
  };

  const priorityColor = backlogItem.priority
    ? priorityColors[backlogItem.priority]
    : 'bg-gray-100 text-gray-800';
  const priorityLabel = backlogItem.priority
    ? priorityLabels[backlogItem.priority]
    : '不明';
  const statusLabel = backlogItem.status
    ? statusLabels[backlogItem.status]
    : '不明';

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">バックログアイテム詳細</h1>
        <Link href={`/products/${params.id}/backlogs`} variant="secondary">
          一覧に戻る
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">{backlogItem.title}</h2>
          <div className="flex gap-2">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${priorityColor}`}
            >
              優先度: {priorityLabel}
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
              ステータス: {statusLabel}
            </span>
          </div>
        </div>

        {backlogItem.description && (
          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">説明</p>
            <p className="text-gray-900 whitespace-pre-wrap">
              {backlogItem.description}
            </p>
          </div>
        )}

        {backlogItem.storyPoint !== null &&
          backlogItem.storyPoint !== undefined && (
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">
                ストーリーポイント
              </p>
              <p className="text-lg font-semibold">{backlogItem.storyPoint}</p>
            </div>
          )}

        {backlogItem.sprintId && (
          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">
              割り当てスプリント
            </p>
            <Link
              href={`/products/${params.id}/sprints/${backlogItem.sprintId}`}
              variant="primary"
              className="inline-block"
            >
              スプリント詳細を見る
            </Link>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          {backlogItem.createdAt && (
            <div>
              <p className="text-sm font-medium text-gray-500">作成日時</p>
              <p className="text-gray-900">
                {new Date(backlogItem.createdAt).toLocaleString('ja-JP')}
              </p>
            </div>
          )}
          {backlogItem.updatedAt && (
            <div>
              <p className="text-sm font-medium text-gray-500">更新日時</p>
              <p className="text-gray-900">
                {new Date(backlogItem.updatedAt).toLocaleString('ja-JP')}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
