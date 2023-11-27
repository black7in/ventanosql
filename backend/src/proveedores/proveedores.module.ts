import { Module } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { ProveedoresController } from './proveedores.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Proveedor, ProveedorSchema } from './schemas/proveedor.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Proveedor.name,
      schema: ProveedorSchema,
    },
    ]),
  ],
  controllers: [ProveedoresController],
  providers: [ProveedoresService],
})
export class ProveedoresModule {}
