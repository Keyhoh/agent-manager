'use client';

import Link from 'next/link';
import { BacklogItem } from '@/libs/api';

interface BacklogItemCardProps {
  backlogItem: BacklogItem;
  productId: string;
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

export function BacklogItemCard({
  backlogItem,
  productId,
}: BacklogItemCardProps) {
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
    <article className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <Link
        href={`/products/${productId}/backlogs/${backlogItem.id}`}
        className="block space-y-3"
      >
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg line-clamp-2">
            {backlogItem.title}
          </h3>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${priorityColor}`}
          >
            {priorityLabel}
          </span>
        </div>

        {backlogItem.description && (
          <p className="text-gray-600 text-sm line-clamp-3">
            {backlogItem.description}
          </p>
        )}

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>ステータス: {statusLabel}</span>
          {backlogItem.storyPoint !== null &&
            backlogItem.storyPoint !== undefined && (
              <span>SP: {backlogItem.storyPoint}</span>
            )}
        </div>

        {backlogItem.updatedAt && (
          <time
            className="text-xs text-gray-400"
            dateTime={backlogItem.updatedAt}
          >
            更新: {new Date(backlogItem.updatedAt).toLocaleDateString('ja-JP')}
          </time>
        )}
      </Link>
    </article>
  );
}
