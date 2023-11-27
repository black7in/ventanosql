import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateProveedoreDto {
    @IsString({
        //unique: true, Experimental
    })
    @IsNotEmpty()
    name: string;

    @IsString()
    direccion: string;

    @IsString()
    email: string;

    @IsNumber()
    phone: number;
}
