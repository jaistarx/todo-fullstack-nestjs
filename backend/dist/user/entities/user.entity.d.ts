import { List } from 'src/list/entities/list.entity';
export declare class User {
    id: number;
    userName: string;
    email: string;
    password: string;
    list: List[];
}
