import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProveedorDocument = HydratedDocument<Proveedor>;

@Schema({
    timestamps: true,
})
export class Proveedor {
    @Prop({
        //unique: true, Experimental
    })
    name: string;

    @Prop()
    descripcion: string;

    @Prop()
    direccion: string;

    @Prop()
    email: string;

    @Prop()
    phone: number;
}

export const ProveedorSchema = SchemaFactory.createForClass(Proveedor);