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

## Code Conventions

- クリーンコードの原則に従う
- ドメインモデルを中心に設計し、ビジネスロジックはドメインサービスに実装する
- イミュータブルなオブジェクトを優先し、副作用を最小限に抑える
- RESTful APIの設計ガイドラインに従う
- テスト駆動開発（TDD）を推奨し、ユニットテストと統合テストを充実させる
- コードレビューを徹底し、品質を維持する