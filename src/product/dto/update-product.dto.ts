import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {
   
    name?: string;
   
    image?: string;
   
    price?: number;
   
    salePrice?: number;


}
