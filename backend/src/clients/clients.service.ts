import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Client } from './schemas/client.schema';
import { Model } from 'mongoose';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name) 
    private clientModel: Model<Client>) 
  { }

  async create(createClientDto: CreateClientDto) {
    const createdClient = new this.clientModel(createClientDto);
    return await createdClient.save();
  }

  async findAll(): Promise<Client[]> {
    //return `This action returns all clients`;
    return await this.clientModel.find().exec();
  }

  async findOne(id: string) {
    return await this.clientModel.findById(id).exec();
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    return await this.clientModel.findOneAndUpdate({ _id: id }, updateClientDto, { new: true });
  }

  async remove(id: number) {
    return await `This action removes a #${id} client`;
  }
}
