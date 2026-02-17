import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../../domain/model/product.entity';
import {
  type ProductRepository,
  PRODUCT_REPOSITORY,
} from '../../domain/repository/product.repository';

/**
 * ProductService: 機能的凝集
 * 単一のRepositoryに対する操作を提供
 */
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

  async findAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async update(product: Product): Promise<Product> {
    return this.productRepository.update(product);
  }

  async delete(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}
