import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { Category } from 'src/categories/schemas/category.schema';
import mongoose from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    brand: string;

    @Prop()
    stock: number;

    @Prop()
    price: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
    category: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);