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

- `*.[技術名].repository.ts`: 実装ファイル（例: `product.prisma.repository.ts`）
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

export class Product {
  static create(props: Omit<ProductProps, 'id' | 'createdAt' | 'updatedAt'>): Product {
    return new Product({
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
// domain/type/product-id.ts
export class ProductId {
  private constructor(private readonly value: string) {}
  
  static of(value: string): ProductId {
    // バリデーションロジック
    return new ProductId(value);
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

## アーキテクチャ設計思想

### Service層とUseCase層の使い分け

**基本原則**: Serviceは機能的凝集、UseCaseは逐次的・通信的・手順的凝集

#### Service層（機能的凝集）

- **責務**: 単一のRepositoryに対する操作を提供
- **凝集度**: 機能的凝集（Functional Cohesion）
- **特徴**:
  - 1つのRepositoryのみを呼び出す
  - CRUD操作のカプセル化
  - エラーハンドリング（NotFoundException等）の集約
  - データアクセスの抽象化層

```typescript
@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}

  async save(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }
}
```

#### UseCase層（逐次的・通信的・手順的凝集）

- **責務**: 複数のServiceを組み合わせた業務フローの実現
- **凝集度**: 逐次的（Sequential）・通信的（Communicational）・手順的（Procedural）凝集
- **使用する場面**:
  - 複数のServiceを組み合わせる必要がある場合
  - トランザクション境界を明確にする場合
  - 複雑な業務フローがある場合

```typescript
// 例: 複数のServiceを組み合わせる場合にUseCaseを使用
@Injectable()
export class CreateProductWithInitialBacklogItemsUseCase {
  constructor(
    private readonly productService: ProductService,
    private readonly backlogItemService: BacklogItemService,
    private readonly notificationService: NotificationService,
  ) {}

  async execute(command: CreateProductCommand): Promise<Product> {
    // 1. プロダクト作成
    const product = await this.productService.save(
      Product.create(command)
    );
    
    // 2. 初期バックログアイテム作成
    await this.backlogItemService.createInitialItems(product.id);
    
    // 3. 通知送信
    await this.notificationService.notifyProductCreated(product);
    
    return product;
  }
}
```

#### 設計判断基準

**Serviceのみで十分な場合**:
- 単一のRepositoryのみを操作する
- シンプルなCRUD操作
- 他のServiceとの連携が不要

**UseCaseが必要な場合**:
- 複数のServiceを組み合わせる
- 複雑な業務フローがある
- トランザクション境界を明確にしたい
- ドメインロジックの調整が必要

**現在のプロジェクトでは**: 単純なCRUD操作のため、ControllerがServiceを直接呼び出す構成を採用しています。将来的に複雑な業務フローが必要になった場合は、UseCase層を追加してください。

### 一般的な規則

- クリーンコードの原則に従う
- ドメインモデルを中心に設計し、ビジネスロジックはドメインサービスに実装する
- イミュータブルなオブジェクトを優先し、副作用を最小限に抑える
- RESTful APIの設計ガイドラインに従う
- テスト駆動開発（TDD）を推奨し、ユニットテストと統合テストを充実させる
- コードレビューを徹底し、品質を維持する