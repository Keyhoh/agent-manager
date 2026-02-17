'use client';

import { useRouter, useParams } from 'next/navigation';
import {
  useGetProjectsByProjectIdQuery,
  usePutProjectsByProjectIdMutation,
} from '@/services/api';
import { ProjectForm } from '@/components/features/projects/ProjectForm';
import type { UpdateProjectRequest } from '@/services/api';

export function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  const { data: project, isLoading: isLoadingProject } = useGetProjectsByProjectIdQuery({ projectId });
  const [updateProject, { isLoading: isUpdating }] = usePutProjectsByProjectIdMutation();

  const handleSubmit = async (data: UpdateProjectRequest) => {
    try {
      await updateProject({ projectId, updateProjectRequest: data }).unwrap();
      router.push('/projects');
    } catch (err) {
      console.error('Failed to update project:', err);
      alert('プロジェクトの更新に失敗しました');
    }
  };

  const handleCancel = () => {
    router.push('/projects');
  };

  if (isLoadingProject) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center">読み込み中...</div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center text-red-600">プロジェクトが見つかりません</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">プロジェクト編集</h1>
          <p className="mt-2 text-gray-600">
            プロジェクト「{project.name}」を編集します。
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <ProjectForm
            project={project}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isUpdating}
          />
        </div>
      </div>
    </div>
  );
}
