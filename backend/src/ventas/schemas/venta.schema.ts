import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';
import { Proveedor, ProveedorSchema } from 'src/proveedores/schemas/proveedor.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';

import mongoose from 'mongoose';

export type VentaDocument = HydratedDocument<Venta>;

export class Cliente {
    @Prop()
    name: string;

    @Prop()
    phone: number;
}

export class Detalle {
    @Prop()
    name: string;

    @Prop()
    precio: number;

    @Prop()
    cantidad: number;
}

@Schema({
    timestamps: true,
})

export class Venta {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    vendedor: User;

    @Prop()
    cliente: Cliente;

    @Prop()
    total: number;

    @Prop()
    detalle: Detalle[];
}

export const VentaSchema = SchemaFactory.createForClass(Venta);
