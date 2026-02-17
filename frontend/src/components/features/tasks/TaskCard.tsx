'use client';

import Link from 'next/link';
import { Task } from '@/services/api';

interface TaskCardProps {
  task: Task;
  projectId: string;
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

export function TaskCard({ task, projectId }: TaskCardProps) {
  const priorityColor = task.priority ? priorityColors[task.priority] : 'bg-gray-100 text-gray-800';
  const priorityLabel = task.priority ? priorityLabels[task.priority] : '不明';
  const statusLabel = task.status ? statusLabels[task.status] : '不明';

  return (
    <article className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <Link
        href={`/projects/${projectId}/backlog/tasks/${task.id}`}
        className="block space-y-3"
      >
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg line-clamp-2">{task.title}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${priorityColor}`}>
            {priorityLabel}
          </span>
        </div>

        {task.description && (
          <p className="text-gray-600 text-sm line-clamp-3">{task.description}</p>
        )}

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>ステータス: {statusLabel}</span>
          {task.storyPoint !== null && task.storyPoint !== undefined && (
            <span>SP: {task.storyPoint}</span>
          )}
        </div>

        {task.updatedAt && (
          <time className="text-xs text-gray-400" dateTime={task.updatedAt}>
            更新: {new Date(task.updatedAt).toLocaleDateString('ja-JP')}
          </time>
        )}
      </Link>
    </article>
  );
}
