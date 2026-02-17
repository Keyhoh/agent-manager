'use client';

import Link from 'next/link';
import { Sprint } from '@/libs/api';

interface SprintCardProps {
  sprint: Sprint;
  projectId: string;
}

const statusLabels: Record<string, string> = {
  PLANNED: '計画中',
  ACTIVE: '実行中',
  COMPLETED: '完了',
};

const statusColors: Record<string, string> = {
  PLANNED: 'bg-gray-100 text-gray-800',
  ACTIVE: 'bg-blue-100 text-blue-800',
  COMPLETED: 'bg-green-100 text-green-800',
};

export function SprintCard({ sprint, projectId }: SprintCardProps) {
  const statusColor = sprint.status ? statusColors[sprint.status] : 'bg-gray-100 text-gray-800';
  const statusLabel = sprint.status ? statusLabels[sprint.status] : '不明';

  return (
    <article className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <Link
        href={`/projects/${projectId}/sprints/${sprint.id}`}
        className="block space-y-3"
      >
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg line-clamp-1">{sprint.name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${statusColor}`}>
            {statusLabel}
          </span>
        </div>

        {sprint.goal && (
          <p className="text-gray-600 text-sm line-clamp-2">{sprint.goal}</p>
        )}

        <div className="flex items-center gap-4 text-sm text-gray-500">
          {sprint.startDate && (
            <time dateTime={sprint.startDate}>
              開始: {new Date(sprint.startDate).toLocaleDateString('ja-JP')}
            </time>
          )}
          {sprint.endDate && (
            <time dateTime={sprint.endDate}>
              終了: {new Date(sprint.endDate).toLocaleDateString('ja-JP')}
            </time>
          )}
        </div>

        {sprint.updatedAt && (
          <time className="text-xs text-gray-400" dateTime={sprint.updatedAt}>
            更新: {new Date(sprint.updatedAt).toLocaleDateString('ja-JP')}
          </time>
        )}
      </Link>
    </article>
  );
}
