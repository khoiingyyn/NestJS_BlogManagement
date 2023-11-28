/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>, 
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>  {
        const { username, password } = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log('sale: ',salt);
        console.log('hasedPassword + salt: ',hashedPassword);

        const user = this.usersRepository.create({
            username, 
            password: hashedPassword,
        });

        try {
            await this.usersRepository.save(user);
        } catch(error){
            if (error.code === '23505'){   
            throw new ConflictException('Your username already exists');
        }             
            else {
             throw new InternalServerErrorException();
            }
        }      
    }

    async signIn(authCredentialsDto: AuthCredentialsDto) : Promise<string>{
        const { username, password } = authCredentialsDto;
        const user = await this.usersRepository.findOne(
            {
            where: {username}
            });

        if (user && (await bcrypt.compare(password, user.password))){
            return 'succes';
        }
        else{
        throw new UnauthorizedException(' Please check your input.!')
        }
    }
}
