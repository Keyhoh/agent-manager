'use client';

import { useState } from 'react';
import type { CreateProjectRequest } from '@/services/api';

interface CreateProjectFormProps {
  onSubmit: (data: CreateProjectRequest) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function CreateProjectForm({ onSubmit, onCancel, isLoading }: CreateProjectFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [repositoryUrl, setRepositoryUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description, repositoryUrl });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label="プロジェクト作成フォーム">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 cursor-pointer">
          プロジェクト名 <span aria-label="必須">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
          placeholder="プロジェクト名を入力"
          autoComplete="off"
          required
          aria-required="true"
          disabled={isLoading}
          aria-disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1 cursor-pointer">
          説明 <span aria-label="必須">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
          placeholder="プロジェクトの説明を入力"
          required
          aria-required="true"
          disabled={isLoading}
          aria-disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="repositoryUrl" className="block text-sm font-medium text-gray-700 mb-1 cursor-pointer">
          リポジトリURL <span aria-label="必須">*</span>
        </label>
        <input
          id="repositoryUrl"
          name="repositoryUrl"
          type="url"
          value={repositoryUrl}
          onChange={(e) => setRepositoryUrl(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
          placeholder="https://github.com/user/repo"
          autoComplete="url"
          required
          aria-required="true"
          disabled={isLoading}
          aria-disabled={isLoading}
        />
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          disabled={isLoading}
          aria-disabled={isLoading}
        >
          キャンセル
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          disabled={isLoading}
          aria-disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? '作成中...' : '作成'}
        </button>
      </div>
    </form>
  );
}
