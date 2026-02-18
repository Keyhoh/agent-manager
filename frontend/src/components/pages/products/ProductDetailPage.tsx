'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  useGetProductsByProductIdQuery,
  usePutProductsByProductIdMutation,
  useDeleteProductsByProductIdMutation,
  useGetSprintsQuery,
  useGetProductsByProductIdBacklogQuery,
} from '@/libs/api';
import { UpdateProductForm } from '@/components/features/products/UpdateProductForm';
import { Link, Button, Spinner } from '@/components/core';
import type { UpdateProductRequest } from '@/libs/api';

export function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const { data: product, isLoading: isLoadingProduct } =
    useGetProductsByProductIdQuery({ productId });
  const { data: sprints } = useGetSprintsQuery({ productId });
  const { data: backlogItems } = useGetProductsByProductIdBacklogQuery({
    productId,
  });
  const [updateProduct, { isLoading: isUpdating }] =
    usePutProductsByProductIdMutation();
  const [deleteProduct] = useDeleteProductsByProductIdMutation();

  const [isEditing, setIsEditing] = useState(false);

  // 進行状況の計算
  const activeSprint = sprints?.find((s) => s.status === 'ACTIVE');
  const totalBacklogItems = backlogItems?.length || 0;
  const backlogItemsByStatus = {
    BACKLOG:
      backlogItems?.filter((item) => item.status === 'BACKLOG').length || 0,
    SPRINT_BACKLOG:
      backlogItems?.filter((item) => item.status === 'SPRINT_BACKLOG').length ||
      0,
    IN_PROGRESS:
      backlogItems?.filter((item) => item.status === 'IN_PROGRESS').length || 0,
    REVIEW:
      backlogItems?.filter((item) => item.status === 'REVIEW').length || 0,
    DONE: backlogItems?.filter((item) => item.status === 'DONE').length || 0,
  };
  const completedSprintsCount =
    sprints?.filter((s) => s.status === 'COMPLETED').length || 0;

  const handleUpdate = async (data: UpdateProductRequest) => {
    try {
      await updateProduct({ productId, updateProductRequest: data }).unwrap();
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update product:', err);
      alert('プロダクトの更新に失敗しました');
    }
  };

  const handleDelete = async () => {
    if (
      !product?.name ||
      !window.confirm(`「${product.name}」を削除してもよろしいですか？`)
    ) {
      return;
    }
    try {
      await deleteProduct({ productId }).unwrap();
      router.push('/products');
    } catch (err) {
      console.error('Failed to delete product:', err);
      alert('プロダクトの削除に失敗しました');
    }
  };

  if (isLoadingProduct) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Spinner size="lg" className="py-12" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center" role="alert">
            <p className="text-red-600 text-lg mb-4">
              プロダクトが見つかりません
            </p>
            <Link href="/products" variant="primary">
              プロダクト一覧に戻る
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const statusColor =
    product.status === 'ACTIVE'
      ? 'bg-green-100 text-green-800'
      : 'bg-gray-100 text-gray-800';
  const statusText = product.status === 'ACTIVE' ? 'アクティブ' : 'アーカイブ';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* ナビゲーション */}
        <nav className="mb-6" aria-label="パンくずリスト">
          <Link href="/products" variant="primary">
            ← プロダクト一覧に戻る
          </Link>
        </nav>

        {/* ヘッダー */}
        <header className="mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {product.name}
              </h1>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${statusColor}`}
              >
                {statusText}
              </span>
            </div>
            {!isEditing && (
              <div
                className="flex gap-2"
                role="group"
                aria-label="プロダクト操作"
              >
                <Link
                  href={`/products/${productId}/backlogs`}
                  variant="secondary"
                >
                  バックログ
                </Link>
                <Link
                  href={`/products/${productId}/sprints`}
                  variant="secondary"
                >
                  スプリント
                </Link>
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="primary"
                  aria-label="プロダクトを編集"
                >
                  編集
                </Button>
                <Button
                  onClick={handleDelete}
                  variant="danger"
                  aria-label="プロダクトを削除"
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
            <section
              className="bg-white rounded-lg shadow p-6 mb-6"
              aria-labelledby="edit-heading"
            >
              <h2
                id="edit-heading"
                className="text-xl font-semibold text-gray-900 mb-4"
              >
                プロダクト編集
              </h2>
              <UpdateProductForm
                product={product}
                onSubmit={handleUpdate}
                onCancel={() => setIsEditing(false)}
                isLoading={isUpdating}
              />
            </section>
          ) : (
            <>
              {/* 進行状況ダッシュボード */}
              <section className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  進行状況
                </h2>

                {/* アクティブスプリント */}
                {activeSprint ? (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <h3 className="font-semibold text-blue-900 mb-2">
                      現在のスプリント
                    </h3>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-blue-800 font-medium">
                          {activeSprint.name}
                        </p>
                        {activeSprint.goal && (
                          <p className="text-sm text-blue-700 mt-1">
                            {activeSprint.goal}
                          </p>
                        )}
                      </div>
                      <Link
                        href={`/products/${productId}/sprints/${activeSprint.id}`}
                        variant="primary"
                        className="text-sm"
                      >
                        詳細を見る
                      </Link>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 mb-4">
                    現在アクティブなスプリントはありません
                  </p>
                )}

                {/* 統計情報 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      バックログアイテム
                    </h4>
                    <p className="text-2xl font-bold text-gray-900">
                      {totalBacklogItems}
                    </p>
                    <div className="mt-2 space-y-1 text-xs text-gray-600">
                      <p>バックログ: {backlogItemsByStatus.BACKLOG}</p>
                      <p>
                        スプリントバックログ:{' '}
                        {backlogItemsByStatus.SPRINT_BACKLOG}
                      </p>
                      <p>進行中: {backlogItemsByStatus.IN_PROGRESS}</p>
                      <p>レビュー中: {backlogItemsByStatus.REVIEW}</p>
                      <p className="font-semibold text-green-600">
                        完了: {backlogItemsByStatus.DONE}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      スプリント
                    </h4>
                    <p className="text-2xl font-bold text-gray-900">
                      {sprints?.length || 0}
                    </p>
                    <p className="text-xs text-gray-600 mt-2">
                      完了: {completedSprintsCount}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      完了率
                    </h4>
                    <p className="text-2xl font-bold text-gray-900">
                      {totalBacklogItems > 0
                        ? Math.round(
                            (backlogItemsByStatus.DONE / totalBacklogItems) *
                              100,
                          )
                        : 0}
                      %
                    </p>
                    <p className="text-xs text-gray-600 mt-2">
                      {backlogItemsByStatus.DONE} / {totalBacklogItems} アイテム
                    </p>
                  </div>
                </div>
              </section>

              {/* プロダクト詳細 */}
              <article className="bg-white rounded-lg shadow">
                <div className="p-6 space-y-6">
                  {/* 説明 */}
                  <section>
                    <h2 className="text-sm font-medium text-gray-500 mb-2">
                      説明
                    </h2>
                    <p className="text-gray-900 whitespace-pre-wrap">
                      {product.description || '説明がありません'}
                    </p>
                  </section>

                  {/* リポジトリURL */}
                  <section>
                    <h2 className="text-sm font-medium text-gray-500 mb-2">
                      リポジトリURL
                    </h2>
                    {product.repositoryUrl ? (
                      <a
                        href={product.repositoryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                        aria-label={`リポジトリ ${product.repositoryUrl} を新しいタブで開く`}
                      >
                        {product.repositoryUrl}
                      </a>
                    ) : (
                      <p className="text-gray-400">未設定</p>
                    )}
                  </section>

                  {/* メタ情報 */}
                  <section className="border-t border-gray-200 pt-6">
                    <h2 className="text-sm font-medium text-gray-500 mb-3">
                      詳細情報
                    </h2>
                    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <dt className="text-xs font-medium text-gray-500">
                          プロダクトID
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 font-mono">
                          {product.id}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs font-medium text-gray-500">
                          ステータス
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {statusText}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs font-medium text-gray-500">
                          作成日時
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          <time dateTime={product.createdAt}>
                            {product.createdAt
                              ? new Date(product.createdAt).toLocaleString(
                                  'ja-JP',
                                )
                              : '-'}
                          </time>
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs font-medium text-gray-500">
                          更新日時
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          <time dateTime={product.updatedAt}>
                            {product.updatedAt
                              ? new Date(product.updatedAt).toLocaleString(
                                  'ja-JP',
                                )
                              : '-'}
                          </time>
                        </dd>
                      </div>
                    </dl>
                  </section>
                </div>
              </article>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
