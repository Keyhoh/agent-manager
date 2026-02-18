# AGENTS.md

## Overview

Agent Managerは、AIエージェントを活用してスクラム開発プロセスを自律的に実行するタスク管理システムです。
詳細な仕様はspecification以下のドキュメントを参照してください。

## 開発ワークフロー

**重要**: 実装を開始する前に、必ず以下の手順を実行してください。

### 1. 公式ドキュメントの確認（必須）

**実装前に必ず最新の公式ドキュメントを参照してください。**

使用する技術・ライブラリの最新の公式ドキュメントを確認し、以下の点を把握してください：

- 最新のベストプラクティス
- APIの使用方法と変更点
- 非推奨機能の確認
- セキュリティに関する推奨事項

**例**:
- Next.js実装時: https://nextjs.org/docs
- Prisma実装時: https://www.prisma.io/docs
- NestJS実装時: https://docs.nestjs.com
- Prettier設定時: https://prettier.io/docs
- その他ライブラリ: 各公式サイトのドキュメント

### 2. SKILL.mdの確認（必須）

実装対象に応じて該当するSKILL.mdを読み、技術スタック、命名規則、コーディング規約を把握してください：

- Backend実装: `.github/skills/backend/SKILL.md`
- Frontend実装: `.github/skills/frontend/SKILL.md`

**SKILL.mdに記載されている内容**:
- 使用する技術スタックとバージョン
- フレームワーク固有の設定（例: Prisma v7の設定方法）
- ファイル命名規則（例: `*.request.ts`, `*.prisma.repository.ts`）
- フォルダ構成とモジュール構成
- コーディング規約とベストプラクティス

### 3. 仕様書の確認

`specification/`配下のドキュメントで要件を理解してください：

- `overview.md`: システム全体の概要
- `roles.md`: 役割定義
- `task_management.md`: タスク管理の詳細
- `workflow.md`: ワークフロー定義

### 4. MCP Serverの確認

`.vscode/mcp.json`を確認し、利用可能なMCP Serverを把握してください。

**現在利用可能なMCP Server**:
- `git`: Git操作（mcp-server-git）
- `github`: GitHub操作（GitHub Copilot MCP）

### 5. 実装

SKILL.mdの規約と公式ドキュメントのベストプラクティスに従って実装してください。

### 6. コミット（必須）

**作業は必ず適切な粒度でコミットしてください。**

#### コミット粒度の原則

1. **論理的な単位で分割**: 1つのコミットは1つの論理的な変更を表す
2. **独立性**: 各コミットは独立してレビュー・理解できる
3. **ロールバック可能**: 必要に応じて個別にrevertできる

#### コミットの分割例

❌ **悪い例**: すべての変更を1つのコミットにまとめる
```
feat: add user management feature
```

✅ **良い例**: 論理的な単位で分割
```
1. refactor: extract user validation logic
2. feat: add user repository interface
3. feat: implement user repository with Prisma
4. feat: add user service layer
5. feat: add user controller endpoints
6. test: add user service unit tests
7. docs: update API documentation for user endpoints
```

#### コミットメッセージの規約

Conventional Commitsに従ってください：

- `feat`: 新機能
- `fix`: バグ修正
- `refactor`: リファクタリング
- `style`: コードスタイルの変更（フォーマット、セミコロンなど）
- `docs`: ドキュメントのみの変更
- `test`: テストの追加・修正
- `chore`: ビルドプロセスやツールの変更

**フォーマット**:
```
<type>(<scope>): <subject>

<body>

<footer>
```

**例**:
```
feat(backend): add user authentication

Implement JWT-based authentication with refresh tokens.

Changes:
- Add AuthService for token generation
- Add AuthGuard for route protection
- Add JWT configuration in environment variables

Closes #123
```

### 7. ドキュメントの更新

実装中に新しいパターンや規約を発見した場合は、以下を更新してください：
- 新しい技術パターン → SKILL.mdに追記
- 新しいMCP Server → `.vscode/mcp.json`に追加してAGENTS.mdに記載

## Project Architecture

### Backend

- Clean Architectureを採用
- ドメイン駆動設計（DDD）を実践
- RESTful APIを提供
- AIエージェントとの連携ロジックを実装
- Backendスキルを使用して実装

#### 技術スタック

- **Framework**: NestJS (v11+)
- **ORM**: Prisma v7 (重要: v7固有の設定に注意)
- **Database**: PostgreSQL
- **Language**: TypeScript (commonjs module system)
- **UUID**: UUID v7を採用（タイムスタンプベース、ソート可能、パフォーマンス最適化）

#### 命名規則

- **DTOファイル**: `*.request.ts`, `*.response.ts` (※ `*.dto.ts`は使用しない)
- **Repository実装**: `*.[技術名].repository.ts` (例: `project.prisma.repository.ts`)
- **Controller構成**: `presentation/controller/[entity]/`フォルダ配下に関連ファイルを集約
  ```
  [entity]/
    ├── [entity].controller.ts
    ├── create-[entity].request.ts
    ├── update-[entity].request.ts
    └── [entity].response.ts
  ```

#### モジュール構成

- 各層（domain/application/infrastructure/presentation）に`*.module.ts`を配置
- 階層的な依存注入: `app.module` → `presentation.module` → `application.module` → `infrastructure.module`
- 機能ごとにサブモジュールを作成（例: `usecase.module.ts`, `repository.module.ts`, `controller.module.ts`）

### Frontend

- Reactを使用したシングルページアプリケーション
- スクラムプロセスに沿ったUI/UX設計
- バックログ管理、スプリント管理、レビュー画面などのコンポーネントを実装
- Frontendスキルを使用して実装

### NPM Packages

**重要: NPMパッケージを使用する際は、必ず最新の公式ドキュメントとソースコードを確認してください。**

開発に必要なNPMパッケージを適宜追加できます。例：axios、react-router-dom、reduxなど。

#### パッケージ追加前のチェックリスト

1. **公式ドキュメントの確認** ✅ 必須
   - 最新の公式ドキュメントを読む
   - インストール方法を確認
   - 推奨される使用方法を把握
   - ベストプラクティスを理解

2. **パッケージの評価**
   - パッケージのメンテナンス状況（最終更新日、Issue対応状況）
   - セキュリティリスク（npm auditで確認）
   - プロジェクトのニーズに合致しているか
   - ライセンス（MIT、Apache 2.0など）
   - ダウンロード数とGitHubスター数

3. **公式情報源の確認**
   - 公式サイト
   - GitHub Repository（README、CHANGELOG）
   - 公式ドキュメントサイト
   - 公式サンプルコード

#### パッケージ使用時の注意事項

- **常に最新の公式ドキュメントを参照**: 古い記事やStack Overflowの情報ではなく、公式ドキュメントを優先
- **バージョンの確認**: メジャーバージョン間で破壊的変更がある可能性を考慮
- **型定義の確認**: TypeScriptの場合、@types/パッケージの必要性を確認
- **依存関係の確認**: 追加される依存パッケージを確認

#### よく使用されるパッケージの公式ドキュメント

- **Prisma**: https://www.prisma.io/docs
- **NestJS**: https://docs.nestjs.com
- **Next.js**: https://nextjs.org/docs
- **React**: https://react.dev
- **Redux Toolkit**: https://redux-toolkit.js.org
- **Axios**: https://axios-http.com/docs/intro
- **Jest**: https://jestjs.io/docs/getting-started
- **Prettier**: https://prettier.io/docs
- **ESLint**: https://eslint.org/docs/latest

## Additional

### MCP Server管理

現在、以下のMCP Serverが`.vscode/mcp.json`に設定されています：

- **git** (mcp-server-git): Git操作（コミット、ブランチ管理、差分確認など）
- **github** (GitHub Copilot MCP): GitHub操作（Issue、PR、レビューなど）

**MCP Serverを追加する場合**:

1. プロジェクトのニーズに合致しているか確認
2. セキュリティリスクを評価
3. `.vscode/mcp.json`に設定を追加
4. このセクションに追加したMCP Serverを記載
5. 使用する際は最新の公式ドキュメントを確認

**推奨されるMCP Server例**:
- データベース操作: mcp-server-postgres, mcp-server-sqlite
- ブラウザ自動化: puppeteer-mcp-server
- ファイル操作: mcp-server-filesystem
- CI/CD: github-actions-mcp-server

### Skillsの追加

必要なスキルがあれば`.github/skills/`に追加してください。

**追加する前の確認事項**:
- スキルがプロジェクトのニーズに合致しているか
- スキルの実装がプロジェクトの品質基準を満たしているか
- スキルのドキュメント（SKILL.md）が充実しているか

**推奨されるスキル例**:
- AIエージェント設計
- テスト駆動開発（TDD）
- CI/CDパイプライン構築
- セキュリティ監査

