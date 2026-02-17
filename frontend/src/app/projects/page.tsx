'use client';

import { useState } from 'react';
import {
  useGetProjectsQuery,
  usePostProjectsMutation,
  usePutProjectsByProjectIdMutation,
  useDeleteProjectsByProjectIdMutation,
} from '@/services/api';
import { ProjectCard } from '@/components/features/projects/ProjectCard';
import { ProjectForm } from '@/components/features/projects/ProjectForm';
import type { Project, CreateProjectRequest, UpdateProjectRequest } from '@/services/api';

export default function ProjectsPage() {
  const { data: projects, isLoading, error } = useGetProjectsQuery();
  const [createProject, { isLoading: isCreating }] = usePostProjectsMutation();
  const [updateProject, { isLoading: isUpdating }] = usePutProjectsByProjectIdMutation();
  const [deleteProject] = useDeleteProjectsByProjectIdMutation();

  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);

  const handleCreate = async (data: CreateProjectRequest) => {
    try {
      await createProject({ createProjectRequest: data }).unwrap();
      setShowForm(false);
    } catch (err) {
      console.error('Failed to create project:', err);
    }
  };

  const handleUpdate = async (data: UpdateProjectRequest) => {
    if (!editingProject || !editingProject.id) return;
    try {
      await updateProject({ projectId: editingProject.id, updateProjectRequest: data }).unwrap();
      setEditingProject(null);
    } catch (err) {
      console.error('Failed to update project:', err);
    }
  };

  const handleDelete = async (project: Project) => {
    if (!project.id || !window.confirm(`「${project.name}」を削除してもよろしいですか？`)) {
      return;
    }
    try {
      await deleteProject({ projectId: project.id }).unwrap();
      setDeletingProject(null);
    } catch (err) {
      console.error('Failed to delete project:', err);
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
            {!showForm && !editingProject && (
              <button
                onClick={() => setShowForm(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                新規プロジェクト
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showForm && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">新規プロジェクト作成</h2>
            <ProjectForm
              onSubmit={handleCreate}
              onCancel={() => setShowForm(false)}
              isLoading={isCreating}
            />
          </div>
        )}

        {editingProject && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">プロジェクト編集</h2>
            <ProjectForm
              project={editingProject}
              onSubmit={handleUpdate}
              onCancel={() => setEditingProject(null)}
              isLoading={isUpdating}
            />
          </div>
        )}

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
                onEdit={setEditingProject}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">プロジェクトがありません</p>
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="mt-4 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                最初のプロジェクトを作成
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
