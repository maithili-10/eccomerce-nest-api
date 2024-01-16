import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/auth/user/user.service';

@Injectable()
export class AddressService {
  constructor(@InjectRepository(Address) 
  private AddressRepository:Repository<Address>,
  private userService:UserService
  ){}
  async create(uid:string,createAddressDto: CreateAddressDto) {
    const user =await this.userService.findById(uid)
    return this.AddressRepository.save({
      city:createAddressDto.city,
      line1:createAddressDto.line1,
      line2:createAddressDto.line2,
      state:createAddressDto.state,
      pincode:createAddressDto.pincode,
      user,
      createdAt:new Date().toISOString()
    });
  }

  findAll() {
    return this.AddressRepository.find();
  }

  findOne(id: number) {
    return this.AddressRepository.findOneBy({
      addressId:id
    }).then((data)=>{
      if(!data) throw new NotFoundException();
      return data;
    })
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    const existingAddress=await this.AddressRepository.findOneBy({
      addressId:id
    })
    if(!existingAddress){
      throw new NotFoundException(`Address with ${id} is not found`)
    }
    existingAddress.city=updateAddressDto.city;
    existingAddress.line1=updateAddressDto.line1;
    existingAddress.line2=updateAddressDto.line2;
    existingAddress.state=updateAddressDto.state;
    existingAddress.pincode=updateAddressDto.pincode;

    return this.AddressRepository.save(existingAddress);
  }

  async remove(id: number): Promise<void> {
    const existingAddress = await this.AddressRepository.findOneBy({
      addressId:id// where id is your column name
       });

    if (!existingAddress) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }

    // Remove the product from the database
    await this.AddressRepository.remove(existingAddress);
  }
}
