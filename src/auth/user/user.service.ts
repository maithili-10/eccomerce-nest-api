import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto/create-user.dto';

@Injectable()
export class UserService {
    //crud behaviour of the user
    constructor(@InjectRepository(UserEntity) private userRepo:Repository<UserEntity>) { }
    async findByEmail(email: string) {
        return this.userRepo.findOneBy({ userEmail: email })
    }
    async findById(id: string) {
        return this.userRepo.findOneBy({ userId: id })
    }
    async create(userDto: CreateUserDto) {
        const { name, email, password } = userDto;
        const isUserAvailable = await this.findByEmail(email);
        if (isUserAvailable) {
            throw new HttpException({ message: 'User already exists' }, 204)
        }
        const user = this.userRepo.create({
            createdAt:new Date().toISOString(),
            userName: name,
            userEmail: email,
            userPassword: password
        });
        return this.userRepo.save(user);

    }
}
