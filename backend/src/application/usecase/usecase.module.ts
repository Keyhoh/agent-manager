import { Module } from '@nestjs/common';

/**
 * UseCaseModule
 *
 * 現在は使用していませんが、将来的に複雑な業務フローが必要になった場合に備えて保持しています。
 *
 * UseCaseを使用する場面:
 * - 複数のServiceを組み合わせる必要がある場合
 * - トランザクション境界を明確にする必要がある場合
 * - 複雑な業務フロー（例: プロダクト作成 + 初期バックログアイテム作成 + 通知送信）がある場合
 *
 * 現在の実装では単純なCRUD操作のため、ControllerがServiceを直接呼び出しています。
 */
@Module({
  providers: [],
  exports: [],
})
export class UsecaseModule {}
