import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name:'Products'})

export class Product {
@PrimaryGeneratedColumn()
ProductId:number

@Column({nullable:false})
ProductName:string

@Column({default:0,type:'decimal',precision:2})
ProductPrice:number

@Column({nullable:false})
ProductImage:string

@Column({default:0,type:'decimal',precision:2})
ProductSalePrice:number

@Column({default:10})
ProductStock:number
}
