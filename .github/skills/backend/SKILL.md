---
name: Backend
description: AIエージェントを活用してスクラム開発プロセスを自律的に実行するタスク管理システムのバックエンド
---

# Backend

Agent Managerのバックエンドは、AIエージェントとの連携ロジックを実装し、タスク管理やワークフロー管理を担当します。Clean Architectureとドメイン駆動設計（DDD）を採用し、RESTful APIを提供します。

## Project Structure

```
backend/
├── src/
│   ├── domain/          # ドメインモデルとビジネスロジック
│   │   ├── model/       # ドメインモデル
│   │   └── type/        # 汎用的な型定義（LocalDate, LocalDateTimeなど）
│   ├── application/     # ユースケースとサービス
│   │   ├── service/     # ドメインサービスの実装
│   │   └── usecase/     # ユースケースの定義
│   ├── infrastructure/  # データベースアクセス、外部API連携
|   |   ├── repository/       # データアクセスの実装
|   |   └── external/         # 外部API連携の実装
│   ├── presentation/      # REST APIのコントローラー
|   |   ├── controller/         # APIエンドポイントの実装
|   |   └── scheduler/           # 定期的なタスク実行の実装
│   └── libs/            # 共通ライブラリやユーティリティ
├── tests/              # ユニットテストと統合テスト
├── Dockerfile          # Dockerイメージの定義
└── README.md           # バックエンドのドキュメント
```

## Technology Stack

### Core Technologies

- **Framework**: NestJS v11+
- **ORM**: Prisma v7
- **Database**: PostgreSQL
- **Language**: TypeScript (ES2021, commonjs)
- **UUID**: uuid library v9+ (UUID v7を使用)

### Prisma v7 固有の設定

**重要**: Prisma v7はv5/v6から破壊的変更があります。

#### データベースURL管理

- `prisma.config.ts`でデータベースURLを管理（プロジェクトルートに配置）
- `schema.prisma`の`datasource`ブロックに`url`を記載しない

```typescript
// prisma.config.ts
import { defineConfig } from '@prisma/client';
import { config } from 'dotenv';

config();

export default defineConfig({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});
```

```prisma
// schema.prisma
generator client {
  provider     = "prisma-client"
  output       = "../src/libs/prisma"
  moduleFormat = "cjs"  // TypeScript commonjsモジュールシステム使用時に必須
}

datasource db {
  provider = "postgresql"
  // url は記載しない（prisma.config.tsで管理）
}
```

## Code Conventions

### ファイル命名規則

#### DTOファイル

- `*.request.ts`: リクエストDTO（`*.dto.ts`は使用しない）
- `*.response.ts`: レスポンスDTO

#### Repository実装

- `*.[技術名].repository.ts`: 実装ファイル（例: `project.prisma.repository.ts`）
- 技術スタックを明示することで、複数の実装（例: In-Memory, Mock）を識別可能にする

#### Controller構成

各エンティティごとにフォルダを作成し、関連ファイルを集約：

```
presentation/controller/[entity]/
  ├── [entity].controller.ts
  ├── create-[entity].request.ts
  ├── update-[entity].request.ts
  └── [entity].response.ts
```

### UUID v7の使用

**推奨**: エンティティIDには`uuid`ライブラリのv7を使用

```typescript
import { v7 as uuidv7 } from 'uuid';

export class Project {
  static create(props: Omit<ProjectProps, 'id' | 'createdAt' | 'updatedAt'>): Project {
    return new Project({
      ...props,
      id: uuidv7(), // タイムスタンプベース、ソート可能
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
```

**UUID v7の利点**:
- タイムスタンプベースでソート可能
- データベースインデックスのパフォーマンス向上
- 時系列順序の保証

### Value Objectパターン

ドメインの型安全性を高めるため、`domain/type/`にValue Objectを配置：

```typescript
// domain/type/project-id.ts
export class ProjectId {
  private constructor(private readonly value: string) {}
  
  static of(value: string): ProjectId {
    // バリデーションロジック
    return new ProjectId(value);
  }
  
  getValue(): string {
    return this.value;
  }
}
```

### モジュール構成

各層に`*.module.ts`を配置し、階層的な依存注入を実現：

```
app.module.ts
  ├── presentation.module.ts
  │     └── controller.module.ts
  ├── application.module.ts
  │     ├── usecase.module.ts
  │     └── service.module.ts
  └── infrastructure.module.ts
        └── repository.module.ts
```

### 一般的な規則

- クリーンコードの原則に従う
- ドメインモデルを中心に設計し、ビジネスロジックはドメインサービスに実装する
- イミュータブルなオブジェクトを優先し、副作用を最小限に抑える
- RESTful APIの設計ガイドラインに従う
- テスト駆動開発（TDD）を推奨し、ユニットテストと統合テストを充実させる
- コードレビューを徹底し、品質を維持する