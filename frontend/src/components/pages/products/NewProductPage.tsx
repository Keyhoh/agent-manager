'use client';

import { useRouter } from 'next/navigation';
import { usePostProductsMutation } from '@/libs/api';
import { CreateProductForm } from '@/components/features/products/CreateProductForm';
import { Link } from '@/components/core';
import type { CreateProductRequest } from '@/libs/api';

export function NewProductPage() {
  const router = useRouter();
  const [createProduct, { isLoading }] = usePostProductsMutation();

  const handleSubmit = async (data: CreateProductRequest) => {
    try {
      await createProduct({ createProductRequest: data }).unwrap();
      router.push('/products');
    } catch (err) {
      console.error('Failed to create product:', err);
      alert('プロダクトの作成に失敗しました');
    }
  };

  const handleCancel = () => {
    router.push('/products');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <nav className="mb-6" aria-label="パンくずリスト">
          <Link href="/products" variant="primary" className="text-sm">
            ← プロダクト一覧に戻る
          </Link>
        </nav>

        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            新規プロダクト作成
          </h1>
          <p className="mt-2 text-gray-600">
            新しいプロダクトを作成します。必須項目を入力してください。
          </p>
        </header>

        <main>
          <section
            className="bg-white rounded-lg shadow p-6"
            aria-labelledby="form-heading"
          >
            <h2 id="form-heading" className="sr-only">
              プロダクト作成フォーム
            </h2>
            <CreateProductForm
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
