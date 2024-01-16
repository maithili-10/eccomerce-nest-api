import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private productRepository:Repository<Product>){}
  create(createProductDto: CreateProductDto) {
    return this.productRepository.save({
      ProductName:createProductDto.name,
      ProductImage:createProductDto.image
    })
  }

  findAll() {
    return this.productRepository.find();
  }

  findOneby(id: number) {
    return this.productRepository.findOneBy({
     ProductId:id// where id is your column name
      }).then((data)=>{
        if(!data) throw new NotFoundException(); //throw new HttpException({},204)
        return data;
      })
  }


  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const existingProduct = await this.productRepository.findOneBy({
      ProductId:id// where id is your column name
       });

    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    // Update the existing product entity with the new data
    existingProduct.ProductName = updateProductDto.name;
    existingProduct.ProductImage = updateProductDto.image;

    // Save the updated product to the database
    return this.productRepository.save(existingProduct);
  }

  async remove(id: number): Promise<void> {
    const existingProduct = await this.productRepository.findOneBy({
      ProductId:id// where id is your column name
       });

    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    // Remove the product from the database
    await this.productRepository.remove(existingProduct);
  }

}
