'use client';

import { FormEvent, useState } from 'react';
import { Button, Input, TextArea, Label, Select } from '@/components/core';
import type { CreateSprintRequest, UpdateSprintRequest } from '@/libs/api';

interface SprintFormProps {
  productId: string;
  initialData?: UpdateSprintRequest & { id?: string };
  onSubmit: (
    data: CreateSprintRequest | UpdateSprintRequest,
  ) => Promise<void> | void;
  onCancel: () => void;
  isLoading?: boolean;
}

const statusOptions: Array<{
  value: UpdateSprintRequest['status'];
  label: string;
}> = [
  { value: 'PLANNED', label: '計画中' },
  { value: 'ACTIVE', label: '実行中' },
  { value: 'COMPLETED', label: '完了' },
];

export function SprintForm({
  productId,
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: SprintFormProps) {
  const [name, setName] = useState(initialData?.name ?? '');
  const [goal, setGoal] = useState(initialData?.goal ?? '');
  const [status, setStatus] = useState<UpdateSprintRequest['status']>(
    initialData?.status ?? 'PLANNED',
  );
  const [startDate, setStartDate] = useState(initialData?.endDate ?? '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!name.trim()) {
      newErrors.name = 'スプリント名を入力してください';
    }
    if (!goal.trim()) {
      newErrors.goal = 'ゴールを入力してください';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const data = initialData
      ? {
          name,
          goal,
          status,
          endDate: startDate || undefined,
        }
      : {
          productId,
          name,
          goal,
          startDate: startDate || undefined,
        };

    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Failed to submit sprint:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name">スプリント名</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!errors.name}
          disabled={isLoading}
          placeholder="Sprint 1"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <div>
        <Label htmlFor="goal">ゴール</Label>
        <TextArea
          id="goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          rows={4}
          error={!!errors.goal}
          disabled={isLoading}
          placeholder="このスプリントで達成したい目標を入力してください"
        />
        {errors.goal && (
          <p className="mt-1 text-sm text-red-600">{errors.goal}</p>
        )}
      </div>

      {initialData && (
        <div>
          <Label htmlFor="status">ステータス</Label>
          <Select
            id="status"
            value={status ?? ''}
            onChange={(e) =>
              setStatus(e.target.value as UpdateSprintRequest['status'])
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
        <Label htmlFor="startDate">{initialData ? '終了日' : '開始日'}</Label>
        <Input
          id="startDate"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
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
