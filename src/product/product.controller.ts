import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags ,ApiNotFoundResponse,ApiOkResponse} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }


  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.productService.findAll();
  }
   

  @ApiNotFoundResponse({description:"No data is founnd with specific id"})
  @ApiOkResponse({description:"Product response found"})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOneby(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
