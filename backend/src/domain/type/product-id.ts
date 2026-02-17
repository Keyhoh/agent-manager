export class ProductId {
  private constructor(private readonly value: string) {
    if (!this.isValidUUID(value)) {
      throw new Error('Invalid product ID format');
    }
  }

  static create(value: string): ProductId {
    return new ProductId(value);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: ProductId): boolean {
    return this.value === other.value;
  }

  private isValidUUID(value: string): boolean {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(value);
  }
}
