import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';
import { Proveedor, ProveedorSchema } from 'src/proveedores/schemas/proveedor.schema';
import mongoose from 'mongoose';

export type CompraDocument = HydratedDocument<Compra>;

@Schema({
    timestamps: true,
})
export class Compra {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor' })
    proveedor: Proveedor;

    @Prop()
    detalle: DetalleCompra[];

    @Prop()
    total: number;
}

export class DetalleCompra {
    @Prop()
    name: string;
    @Prop()
    cantidad: number;
    @Prop()
    costoUnitario: number;
    @Prop()
    costoTotal: number;
}

export const CompraSchema = SchemaFactory.createForClass(Compra);
