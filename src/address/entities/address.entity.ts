import { UserEntity } from "src/auth/entities/user.entity/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Address')
export class Address {
    @PrimaryGeneratedColumn()
    addressId: number
    @Column()
    line1: string
    @Column()
    line2: string
    @Column()
    city: string
    @Column({type:'integer'})
    pincode:number
    @Column()
    state:string
    @Column({type:'datetime'})
    createdAt:string;
    @ManyToOne(()=>UserEntity,(user)=>user.userId)
    user:UserEntity
   
}
