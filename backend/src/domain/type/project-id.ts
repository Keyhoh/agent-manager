export class ProjectId {
  private constructor(private readonly value: string) {
    if (!this.isValidUUID(value)) {
      throw new Error('Invalid project ID format');
    }
  }

  static create(value: string): ProjectId {
    return new ProjectId(value);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: ProjectId): boolean {
    return this.value === other.value;
  }

  private isValidUUID(value: string): boolean {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(value);
  }
}
