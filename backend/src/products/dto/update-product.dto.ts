import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    brand: string;

    @IsNumber()
    price: number;

    @IsNumber()
    stock: number;
}
