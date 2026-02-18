'use client';

import Link from 'next/link';
import type { Product } from '@/libs/api';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const statusColor =
    product.status === 'ACTIVE'
      ? 'bg-green-100 text-green-800'
      : 'bg-gray-100 text-gray-800';
  const statusText = product.status === 'ACTIVE' ? 'アクティブ' : 'アーカイブ';

  return (
    <article className="h-full">
      <Link
        href={`/products/${product.id}`}
        aria-label={`${product.name}の詳細を表示`}
        className="block h-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
      >
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all h-full flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                {product.name}
              </h3>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}
              >
                {statusText}
              </span>
            </div>
          </div>

          {product.description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
              {product.description}
            </p>
          )}

          <div className="mt-auto">
            <div className="text-xs text-gray-500">
              <time dateTime={product.updatedAt}>
                更新日:{' '}
                {product.updatedAt
                  ? new Date(product.updatedAt).toLocaleDateString('ja-JP')
                  : '-'}
              </time>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
