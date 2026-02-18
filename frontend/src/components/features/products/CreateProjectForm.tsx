'use client';

import { useState } from 'react';
import type { CreateProjectRequest } from '@/libs/api';
import { Button, Input, TextArea, Label } from '@/components/core';

interface CreateProjectFormProps {
  onSubmit: (data: CreateProjectRequest) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function CreateProjectForm({
  onSubmit,
  onCancel,
  isLoading,
}: CreateProjectFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [repositoryUrl, setRepositoryUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description, repositoryUrl });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      aria-label="プロダクト作成フォーム"
    >
      <div>
        <Label htmlFor="name" required>
          プロダクト名
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="プロダクト名を入力"
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
          placeholder="プロダクトの説明を入力"
          required
          aria-required="true"
          disabled={isLoading}
          aria-disabled={isLoading}
        />
      </div>

      <div>
        <Label htmlFor="repositoryUrl" required>
          リポジトリURL
        </Label>
        <Input
          id="repositoryUrl"
          name="repositoryUrl"
          type="url"
          value={repositoryUrl}
          onChange={(e) => setRepositoryUrl(e.target.value)}
          placeholder="https://github.com/user/repo"
          autoComplete="url"
          required
          aria-required="true"
          disabled={isLoading}
          aria-disabled={isLoading}
        />
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
        <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
          作成
        </Button>
      </div>
    </form>
  );
}
