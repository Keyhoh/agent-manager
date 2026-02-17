---
name: Frontend
description: AIエージェントを活用してスクラム開発プロセスを自律的に実行するタスク管理システムのフロントエンド
---

# Frontend

Agent Managerのフロントエンドは、ユーザーインターフェースを提供し、ユーザーがタスク管理やワークフロー管理を行えるようにします。Next.jsを使用して構築され、モダンなUI/UXを提供します。

## Project Structure

```
frontend/
├── src/
│   ├── components/      # 再利用可能なUIコンポーネント
|   |   ├── core/            # コアコンポーネント（ボタン、入力フィールドなど）
|   |   ├── features/         # 機能ごとのコンポーネント（タスク管理、ダッシュボードなど）
|   |   ├── layouts/         # レイアウトコンポーネント
|   |   └── pages/          # ページコンポーネント（ビジネスロジックを含む）
│   ├── app/             # App Router（ルーティングのみ、ページコンポーネントをimport/exportするのみ）
│   ├── services/        # API通信（RTK Query）
│   ├── hooks/           # カスタムフック
│   ├── context/         # グローバルステート管理
│   ├── styles/          # CSSやスタイル関連
│   ├── store/           # Redux store設定
│   └── libs/           # 共通ライブラリやユーティリティ
├── public/             # 静的ファイル
├── tests/              # ユニットテストと統合テスト
├── Dockerfile          # Dockerイメージの定義
└── README.md           # フロントエンドのドキュメント
```

## Architecture Principles

### App Router構成ルール

**重要**: App Router配下のページファイルは、`components/pages`配下のコンポーネントをdefault exportするのみにしてください。

**正しい例**:
```tsx
// src/app/projects/page.tsx
import { ProjectsListPage } from '@/components/pages';

export default ProjectsListPage;
```

**誤った例**:
```tsx
// src/app/projects/page.tsx
'use client';

import { useState } from 'react';
// ... ビジネスロジックやhooksをここに記述（これは間違い）

export default function ProjectsPage() {
  // ロジックはcomponents/pages配下に記述すべき
}
```

### ディレクトリの役割

- **`app/`**: Next.js App Routerのルーティング定義のみ。ページコンポーネントのimport/exportのみ
- **`components/pages/`**: ページレベルのコンポーネント。ビジネスロジック、hooks、状態管理を含む
- **`components/features/`**: 機能単位の再利用可能なコンポーネント
- **`components/core/`**: プロジェクト全体で使用する基本的なUIコンポーネント
- **`services/`**: API通信（RTK Query生成コード）
- **`store/`**: Redux store設定

### ファイル構成例

```
src/
├── app/
│   └── projects/
│       ├── page.tsx                    # import { ProjectsListPage } from '@/components/pages'; export default ProjectsListPage;
│       ├── new/
│       │   └── page.tsx               # import { NewProjectPage } from '@/components/pages'; export default NewProjectPage;
│       └── [id]/
│           └── edit/
│               └── page.tsx           # import { EditProjectPage } from '@/components/pages'; export default EditProjectPage;
└── components/
    ├── pages/
    │   ├── index.ts                   # export { ProjectsListPage, NewProjectPage, EditProjectPage } from './projects';
    │   └── projects/
    │       ├── ProjectsListPage.tsx   # 'use client'; + ビジネスロジック + hooks
    │       ├── NewProjectPage.tsx     # 'use client'; + ビジネスロジック + hooks
    │       └── EditProjectPage.tsx    # 'use client'; + ビジネスロジック + hooks
    └── features/
        └── projects/
            ├── ProjectCard.tsx        # 再利用可能なプロジェクトカードコンポーネント
            └── ProjectForm.tsx        # 再利用可能なプロジェクトフォームコンポーネント
```

## Code Conventions

- クリーンコードの原則に従う
- 可能な限りHTML標準の要素を使用し、アクセシビリティを考慮する
- 可能な限りHTML標準の機能を使用し、JavaScriptでの実装は必要最小限に抑える
- コンポーネントは単一責任の原則に従い、小さく保つ
- 状態管理は必要最小限に抑え、可能な限りローカルステートを使用する
- API通信はRTK Queryを使用して効率的に行う
- **重要**: RTK QueryはOpenAPI仕様から`@rtk-query/codegen-openapi`で生成する（`openapi-generator`は使用しない）
- テスト駆動開発（TDD）を推奨し、ユニットテストと統合テストを充実させる
- コードレビューを徹底し、品質を維持する

## RTK Query Code Generation

**公式ドキュメント**: https://redux-toolkit.js.org/rtk-query/usage/code-generation

### セットアップ手順

1. **依存関係のインストール**
   ```bash
   npm install --save-dev @rtk-query/codegen-openapi
   ```

2. **ベースAPIの作成** (`src/services/emptyApi.ts`)
   ```typescript
   import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

   export const emptySplitApi = createApi({
     reducerPath: 'api',
     baseQuery: fetchBaseQuery({ 
       baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'
     }),
     tagTypes: ['Project', 'Task', 'Sprint', 'Agent', 'Review'],
     endpoints: () => ({}),
   });
   ```

3. **コードジェネレーター設定** (`openapi-config.js`)
   ```javascript
   const config = {
     schemaFile: '../openapi.yaml',
     apiFile: './src/services/emptyApi.ts',
     apiImport: 'emptySplitApi',
     outputFile: './src/services/api.ts',
     exportName: 'api',
     hooks: true,
     tag: true,
   };

   export default config;
   ```

4. **APIエンドポイント生成**
   ```bash
   npx @rtk-query/codegen-openapi openapi-config.js
   ```

5. **Reduxストアの設定** (`src/store/store.ts`)
   ```typescript
   import { configureStore } from '@reduxjs/toolkit';
   import { api } from '@/services/api';

   export const store = configureStore({
     reducer: {
       [api.reducerPath]: api.reducer,
     },
     middleware: (getDefaultMiddleware) =>
       getDefaultMiddleware().concat(api.middleware),
   });
   ```

6. **コンポーネントでの使用**
   ```typescript
   import {
     useGetProjectsQuery,
     usePostProjectsMutation,
     usePutProjectsByProjectIdMutation,
     useDeleteProjectsByProjectIdMutation,
   } from '@/services/api';
   import type { Project, CreateProjectRequest } from '@/services/api';

   export default function ProjectsPage() {
     const { data: projects, isLoading, error } = useGetProjectsQuery();
     const [createProject] = usePostProjectsMutation();

     const handleCreate = async (data: CreateProjectRequest) => {
       await createProject({ createProjectRequest: data }).unwrap();
     };
   }
   ```

### 重要な注意事項

- **`openapi-generator`のtypescript-fetchは使用しない**: RTK Query公式の`@rtk-query/codegen-openapi`を使用すること
- **typescript-redux-queryジェネレーターも使用しない**: これは古い`redux-query`パッケージ用（RTK Queryではない）
- **hooks自動生成**: `hooks: true`設定により、`useGetProjectsQuery`などのhooksが自動生成される
- **タグベースのキャッシュ無効化**: `tag: true`設定により、`providesTags`/`invalidatesTags`が自動設定される
- **型安全性**: すべてのAPI呼び出しとレスポンスがTypeScriptで型付けされる

