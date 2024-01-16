import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { UserService } from 'src/auth/user/user.service';
import { UserEntity } from 'src/auth/entities/user.entity/user.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Address,UserEntity])
  ],
  controllers: [AddressController],
  providers: [AddressService,UserService],
})
export class AddressModule {}
