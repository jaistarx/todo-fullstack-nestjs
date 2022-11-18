import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List } from './entities/list.entity';
export declare class ListService {
    private listRepo;
    constructor(listRepo: Repository<List>);
    create(createListDto: CreateListDto, userDetails: CreateUserDto): Promise<{
        item: string;
        user: CreateUserDto;
    } & List>;
    findAll(): Promise<List[]>;
    findUserItems(user: User): Promise<List[]>;
    findOne(id: number): Promise<List>;
    update(id: number, updateListDto: UpdateListDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
