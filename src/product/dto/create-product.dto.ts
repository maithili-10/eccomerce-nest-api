import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
@ApiProperty()
name:string;
@ApiProperty()
image:string;
@ApiProperty({required:false})
price?:number;
@ApiProperty({required:false})
salePrice?:number;

}
