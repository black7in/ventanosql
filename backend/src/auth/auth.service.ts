import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { BadRequestException, UnauthorizedException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ){}
    async login({email, password}) {
        const user = await this.usersService.findOneByEmail(email);

        if(!user){
            throw new UnauthorizedException('Invalid credentials');
        }

        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { email: user.email, role: user.role };

        const token = await this.jwtService.signAsync(payload);

        return {
            _id: user._id,
            token,
            email
        };
    }

    async register({ name, email, password}: RegisterDto) {
        const user = await this.usersService.findOneByEmail(email);

        if(user){
            throw new BadRequestException('User already exists');
        }

        return await this.usersService.create({
            name,
            email,
            password: await bcrypt.hash(password, 10)
        })
    }

    async profile({ email, role }: { email: string, role: string }) {
       /* if(role !== 'admin'){
            throw new UnauthorizedException('You are not authorizred to access this resource');
        }*/
        
        return await this.usersService.findOneByEmail(email);
    }
}
