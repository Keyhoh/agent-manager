import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductStatus } from '@/domain/model/product.entity';
import { ProductService } from '@/application/service/product.service';
import { CreateProductRequest } from './create-product.request';
import { ProductResponse } from './product.response';
import { UpdateProductRequest } from './update-product.request';
import { Product } from '@/domain/model/product.entity';

@Controller('api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(): Promise<ProductResponse[]> {
    const products = await this.productService.findAll();
    return products.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      repositoryUrl: p.repositoryUrl,
      status: p.status,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    }));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductResponse> {
    const product = await this.productService.findById(id);
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      repositoryUrl: product.repositoryUrl,
      status: product.status,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateProductRequest): Promise<ProductResponse> {
    const product = Product.create({
      name: dto.name,
      description: dto.description ?? null,
      repositoryUrl: dto.repositoryUrl,
      status: 'ACTIVE' as ProductStatus,
    });

    const saved = await this.productService.save(product);
    return {
      id: saved.id,
      name: saved.name,
      description: saved.description,
      repositoryUrl: saved.repositoryUrl,
      status: saved.status,
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProductRequest,
  ): Promise<ProductResponse> {
    let product = await this.productService.findById(id);

    if (dto.name !== undefined) {
      product = product.updateName(dto.name);
    }

    if (dto.description !== undefined) {
      product = product.updateDescription(dto.description);
    }

    if (dto.status !== undefined) {
      if (dto.status === ProductStatus.ARCHIVED) {
        product = product.archive();
      } else if (dto.status === ProductStatus.ACTIVE) {
        product = product.activate();
      }
    }

    const updated = await this.productService.update(product);
    return {
      id: updated.id,
      name: updated.name,
      description: updated.description,
      repositoryUrl: updated.repositoryUrl,
      status: updated.status,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    await this.productService.findById(id); // 存在確認
    await this.productService.delete(id);
  }
}
