'use client';

import Link from 'next/link';
import type { Project } from '@/services/api';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const statusColor = project.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  const statusText = project.status === 'ACTIVE' ? 'アクティブ' : 'アーカイブ';

  return (
    <Link href={`/projects/${project.id}`}>
      <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer">
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

        {project.repositoryUrl && (
          <div className="mb-4">
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline truncate block"
            >
              {project.repositoryUrl}
            </a>
          </div>
        )}

        <div className="text-xs text-gray-500">
          <div>更新日: {project.updatedAt ? new Date(project.updatedAt).toLocaleDateString('ja-JP') : '-'}</div>
        </div>
      </div>
    </Link>
  );
}
