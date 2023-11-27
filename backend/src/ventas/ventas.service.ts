import { Injectable } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Venta } from './schemas/venta.schema';
import { Model } from 'mongoose';

@Injectable()
export class VentasService {
  constructor(
    @InjectModel(Venta.name)
    private ventaModel: Model<Venta>
  ){}
  async create(createVentaDto: CreateVentaDto) {


    console.log(createVentaDto)
    
    const createdClient = new this.ventaModel(createVentaDto);
    return await createdClient.save();
  }

  async findAll() {
    return await this.ventaModel.find().populate('vendedor').exec();
  }

  async findOne(id: string) {
    return await this.ventaModel.findById(id).populate('vendedor').exec();
  }

  async update(id: number, updateVentaDto: UpdateVentaDto) {
    return await `This action updates a #${id} venta`;
  }

  async remove(id: number) {
    return await `This action removes a #${id} venta`;
  }
}
