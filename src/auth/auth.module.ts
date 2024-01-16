import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity/user.entity';
import { UserService } from './user/user.service';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import constants from './constants';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt.guard';

@Module({
  imports:[
    TypeOrmModule.forFeature([UserEntity]),
     PassportModule,
    JwtModule.register({
     signOptions: { expiresIn: constants.EXPIRATION_TIME *60},
     secret:constants.SECRET_KEY
    }),
  ],
  controllers: [AuthController],
  providers: [UserService,AuthService,JwtStrategy,JwtAuthGuard]
})
export class AuthModule {}
