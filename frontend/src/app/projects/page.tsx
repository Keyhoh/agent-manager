'use client';

import Link from 'next/link';
import {
  useGetProjectsQuery,
  useDeleteProjectsByProjectIdMutation,
} from '@/services/api';
import { ProjectCard } from '@/components/features/projects/ProjectCard';
import type { Project } from '@/services/api';

export default function ProjectsPage() {
  const { data: projects, isLoading, error } = useGetProjectsQuery();
  const [deleteProject] = useDeleteProjectsByProjectIdMutation();

  const handleDelete = async (project: Project) => {
    if (!project.id || !window.confirm(`「${project.name}」を削除してもよろしいですか？`)) {
      return;
    }
    try {
      await deleteProject({ projectId: project.id }).unwrap();
    } catch (err) {
      console.error('Failed to delete project:', err);
      alert('プロジェクトの削除に失敗しました');
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">プロジェクトの読み込みに失敗しました</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">プロジェクト管理</h1>
            <Link
              href="/projects/new"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              新規プロジェクト
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">プロジェクトがありません</p>
            <Link
              href="/projects/new"
              className="mt-4 inline-block px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              最初のプロジェクトを作成
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
