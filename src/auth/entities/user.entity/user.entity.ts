import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Address } from "src/address/entities/address.entity";

@Entity({ name: 'user' })
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    userId: string;

    @Column({ nullable: false })
    userName: string

    @Column({ nullable: false, unique: true })
    userEmail: string

    @Column({ nullable: false })
    userPassword: string
   
    @Column({ type: 'datetime' })
    createdAt: Date;

     //hash the plain text password
     @BeforeInsert()
     async hashPassword(){
     this.userPassword=await bcrypt.hash(this.userPassword,10)
     }

     @OneToMany(()=>Address,(address)=>address.user)
     address:[Address]
}
