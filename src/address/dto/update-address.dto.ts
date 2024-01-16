import { PartialType } from '@nestjs/swagger';
import { CreateAddressDto } from './create-address.dto';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {

    line1: string;

    line2: string;

    city: string;

    state: string;

    pincode: number;
    
    createdAt: Date;
}
