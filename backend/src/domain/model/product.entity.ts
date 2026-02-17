import { v7 as uuidv7 } from 'uuid';

export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export interface ProductProps {
  id: string;
  name: string;
  description: string | null;
  repositoryUrl: string;
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
}

export class Product {
  private constructor(private readonly props: ProductProps) {}

  static create(
    props: Omit<ProductProps, 'id' | 'createdAt' | 'updatedAt'>,
  ): Product {
    return new Product({
      ...props,
      id: uuidv7(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static reconstruct(props: ProductProps): Product {
    return new Product(props);
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string | null {
    return this.props.description;
  }

  get repositoryUrl(): string {
    return this.props.repositoryUrl;
  }

  get status(): ProductStatus {
    return this.props.status;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  updateName(name: string): Product {
    return new Product({
      ...this.props,
      name,
      updatedAt: new Date(),
    });
  }

  updateDescription(description: string | null): Product {
    return new Product({
      ...this.props,
      description,
      updatedAt: new Date(),
    });
  }

  archive(): Product {
    return new Product({
      ...this.props,
      status: ProductStatus.ARCHIVED,
      updatedAt: new Date(),
    });
  }

  activate(): Product {
    return new Product({
      ...this.props,
      status: ProductStatus.ACTIVE,
      updatedAt: new Date(),
    });
  }
}
