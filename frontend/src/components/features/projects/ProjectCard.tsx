'use client';

import Link from 'next/link';
import type { Project } from '@/libs/api';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const statusColor = project.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  const statusText = project.status === 'ACTIVE' ? 'アクティブ' : 'アーカイブ';

  return (
    <article className="h-full">
      <Link 
        href={`/projects/${project.id}`}
        aria-label={`${project.name}の詳細を表示`}
        className="block h-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
      >
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all h-full flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">{project.name}</h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
                {statusText}
              </span>
            </div>
          </div>

          {project.description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{project.description}</p>
          )}

          <div className="mt-auto space-y-2">
            {project.repositoryUrl && (
              <div>
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`リポジトリ ${project.repositoryUrl} を新しいタブで開く`}
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline truncate inline-block max-w-full cursor-pointer"
                >
                  {project.repositoryUrl}
                </a>
              </div>
            )}

            <div className="text-xs text-gray-500">
              <time dateTime={project.updatedAt}>
                更新日: {project.updatedAt ? new Date(project.updatedAt).toLocaleDateString('ja-JP') : '-'}
              </time>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
