import { Injectable } from '@nestjs/common';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Compra } from './schemas/compra.schema';
import { Model } from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';

@Injectable()
export class ComprasService {
  constructor(
    @InjectModel(Compra.name) private compraModel: Model<Compra>,
    @InjectModel(Product.name) private productModel: Model<Product>
  ) { }

  async create(createCompraDto: CreateCompraDto) {
    console.log(createCompraDto)

    for (const producto of createCompraDto.detalle) {
      await this.actualizarCantidadProducto(producto.name, producto.cantidad);
    }

    const nuevaCompra = new this.compraModel(createCompraDto)
    return await nuevaCompra.save();
  }

  async findAll() {
    return await this.compraModel.find().populate('proveedor').populate('detalle.product').exec();
  }

  async findOne(id: string) {
    return await this.compraModel.findById(id).populate('proveedor').exec();
  }

  update(id: number, updateCompraDto: UpdateCompraDto) {
    return `This action updates a #${id} compra`;
  }

  remove(id: number) {
    return `This action removes a #${id} compra`;
  }

  private async actualizarCantidadProducto(nombreProducto: string, cantidadAgregar: number) {
    try {
      // Busca el producto por nombre
      const producto = await this.productModel.findOne({ name: nombreProducto });

      if (!producto) {
        console.log(`Producto ${nombreProducto} no encontrado.`);
        return;
      }

      // actualizar cantidad de producto
      await this.productModel.updateOne(
        { name: nombreProducto },
        { $inc: { stock: cantidadAgregar } }
      );

      console.log(`Cantidad de ${nombreProducto} actualizada correctamente.`);
    } catch (error) {
      console.error(`Error al actualizar la cantidad de ${nombreProducto}:`, error.message);
    }
  }
}
