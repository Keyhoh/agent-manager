'use client';

import { FormEvent, useState } from 'react';
import { Button } from '@/components/core';
import { Input } from '@/components/core';
import { TextArea } from '@/components/core';
import { Label } from '@/components/core';
import { Select } from '@/components/core';
import type { CreateBacklogItemRequest, UpdateBacklogItemRequest } from '@/libs/api';

interface BacklogItemFormProps {
  productId: string;
  initialData?: UpdateBacklogItemRequest & { id?: string };
  onSubmit: (
    data: CreateBacklogItemRequest | UpdateBacklogItemRequest,
  ) => Promise<void> | void;
  onCancel: () => void;
  isLoading?: boolean;
}

const priorityOptions: Array<{
  value: CreateBacklogItemRequest['priority'];
  label: string;
}> = [
  { value: 'LOW', label: '低' },
  { value: 'MEDIUM', label: '中' },
  { value: 'HIGH', label: '高' },
  { value: 'CRITICAL', label: '最重要' },
];

const statusOptions: Array<{
  value: UpdateBacklogItemRequest['status'];
  label: string;
}> = [
  { value: 'BACKLOG', label: 'バックログ' },
  { value: 'SPRINT_BACKLOG', label: 'スプリントバックログ' },
  { value: 'IN_PROGRESS', label: '進行中' },
  { value: 'REVIEW', label: 'レビュー中' },
  { value: 'DONE', label: '完了' },
];

export function BacklogItemForm({
  productId,
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: BacklogItemFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [description, setDescription] = useState(
    initialData?.description ?? '',
  );
  const [priority, setPriority] = useState<CreateTaskRequest['priority']>(
    initialData?.priority ?? 'MEDIUM',
  );
  const [status, setStatus] = useState<UpdateTaskRequest['status']>(
    initialData?.status ?? 'BACKLOG',
  );
  const [storyPoint, setStoryPoint] = useState(
    initialData?.storyPoint?.toString() ?? '',
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!title.trim()) {
      newErrors.title = 'タイトルを入力してください';
    }
    if (!description.trim()) {
      newErrors.description = '説明を入力してください';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const data = initialData
      ? {
          title,
          description,
          priority,
          status,
          storyPoint: storyPoint ? parseInt(storyPoint, 10) : undefined,
        }
      : {
          productId,
          title,
          description,
          priority,
          storyPoint: storyPoint ? parseInt(storyPoint, 10) : undefined,
        };

    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Failed to submit backlog item:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="title">タイトル</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={!!errors.title}
          disabled={isLoading}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description">説明</Label>
        <TextArea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
          error={!!errors.description}
          disabled={isLoading}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>

      <div>
        <Label htmlFor="priority">優先度</Label>
        <Select
          id="priority"
          value={priority ?? ''}
          onChange={(e) =>
            setPriority(e.target.value as CreateTaskRequest['priority'])
          }
          disabled={isLoading}
        >
          {priorityOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>

      {initialData && (
        <div>
          <Label htmlFor="status">ステータス</Label>
          <Select
            id="status"
            value={status ?? ''}
            onChange={(e) =>
              setStatus(e.target.value as UpdateTaskRequest['status'])
            }
            disabled={isLoading}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
      )}

      <div>
        <Label htmlFor="storyPoint">ストーリーポイント</Label>
        <Input
          id="storyPoint"
          type="number"
          value={storyPoint}
          onChange={(e) => setStoryPoint(e.target.value)}
          min="1"
          disabled={isLoading}
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading} variant="primary">
          {isLoading ? '保存中...' : initialData ? '更新' : '作成'}
        </Button>
        <Button
          type="button"
          onClick={onCancel}
          variant="secondary"
          disabled={isLoading}
        >
          キャンセル
        </Button>
      </div>
    </form>
  );
}
