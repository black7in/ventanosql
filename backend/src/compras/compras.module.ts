import { Module } from '@nestjs/common';
import { ComprasService } from './compras.service';
import { ComprasController } from './compras.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Compra, CompraSchema } from './schemas/compra.schema';
import { Product, ProductSchema } from 'src/products/schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Compra.name,
      schema: CompraSchema,
    },
    {
      name: Product.name,
      schema: ProductSchema,
    },

    ]),
  ],
  controllers: [ComprasController],
  providers: [ComprasService],
})
export class ComprasModule { }
