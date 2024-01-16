import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root123",
      database: "nestDB",
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: false,
    }),
    ProductModule,
    AuthModule,
    AddressModule
  ], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
