import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UserService {
    private userRepo;
    constructor(userRepo: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<any>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    findUser(username: string): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): string;
}
