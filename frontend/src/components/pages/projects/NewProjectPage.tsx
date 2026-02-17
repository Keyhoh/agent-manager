'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePostProjectsMutation } from '@/services/api';
import { CreateProjectForm } from '@/components/features/projects/CreateProjectForm';
import type { CreateProjectRequest } from '@/services/api';

export function NewProjectPage() {
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
        <nav className="mb-6" aria-label="パンくずリスト">
          <Link
            href="/projects"
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            ← プロジェクト一覧に戻る
          </Link>
        </nav>

        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">新規プロジェクト作成</h1>
          <p className="mt-2 text-gray-600">
            新しいプロジェクトを作成します。必須項目を入力してください。
          </p>
        </header>

        <main>
          <section className="bg-white rounded-lg shadow p-6" aria-labelledby="form-heading">
            <h2 id="form-heading" className="sr-only">プロジェクト作成フォーム</h2>
            <CreateProjectForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isLoading={isLoading}
            />
          </section>
        </main>
      </div>
    </div>
  );
}
