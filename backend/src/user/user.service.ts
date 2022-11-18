import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const password = encodePassword(createUserDto.password);
      const userDetails = this.userRepo.create({ ...createUserDto, password });
      await this.userRepo.save(userDetails);
      return { errno: 200 };
    } catch (e) {
      return e;
    }
  }

  findAll() {
    return this.userRepo.find();
  }

  async findOne(id: number) {
    return await this.userRepo.findOne({
      where: { id: id },
      relations: ['list'],
    });
  }

  async findUser(username: string) {
    const userDetails = await this.userRepo.findOne({
      where: { userName: username },
    });
    return userDetails;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepo.update({ id: id }, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
