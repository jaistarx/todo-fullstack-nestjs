import { UserService } from 'src/user/user.service';
export declare class AuthService {
    private readonly userService;
    constructor(userService: UserService);
    validateUser(username: string, password: string): Promise<{
        status: boolean;
        id: number;
        username: string;
    } | {
        status: boolean;
        id?: undefined;
        username?: undefined;
    }>;
}
