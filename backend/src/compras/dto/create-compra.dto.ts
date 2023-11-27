import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Proveedor } from "src/proveedores/schemas/proveedor.schema";
import { CreateProveedoreDto } from "src/proveedores/dto/create-proveedore.dto";

export class DetalleCompra {

    @IsString()
    name: string;
    @IsNumber()
    cantidad: number;
    @IsNumber()
    costoUnitario: number;
    @IsNumber()
    costoTotal: number;
}

export class CreateCompraDto {

    @IsNumber()
    total: number;

    @IsArray()
    detalle: DetalleCompra[];
}
