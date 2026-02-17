import { Injectable } from '@nestjs/common';
import { Product, ProductStatus } from '../../../domain/model/product.entity';
import { ProductRepository } from '../../../domain/repository/product.repository';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return products.map((p) =>
      Product.reconstruct({
        id: p.id,
        name: p.name,
        description: p.description,
        repositoryUrl: p.repositoryUrl,
        status: p.status as ProductStatus,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      }),
    );
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return null;
    }

    return Product.reconstruct({
      id: product.id,
      name: product.name,
      description: product.description,
      repositoryUrl: product.repositoryUrl,
      status: product.status as ProductStatus,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });
  }

  async save(product: Product): Promise<Product> {
    const created = await this.prisma.product.create({
      data: {
        id: product.id,
        name: product.name,
        description: product.description,
        repositoryUrl: product.repositoryUrl,
        status: product.status,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      },
    });

    return Product.reconstruct({
      id: created.id,
      name: created.name,
      description: created.description,
      repositoryUrl: created.repositoryUrl,
      status: created.status as ProductStatus,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    });
  }

  async update(product: Product): Promise<Product> {
    const updated = await this.prisma.product.update({
      where: { id: product.id },
      data: {
        name: product.name,
        description: product.description,
        status: product.status,
        updatedAt: product.updatedAt,
      },
    });

    return Product.reconstruct({
      id: updated.id,
      name: updated.name,
      description: updated.description,
      repositoryUrl: updated.repositoryUrl,
      status: updated.status as ProductStatus,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({
      where: { id },
    });
  }
}
