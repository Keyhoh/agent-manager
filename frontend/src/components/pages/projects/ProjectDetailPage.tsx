'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  useGetProjectsByProjectIdQuery,
  usePutProjectsByProjectIdMutation,
  useDeleteProjectsByProjectIdMutation,
} from '@/services/api';
import { UpdateProjectForm } from '@/components/features/projects/UpdateProjectForm';
import { Link, Button, Spinner } from '@/components/core';
import type { UpdateProjectRequest } from '@/services/api';

export function ProjectDetailPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  const { data: project, isLoading: isLoadingProject } = useGetProjectsByProjectIdQuery({ projectId });
  const [updateProject, { isLoading: isUpdating }] = usePutProjectsByProjectIdMutation();
  const [deleteProject] = useDeleteProjectsByProjectIdMutation();

  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async (data: UpdateProjectRequest) => {
    try {
      await updateProject({ projectId, updateProjectRequest: data }).unwrap();
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update project:', err);
      alert('プロジェクトの更新に失敗しました');
    }
  };

  const handleDelete = async () => {
    if (!project?.name || !window.confirm(`「${project.name}」を削除してもよろしいですか？`)) {
      return;
    }
    try {
      await deleteProject({ projectId }).unwrap();
      router.push('/projects');
    } catch (err) {
      console.error('Failed to delete project:', err);
      alert('プロジェクトの削除に失敗しました');
    }
  };

  if (isLoadingProject) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Spinner size="lg" className="py-12" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center" role="alert">
            <p className="text-red-600 text-lg mb-4">プロジェクトが見つかりません</p>
            <Link
              href="/projects"
              variant="primary"
            >
              プロジェクト一覧に戻る
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const statusColor = project.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  const statusText = project.status === 'ACTIVE' ? 'アクティブ' : 'アーカイブ';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* ナビゲーション */}
        <nav className="mb-6" aria-label="パンくずリスト">
          <Link
            href="/projects"
            variant="primary"
          >
            ← プロジェクト一覧に戻る
          </Link>
        </nav>

        {/* ヘッダー */}
        <header className="mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${statusColor}`}>
                {statusText}
              </span>
            </div>
            {!isEditing && (
              <div className="flex gap-2" role="group" aria-label="プロジェクト操作">
                <Link
                  href={`/projects/${projectId}/backlog`}
                  variant="secondary"
                >
                  バックログ
                </Link>
                <Link
                  href={`/projects/${projectId}/sprints`}
                  variant="secondary"
                >
                  スプリント
                </Link>
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="primary"
                  aria-label="プロジェクトを編集"
                >
                  編集
                </Button>
                <Button
                  onClick={handleDelete}
                  variant="danger"
                  aria-label="プロジェクトを削除"
                >
                  削除
                </Button>
              </div>
            )}
          </div>
        </header>

        {/* 編集フォーム */}
        <main>
          {isEditing ? (
            <section className="bg-white rounded-lg shadow p-6 mb-6" aria-labelledby="edit-heading">
              <h2 id="edit-heading" className="text-xl font-semibold text-gray-900 mb-4">プロジェクト編集</h2>
              <UpdateProjectForm
                project={project}
                onSubmit={handleUpdate}
                onCancel={() => setIsEditing(false)}
                isLoading={isUpdating}
              />
            </section>
          ) : (
            /* プロジェクト詳細 */
            <article className="bg-white rounded-lg shadow">
              <div className="p-6 space-y-6">
                {/* 説明 */}
                <section>
                  <h2 className="text-sm font-medium text-gray-500 mb-2">説明</h2>
                  <p className="text-gray-900 whitespace-pre-wrap">
                    {project.description || '説明がありません'}
                  </p>
                </section>

                {/* リポジトリURL */}
                <section>
                  <h2 className="text-sm font-medium text-gray-500 mb-2">リポジトリURL</h2>
                  {project.repositoryUrl ? (
                    <a
                      href={project.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                      aria-label={`リポジトリ ${project.repositoryUrl} を新しいタブで開く`}
                    >
                      {project.repositoryUrl}
                    </a>
                  ) : (
                    <p className="text-gray-400">未設定</p>
                  )}
                </section>

                {/* メタ情報 */}
                <section className="border-t border-gray-200 pt-6">
                  <h2 className="text-sm font-medium text-gray-500 mb-3">詳細情報</h2>
                  <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <dt className="text-xs font-medium text-gray-500">プロジェクトID</dt>
                      <dd className="mt-1 text-sm text-gray-900 font-mono">{project.id}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-gray-500">ステータス</dt>
                      <dd className="mt-1 text-sm text-gray-900">{statusText}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-gray-500">作成日時</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        <time dateTime={project.createdAt}>
                          {project.createdAt ? new Date(project.createdAt).toLocaleString('ja-JP') : '-'}
                        </time>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-gray-500">更新日時</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        <time dateTime={project.updatedAt}>
                          {project.updatedAt ? new Date(project.updatedAt).toLocaleString('ja-JP') : '-'}
                        </time>
                      </dd>
                    </div>
                  </dl>
                </section>
              </div>
            </article>
          )}
        </main>
      </div>
    </div>
  );
}
