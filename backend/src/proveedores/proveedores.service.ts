import { Injectable } from '@nestjs/common';
import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Proveedor } from './schemas/proveedor.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProveedoresService {
  constructor(
    @InjectModel(Proveedor.name)
    private proveedorModule: Model<Proveedor>
  ) {}

  async create(createProveedoreDto: CreateProveedoreDto) {
    const newProveedor = new this.proveedorModule(createProveedoreDto)
    return await newProveedor.save();
  }

  async findAll() {
    return await this.proveedorModule.find();
  }

  async findOne(id: string) {
    return await `This action returns a #${id} proveedore`;
  }

  async update(id: string, updateProveedoreDto: UpdateProveedoreDto) {
    return await `This action updates a #${id} proveedore`;
  }

  async remove(id: string) {
    return await `This action removes a #${id} proveedore`;
  }
}
