import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClientDocument = HydratedDocument<Client>;

@Schema({
    timestamps: true,
})
export class Client {
    @Prop({
        //unique: true, Experimental
    })
    name: string;

    @Prop()
    email: string;

    @Prop()
    phone: number;
}

export const ClientSchema = SchemaFactory.createForClass(Client);