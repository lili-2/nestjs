import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    findAll(): Promise<import("./users.entity").UsersEntity[]>;
    login(_user: any, req: any): Promise<any>;
    register(body: any): Promise<any>;
}
