'use client';

import type { Project } from '@/libs/api-client/src';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  const statusColor = project.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  const statusText = project.status === 'ACTIVE' ? 'アクティブ' : 'アーカイブ';

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.name}</h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
            {statusText}
          </span>
        </div>
      </div>

      {project.description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>
      )}

      <div className="mb-4">
        <a
          href={project.repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
        >
          {project.repositoryUrl}
        </a>
      </div>

      <div className="text-xs text-gray-500 mb-4">
        <div>作成日: {project.createdAt ? new Date(project.createdAt).toLocaleDateString('ja-JP') : '-'}</div>
        <div>更新日: {project.updatedAt ? new Date(project.updatedAt).toLocaleDateString('ja-JP') : '-'}</div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(project)}
          className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          編集
        </button>
        <button
          onClick={() => onDelete(project)}
          className="flex-1 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          削除
        </button>
      </div>
    </div>
  );
}
