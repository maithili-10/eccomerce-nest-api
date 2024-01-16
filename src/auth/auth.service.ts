import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from './user/user.service';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { LoginDto } from './dto/login.dto/login.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import constants from './constants';

@Injectable()

export class AuthService {
    constructor(private userService: UserService,
        private jwtService: JwtService) { }
    registerUser(userDto: CreateUserDto) {
        return this.userService.create(userDto)

    }
    private async validateUser(loginDto: LoginDto) {
        try {
            const { email, password } = loginDto;
            const user = await this.userService.findByEmail(email);
            if (!user) {
                throw new HttpException({ message: 'User not found' }, 400)
            }
            const isVerified = await bcrypt.compare(password, user.userPassword);
            if (!isVerified) {
                throw new HttpException({ message: "Invalid Login Details" }, 400)
            }
            return Promise.resolve(user);
        }
        catch (e) {
            return Promise.reject(e)
        }
    }


    async login(loginDto: LoginDto) {
        return this.validateUser(loginDto).then((user) => {
            const payload = { email: user.userEmail, sub: user.userId };
            const token = this.jwtService.sign(payload)
            return Promise.resolve({ message: "Login successful", access_token: token, expiration: constants.EXPIRATION_TIME *60})
        })

    }

}
