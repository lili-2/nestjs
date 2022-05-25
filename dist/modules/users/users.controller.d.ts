import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    findAll(): Promise<import("./users.entity").UsersEntity[]>;
    login(loginParmas: any): Promise<{
        code: number;
        data: {
            token: string;
        };
        msg: string;
    } | {
        code: number;
        msg: string;
        data?: undefined;
    }>;
    register(body: any): Promise<any>;
}
