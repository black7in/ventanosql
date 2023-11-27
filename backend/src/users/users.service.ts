import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>
  ) { }

  async create(createUserDto: CreateUserDto) {
    const createdClient = new this.userModel(createUserDto);
    return await createdClient.save();
  }

  async findAll() {
    return await this.userModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  findOneByEmail(email: string) {
    return this.userModel.findOne({email: email }).exec();
  }

  findByEmailWithPassword(email: string) {
    return this.userModel.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password', 'role'],
    });
  }
}
