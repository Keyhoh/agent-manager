'use client';

import { useState } from 'react';
import type { Project, UpdateProjectRequest } from '@/services/api';
import { Button, Input, TextArea, Select, Label } from '@/components/core';

interface UpdateProjectFormProps {
  project: Project;
  onSubmit: (data: UpdateProjectRequest) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function UpdateProjectForm({ project, onSubmit, onCancel, isLoading }: UpdateProjectFormProps) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState<'ACTIVE' | 'ARCHIVED'>(project.status || 'ACTIVE');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description, status });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label="プロジェクト編集フォーム">
      <div>
        <Label htmlFor="name" required>
          プロジェクト名
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="プロジェクト名を入力"
          autoComplete="off"
          required
          aria-required="true"
          disabled={isLoading}
          aria-disabled={isLoading}
        />
      </div>

      <div>
        <Label htmlFor="description" required>
          説明
        </Label>
        <TextArea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="プロジェクトの説明を入力"
          required
          aria-required="true"
          disabled={isLoading}
          aria-disabled={isLoading}
        />
      </div>

      <div>
        <Label htmlFor="status" required>
          ステータス
        </Label>
        <Select
          id="status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as 'ACTIVE' | 'ARCHIVED')}
          required
          aria-required="true"
          disabled={isLoading}
          aria-disabled={isLoading}
        >
          <option value="ACTIVE">アクティブ</option>
          <option value="ARCHIVED">アーカイブ</option>
        </Select>
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          onClick={onCancel}
          variant="secondary"
          fullWidth
          disabled={isLoading}
        >
          キャンセル
        </Button>
        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isLoading}
        >
          更新
        </Button>
      </div>
    </form>
  );
}
