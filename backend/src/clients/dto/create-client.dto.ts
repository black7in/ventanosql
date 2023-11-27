import { IsString, IsNotEmpty, IsNumber, IsOptional} from "class-validator";
export class CreateClientDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNumber()
    @IsNotEmpty()
    phone: number;
}
