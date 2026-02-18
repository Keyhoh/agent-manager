import { ProductStatus } from '@/domain/model/product.entity';

export class ProductResponse {
  id: string;
  name: string;
  description: string | null;
  repositoryUrl: string;
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
}
