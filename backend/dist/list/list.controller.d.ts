import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { UserService } from 'src/user/user.service';
export declare class ListController {
    private readonly listService;
    private readonly userService;
    constructor(listService: ListService, userService: UserService);
    create(createListDto: CreateListDto): Promise<{
        item: string;
        user: import("../user/dto/create-user.dto").CreateUserDto;
    } & import("./entities/list.entity").List>;
    findAll(): Promise<import("./entities/list.entity").List[]>;
    findOne(id: string): Promise<import("./entities/list.entity").List>;
    findUserItems(userId: number): Promise<import("./entities/list.entity").List[]>;
    update(id: string, updateListDto: UpdateListDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
