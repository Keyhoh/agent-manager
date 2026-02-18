import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl mb-8">
            Agent Manager
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            AIエージェントを活用してスクラム開発プロセスを自律的に実行するプロダクト管理システム
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              プロダクト管理
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                プロダクト管理
              </h3>
              <p className="text-gray-600">
                複数のプロダクトを効率的に管理し、進捗を可視化します
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                バックログアイテム自動化
              </h3>
              <p className="text-gray-600">
                AIエージェントがバックログアイテムを自動的に実行し、開発を支援します
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                スプリント管理
              </h3>
              <p className="text-gray-600">
                スクラム開発のスプリントをスムーズに管理できます
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
