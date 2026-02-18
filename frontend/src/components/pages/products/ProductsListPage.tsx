'use client';

import { useGetProjectsQuery } from '@/libs/api';
import { ProjectCard } from '@/components/features/projects/ProjectCard';
import { Link, Spinner } from '@/components/core';

export function ProjectsListPage() {
  const { data: projects, isLoading, error } = useGetProjectsQuery();

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div
            className="bg-red-50 border border-red-200 rounded-lg p-4"
            role="alert"
          >
            <p className="text-red-800">プロダクトの読み込みに失敗しました</p>
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
            <h1 className="text-3xl font-bold text-gray-900">プロダクト管理</h1>
            <Link
              href="/projects/new"
              variant="primary"
              aria-label="新しいプロダクトを作成"
            >
              新規プロダクト
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <Spinner size="lg" className="py-12" />
        ) : projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">プロダクトがありません</p>
            <Link
              href="/projects/new"
              variant="ghost"
              className="mt-4 inline-block px-4 py-2"
            >
              最初のプロダクトを作成
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
