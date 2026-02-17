'use client';

import { useRouter } from 'next/navigation';
import { usePostProjectsMutation } from '@/services/api';
import { ProjectForm } from '@/components/features/projects/ProjectForm';
import type { CreateProjectRequest } from '@/services/api';

export default function NewProjectPage() {
  const router = useRouter();
  const [createProject, { isLoading }] = usePostProjectsMutation();

  const handleSubmit = async (data: CreateProjectRequest) => {
    try {
      await createProject({ createProjectRequest: data }).unwrap();
      router.push('/projects');
    } catch (err) {
      console.error('Failed to create project:', err);
      alert('プロジェクトの作成に失敗しました');
    }
  };

  const handleCancel = () => {
    router.push('/projects');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">新規プロジェクト作成</h1>
          <p className="mt-2 text-gray-600">
            新しいプロジェクトを作成します。必須項目を入力してください。
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <ProjectForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
